var express = require('express');
var router = express.Router();

router.get('/wxpage',function(req,res){
	res.render('wx',{});
})