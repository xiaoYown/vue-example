var port = 3010;

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
	port: port,
	pathUrl: 'http://192.168.0.200:' + port + '/',
	apiUrl: isPro ? 'http://192.168.0.200:3002' : 'http://192.168.0.200:' + port + '/api',
	api: 'http://192.168.0.200:3002'
}