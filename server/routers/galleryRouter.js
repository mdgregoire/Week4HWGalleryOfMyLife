const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (request, response) => {
  // this is the generic display get, it pulls from the db and resets the DOM
  const sqlText = `SELECT * from images
                    ORDER BY id`
  pool.query(sqlText)
    .then((result) => {
      response.send(result.rows);
    })
    .catch((error) =>{
      console.log('error in get', error);
      response.sendStatus(500);
    })
})//end the get display all

router.get('/:id', (request, response) => {
  let id = request.params.id;
// if the get call has a paramater passed it will grab the comments instead
  const sqlText = `SELECT comment, images_id from comment
                   WHERE images_id = $1
                    ORDER BY id;`;
  pool.query(sqlText, [id])
    .then((result) => {
      response.send(result.rows);
      console.log('success in the get comments router', result.rows);
    })
    .catch((error) =>{
      console.log('error in get', error);
      response.sendStatus(500);
    })
})//end the get Comments

router.post('/picture', (request, response) => {
  let newURL = request.body.newURL;
  let newStory = request.body.newStory;
  let newTitle = request.body.newTitle;
  const sqlText = `INSERT INTO images (url, note, title)
                   VALUES($1, $2, $3);`
  pool.query(sqlText, [newURL, newStory, newTitle])
    .then((result) => {
      response.sendStatus(200);
      console.log('success in the post picture router');
    })
    .catch((error) =>{
      console.log('error in post comments', error);
      response.sendStatus(500);
    })
})//end add picture post

router.put('/:id', (request, response) => {
  console.log('inside the put');
  let id = request.params.id;
  let clicked;
  let sqlText;
// the if/else below checks to see if the image is 'clicked' or not and toggles back and forth
// if the image is getting selected (moving from false to true) it will also increment the click counter
  if (request.body.clicked){
    clicked = false;
    sqlText = `UPDATE images
               SET is_clicked = $1
               WHERE id = $2;`;
  }
  else{
    clicked = true;
    sqlText = `UPDATE images
               SET is_clicked = $1, is_clicked_count = is_clicked_count+1
               WHERE id = $2;`;
  }
  pool.query(sqlText, [clicked, id])
    .then((result) => {
      response.sendStatus(200);
    })
    .catch((error) =>{
      console.log('error in put', error);
      response.sendStatus(500);
    })
})//end put click flipImage

router.put('/vote/:id', (request, response) => {
  const id = request.params.id;
  console.log('inside vote put');
  sqlText = `UPDATE images
             SET votecount = votecount+1
             WHERE id = $1;`;
             pool.query(sqlText, [id])
   .then((result) => {
     response.sendStatus(200);
   })
   .catch((error) =>{
     console.log('error in put', error);
     response.sendStatus(500);
   })
})//end put upvote

router.put('/', (request, response) => {

  sqlText = `UPDATE images
             SET view_comments = false;`;
             pool.query(sqlText)
   .then((result) => {
     response.sendStatus(200);
   })
   .catch((error) =>{
     console.log('error in put', error);
     response.sendStatus(500);
   })
})//end put resets comment fields

router.put('/add/clear', (request, response) => {
// this resets all of the 'add_comment' tags in the DB to false, ensuring that
//there is only 1 open add comment field at a time.
  sqlText = `UPDATE images
             SET add_comment = false;`;
             pool.query(sqlText)
   .then((result) => {
     response.sendStatus(200);
   })
   .catch((error) =>{
     console.log('error in put', error);
     response.sendStatus(500);
   })
})//end put to clear add

router.put('/addfield/:id', (request, response) => {
  //this updates the 'add_comment' tag to true creating the needed fields
  let id = request.params.id;
  sqlText = `UPDATE images
             SET add_comment = true
             WHERE id = $1;`;
             pool.query(sqlText, [id])
   .then((result) => {
     response.sendStatus(200);
   })
   .catch((error) =>{
     console.log('error in put add field router', error);
     response.sendStatus(500);
   })
})//end put add comment field

router.put('/comments/:id', (request, response) => {
  //this is the toggle for view/hide comments
  let id = request.params.id;
  let view;
  let sqlText;
  if (request.body.view){
    view = false;
    sqlText = `UPDATE images
               SET view_comments = $1
               WHERE id = $2;`;
  }
  else{
    view = true;
    sqlText = `UPDATE images
               SET view_comments = $1
               WHERE id = $2;`;
  }
  pool.query(sqlText, [view, id])
    .then((result) => {
      response.sendStatus(200);
    })
    .catch((error) =>{
      console.log('error in put', error);
      response.sendStatus(500);
    })
})//end put showComments

router.post('/comment/:id', (request, response) => {
  // This adds the comment to the db
  let id = request.params.id;
  let note = request.body.note;
  console.log('inside the postComments', id);

  const sqlText = `INSERT INTO comment (images_id, comment)
                   VALUES($1, $2);`
  pool.query(sqlText, [id, note])
    .then((result) => {
      response.sendStatus(200);
      console.log('success in the post comments router');
    })
    .catch((error) =>{
      console.log('error in post comments', error);
      response.sendStatus(500);
    })
})//end the get Comments

module.exports = router;
