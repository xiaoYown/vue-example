var port = 3020;

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
	port: port,
	pathUrl: 'http://192.168.0.222:' + port + '/',
	apiUrl: isPro ? 'http://192.168.0.222:3002' : 'http://192.168.0.222:' + port + '/api',
	api: 'http://192.168.0.222:3002'
}