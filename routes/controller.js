var express = require('express');
var router = express.Router();

router.post('/check', function(req, res, next) {
  const { amount } = req.body;
  const result = {
    amount: amount - 1,
    time: new Date().getTime(),
  };
  // res.end(JSON.stringify(result));
  res.json(result);
});

router.post('/user/update', function(req, res, next) {
  const { name, email, password, user_id } = req.body;
  var data = {
    name,
    email,
    password
  };
  // //update mysql
  req.getConnection(function (err, conn){
    if (err) return next("Cannot Connect");
    var query = conn.query("UPDATE t_user set ? WHERE user_id = ? ",[data, user_id], function(err, rows){
      if(err){
        console.log(err);
        return next("Mysql error, check your query");
      }
      res.sendStatus(200);
    });
  });
});

router.delete('/user/delete', function(req,res,next){
  var user_id = req.body.user_id;
    req.getConnection(function (err, conn) {
      if (err) return next("Cannot Connect");
      var query = conn.query("DELETE FROM t_user  WHERE user_id = ? ",[user_id], function(err, rows){
        if(err){
          console.log(err);
          return next("Mysql error, check your query");
        }
        res.sendStatus(200);
      });
   });
});

router.put('/user/add', function(req, res, next) {
  const { name, email, password, user_id } = req.body;
  var data = {
    name,
    email,
    password
  };
  // //inserting into mysql
  req.getConnection(function (err, conn){
    if (err) return next("Cannot Connect");
    var query = conn.query("INSERT INTO t_user set ? ",data, function(err, rows){
      if(err){
        console.log(err);
        return next("Mysql error, check your query");
      }
      res.sendStatus(200);
    });
    console.log(query.sql);
  });
});

module.exports = router;
