var port = 1112;

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
	port: port,
	pathUrl: 'http://192.168.0.222:' + port + '/',
	apiUrl: isPro ? 'http://192.168.0.188:5000' : 'http://192.168.0.222:' + port + '/api',
	// apiUrl: 'https://192.168.0.222:3010',
	api: 'http://192.168.0.188:5000'
}