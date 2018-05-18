var port = 8080;

const isPro = process.env.NODE_ENV == 'production';
/**
 * 开发: 192.168.0.188:5000
 * 测试: test.howdata.cn
 * banber: banber.cn
 */
module.exports = {
	port: port,
	pathUrl: 'https://www.banber.com:' + port + '/',

	apiUrl: isPro ? 'https://www.banber.com' : '/api',

	api: 'https://www.banber.com',

	 //appId: 'wx3153da022bffe72e',  //测试，

  //appId: wx114867841ad8ef03;  //线上,
	appId: 'wx114867841ad8ef03',


  //wb:'3457138857'线上,  '2157431491'测试

  wbAppId: 3457138857,


	// 是否本地图片上传
	local: false

}
