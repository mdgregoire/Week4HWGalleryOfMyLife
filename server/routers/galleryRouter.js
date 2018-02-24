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
})//end the get

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
})//end the get

module.exports = router;
