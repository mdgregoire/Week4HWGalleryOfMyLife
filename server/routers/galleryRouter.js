const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (request, response) => {
  console.log('inside the get');
  const sqlText = `SELECT * from images`
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



module.exports = router;
