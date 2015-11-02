var http = require('http');
var express = require('express');
var router = express.Router();
var config = {};
router.get('/jssdk',function(req,res){
	http.get('http://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxdd42174ce7038c28&secret=d4624c36b6795d1d99dcf0547af5443d', function(_res) {
	 // 这个异步回调里可以获取access_token
	 console.log(_res);
	 
	 http.get('http://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=上一步中获取的access_token&type=jsapi', function(_res){
		 // 这个异步回调里可以获取ticket
		 console.log(_res)
		});
 	});
 	
})
// noncestr
var createNonceStr = function() {
	return Math.random().toString(36).substr(2, 15);
};
// timestamp
var createTimeStamp = function () {
	return parseInt(new Date().getTime() / 1000) + '';
};
// 计算签名方法
var calcSignature = function (ticket, noncestr, ts, url) {
	var str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '×tamp='+ ts +'&url=' + url;
	shaObj = new jsSHA(str, 'TEXT');
	return shaObj.getHash('SHA-1', 'HEX');
}
var signature = calcSignature(ticket, noncestr, timestamp, url);
var options = {
	noncestr: createNonceStr(),
	timestamp: createTimeStamp(),
	signature: signature	
}
module.exports = options;