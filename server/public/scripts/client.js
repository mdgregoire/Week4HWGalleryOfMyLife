const app = angular.module('myApp',[])


const GalleryController = app.controller('GalleryController', ['$http', function($http){
let self = this;
self.imageArray = [];
self.commentArray = [];
self.newURL = '';
self.newStory = '';
self.addPicture = false;


self.getImages = function(){
console.log('inget images');
  $http({
    method: 'GET',
    url: '/gallery'
  })
  .then(function(response){
    console.log('success in getImages', response.data);
    self.imageArray = response.data;
  })
  .catch(function(error){
    console.log('error in getImages', error);
  })
}
//end getImages


self.flipImage = function(id, is_clicked){
  console.log('in flip', id, is_clicked);
  $http({
    method: 'PUT',
    url: `/gallery/${id}`,
    data: {clicked: is_clicked}
  })
  .then(function(response){
    console.log('success in putclick', response);
    self.getImages();

  })
  .catch(function(error){
    console.log('error in putclick', error);
  })
}
//end filpimage

self.upvote = function(id){
  console.log('in upvote', id);
  $http({
    method: 'PUT',
    url: `/gallery/vote/${id}`
  })
  .then(function(response){
    console.log('success in putvote', response);
    self.getImages();

  })
  .catch(function(error){
    console.log('error in putvote', error);
  })
}
//end upvote

self.comments = function(id, view_comments){
  $http({
    method: 'PUT',
    url: `/gallery`
  })
  .then(function(response){
    console.log('success in putcomment', response);
    if(id){
    self.getComments(id, view_comments);
      }
    else{
      self.getImages();

    }
  })
  .catch(function(error){
    console.log('error in putcomment', error);
  })
}
//end comments



self.getComments = function(id, view_comments){
  console.log('in viewComments', id);
  $http({
    method: 'GET',
    url: `/gallery/${id}`
  })
  .then(function(response){
    console.log('success in getComments', response.data);
    self.commentArray = response.data;
    self.showComments(id, view_comments);
  })
  .catch(function(error){
    console.log('error in getComments', error);
  })
}
//end getComments

self.showComments = function (id, view_comments){
  console.log('in show comments', id, view_comments);
  $http({
    method: 'PUT',
    url: `/gallery/comments/${id}`,
    data: {view: view_comments}
  })
  .then(function(response){
    console.log('success in putcomments', response);
    self.getImages();

  })
  .catch(function(error){
    console.log('error in putcomments', error);
  })
}
//end showComments

self.addComment = function(id){
  console.log('in add comment', id);
  $http({
    method: 'PUT',
    url: `/gallery/add/clear`
  })
  .then(function(response){
    console.log('success in addcomment', response);

    if(id){
    self.addCommentField(id);
          }
    else{
      self.getImages();
    }
    // self.comments();
  })
  .catch(function(error){
    console.log('error in addcomment', error);
  })
}
//end add comment


self.addCommentField = function(id){
  console.log('in add commentfield');
  $http({
    method: 'PUT',
    url: `/gallery/addfield/${id}`,
  })
  .then(function(response){
    console.log('success in addcomment', response);
    self.getImages();
  })
  .catch(function(error){
    console.log('error in addcomment', error);
  })
}
//end addCommentField

self.submitComment = function(id, note){
  console.log('in submit commemt', id, note);
  $http({
    method: 'POST',
    url: `/gallery/comment/${id}`,
    data: {note: note}
  })
  .then(function(response){
    console.log('success in addcomment post', response);

    self.addComment();
  })
  .catch(function(error){
    console.log('error in addcomment post', error);
  })
}
//end submitComment

self.addPictureField = function(){
  console.log('in add picture');
  self.addPicture = true;
  self.getImages();
  self.addComment();
  self.comments();
}
//end addPicture

self.submitPicture = function(newURL, newStory){
  console.log('in submit picture', newURL, newStory);
  $http({
    method: 'POST',
    url: `/gallery/picture`,
    data: {newURL: newURL,
           newStory: newStory}
  })
  .then(function(response){
    console.log('success in addcomment post', response);
    self.addPicture = false;
    self.newURL = '';
    self.newStory = '';
    self.getImages();
  })
  .catch(function(error){
    console.log('error in addcomment post', error);
  })
}
//end submitPicture


///these 3 function calls make sure that when the page loads all of the 'view comments'
///and 'add comments' booleans are re-set in the DB this makes sure that everything starts
///out in the same state every time the page is loaded

self.getImages();
self.addComment();
self.comments();

/////















}]);//end GalleryController
