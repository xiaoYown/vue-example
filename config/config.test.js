var port = 8080;

const isPro = process.env.NODE_ENV == 'production';

/**
 * 开发: 192.168.0.188:5000
 * 测试: test.howdata.cn
 * banber: banber.cn
 */

module.exports = {
	port: port,
	pathUrl: 'https://test.howdata.cn:' + port + '/',

	apiUrl: isPro ? 'https://test.howdata.cn' : '/api',

	api: 'https://test.howdata.cn',

	appId: 'wx3153da022bffe72e',

  //wb:'1959039854'线上,  '2157431491'测试

  wbAppId: 2157431491,
	// 是否本地图片上传
	local: false

}

