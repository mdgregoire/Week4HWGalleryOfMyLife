const app = angular.module('myApp',[])
const GalleryController = app.controller('GalleryController', ['$http', function($http){

let self = this;
self.imageArray = [];
self.commentArray = [];
self.newURL = '';
self.newStory = '';
self.addPicture = false;

self.addComment = function(id){
  $http({
    method: 'PUT',
    url: `/gallery/add/clear`
  })
  .then(function(response){
    // if this function gets called without an id it will reset all of the 'add_comment'
    // tags in the db making sure that only 1 addComment field can be open at a time.
    if(id){
    self.addCommentField(id);
          }
    else{
      self.getImages();
    }
  })
  .catch(function(error){
    console.log('error in addcomment', error);
  })
}
//end add comment

self.addCommentField = function(id){
  $http({
    method: 'PUT',
    url: `/gallery/addfield/${id}`,
  })
  .then(function(response){
    self.getImages();
  })
  .catch(function(error){
    console.log('error in addcomment', error);
  })
}
//end addCommentField

self.addPictureField = function(){
  self.addPicture = true;
  self.getImages();
  self.addComment();
  self.comments();
}
//end addPicture

self.clearSubmit = function(){
  self.addPicture = false;
  self.newURL = '';
  self.newStory = '';
  self.newTitle = '';
  self.getImages();
}
//end  clearSubmit

self.comments = function(id, view_comments){
  $http({
    method: 'PUT',
    url: `/gallery`
  })
  .then(function(response){
    // if this function gets called without an id it will reset all of the 'view_comments'
    // tags in the db making sure that only 1 viewComment field can be open at a time.
    // then if it contains an ID it will set the 'view_comments' tag in the db to
    // true for the picture with that id.
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

self.flipImage = function(id, is_clicked){
  $http({
    method: 'PUT',
    url: `/gallery/${id}`,
    data: {clicked: is_clicked}
  })
  .then(function(response){
    self.getImages();
  })
  .catch(function(error){
    console.log('error in putclick', error);
  })
}
//end filpimage

self.getComments = function(id, view_comments){
  console.log('in getComments', id);
  $http({
    method: 'GET',
    url: `/gallery/${id}`
  })
  .then(function(response){
    self.commentArray = response.data;
    self.showComments(id, view_comments);
  })
  .catch(function(error){
    console.log('error in getComments', error);
  })
}
//end getComments

self.getImages = function(){
console.log('getting images');
  $http({
    method: 'GET',
    url: '/gallery'
  })
  .then(function(response){
    self.imageArray = response.data;
  })
  .catch(function(error){
    console.log('error in getImages', error);
  })
}
//end getImages

self.showComments = function (id, view_comments){
  $http({
    method: 'PUT',
    url: `/gallery/comments/${id}`,
    data: {view: view_comments}
  })
  .then(function(response){
    self.getImages();
  })
  .catch(function(error){
    console.log('error in put showComments', error);
  })
}
//end showComments

self.submitComment = function(id, note){
  $http({
    method: 'POST',
    url: `/gallery/comment/${id}`,
    data: {note: note}
  })
  .then(function(response){
    self.addComment();
  })
  .catch(function(error){
    console.log('error in submitComment post', error);
  })
}
//end submitComment

self.submitPicture = function(newURL, newStory, newTitle){
  $http({
    method: 'POST',
    url: `/gallery/picture`,
    data: {newURL: newURL,
           newStory: newStory,
           newTitle: newTitle}
  })
  .then(function(response){
    self.clearSubmit();
  })
  .catch(function(error){
    console.log('error in submitPicture post', error);
  })
}
//end submitPicture

self.upvote = function(id){
  console.log('in upvote', id);
  $http({
    method: 'PUT',
    url: `/gallery/vote/${id}`
  })
  .then(function(response){
    self.getImages();
  })
  .catch(function(error){
    console.log('error in putvote', error);
  })
}
//end upvote

// these function calls make sure that when the page loads all the 'view comments'
// and 'add comments' booleans are re-set in the DB this makes sure that everything starts
// out in the same state every time the page is loaded.
self.addComment();
self.comments();

}]);//end GalleryController
