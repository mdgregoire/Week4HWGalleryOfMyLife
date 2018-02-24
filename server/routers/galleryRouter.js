const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (request, response) => {
  console.log('inside the get');
  const sqlText = `SELECT * from images
                    ORDER BY id`
  pool.query(sqlText)
    .then((result) => {
      response.send(result.rows);
      console.log('success in the get router', result.rows);
    })
    .catch((error) =>{
      console.log('error in get', error);
      response.sendStatus(500);
    })
})//end the get display all

router.put('/:id', (request, response) => {
  console.log('inside the put');
  let id = request.params.id;
  let clicked;
  let sqlText;

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
  console.log('in put', id, clicked);
  console.log('sqlText in put', sqlText);
  pool.query(sqlText, [clicked, id])
    .then((result) => {
      response.sendStatus(200);
      console.log('success in the put router', result);
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
     console.log('success in the put router', result);
   })
   .catch((error) =>{
     console.log('error in put', error);
     response.sendStatus(500);
   })
})//end put upvote

router.get('/:id', (request, response) => {
  let id = request.params.id;
  console.log('inside the getComments', id);

  const sqlText = `SELECT comment from comment
                   WHERE images_id = $1
                    ORDER BY id`
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

router.put('/comments/:id', (request, response) => {
  console.log('inside the put comments');
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
  console.log('in put', id, view);
  console.log('sqlText in put', sqlText);
  pool.query(sqlText, [view, id])
    .then((result) => {
      response.sendStatus(200);
      console.log('success in the put comment router', result);
    })
    .catch((error) =>{
      console.log('error in put', error);
      response.sendStatus(500);
    })
})//end put showComments


module.exports = router;
