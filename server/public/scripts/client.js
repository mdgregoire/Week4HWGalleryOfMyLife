const app = angular.module('myApp',[])


const GalleryController = app.controller('GalleryController', ['$http', function($http){
let self = this;
self.imageArray = [];
self.imageObject = {};

////The code below was used for testing////
// function Image(url, text, voteCount){
//   this.url = url;
//   this.note = note;
//   this.voteCount = voteCount;
// }
// //end Image Constructor
//
// self.image1 = new Image('../assets/1.jpg', '111111')
// console.log(self.image1, 'image1');
// self.imageArray.push(self.image1);
// console.log(self.imageArray, 'imageArray');
// self.image1 = new Image('../assets/2.png', '222222')
// console.log(self.image1, 'image1');
// self.imageArray.push(self.image1);
// console.log(self.imageArray, 'imageArray');

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


self.flipImage = function(id){
  console.log('in flip', id);
}



}]);//end GalleryController
