var port = 1112;

const isPro = process.env.NODE_ENV == 'production';

module.exports = {
    port: port,
    pathUrl: 'http://192.168.0.222:' + port + '/',

    apiUrl: isPro ? 'http://192.168.0.188:5566' : '/api',

    api: 'http://192.168.0.188:5566',

    //appId: 'wx3153da022bffe72e',  //线上,wx47b4a5ed84bf3fb0;测试,
    appId: 'wx47b4a5ed84bf3fb0'
}
