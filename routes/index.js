var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/socket', function(req, res, next) {
  res.render('socket', { title: 'socket test', amount: 20 });
});

router.get('/user', function(req, res, next) {
  req.getConnection(function(err,conn) {
    if (err) return next("Cannot Connect");
    var query = conn.query('SELECT * FROM t_user',function(err, rows) {
      if(err){
        console.log(err);
        return next("Mysql error, check your query");
      }
      res.render('user',{ title: "user list", data: rows });
    });
  });
})

router.get('/user/:id', function(req, res, next) {
  var userId = req.params.id;
  req.getConnection(function(err,conn){
    if (err) return next("Cannot Connect");
    var query = conn.query("SELECT * FROM t_user WHERE user_id = ? ", [userId], function(err, rows) {
      if(err){
        console.log(err);
        return next("Mysql error, check your query");
      }
      //if user not found
      if(rows.length < 1)
        return res.send("User Not found");
      res.render('edit',{ title: "Edit user", data: rows });
    });
  });
})

module.exports = router;
