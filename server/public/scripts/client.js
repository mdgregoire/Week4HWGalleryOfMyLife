const app = angular.module('myApp',[])


const GalleryController = app.controller('GalleryController', ['$http', function($http){
let self = this;
self.imageArray = [];

self.getImages = function(){
console.log('inget images');
  $http({
    method: 'GET',
    url: '/gallery'
  })
  .then(function(response){
    console.log('success in getImages', response.data);
    self.imageArray = response.data;
    console.log(self.imageArray);
  })
  .catch(function(error){
    console.log('error in getImages', error);
  })

}
//end getImages
self.getImages();


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
    console.log('error in getImages', error);
  })
}



}]);//end GalleryController
