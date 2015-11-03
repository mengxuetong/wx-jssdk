var http = require('http');
var express = require('express');
var jsSHA = require('jssha');
var router = express.Router();		
var ticket,noncestr,timestamp,url;

router.get('/jssdk',function(req,res){

	http.get('http://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxdd42174ce7038c28&secret=d4624c36b6795d1d99dcf0547af5443d', function(_res) {
	 // 这个异步回调里可以获取access_token
	 console.log(_res);
	 
	 http.get('http://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=上一步中获取的access_token&type=jsapi', function(_res){
		 // 这个异步回调里可以获取ticket
		 console.log(_res)
		 //ticket = _res.ticket;
		});
 	});
 	
})
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

/**
* @synopsis 签名算法 
*
* @param jsapi_ticket 用于签名的 jsapi_ticket
* @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
*
* @returns
*/
var sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
      jsSHA = require('jssha');
      shaObj = new jsSHA(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');

  return ret;
};

module.exports = sign;
