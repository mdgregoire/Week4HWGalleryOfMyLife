const app = angular.module('myApp',[])


const GalleryController = app.controller('GalleryController', ['$http', function($http){
let self = this;
self.imageArray = [];
self.imageObject = {};



self.flipImage = function(){
  console.log('in flip');
}



}]);//end GalleryController
