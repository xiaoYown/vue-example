const PORT = 3002;

const isPro = process.env.NODE_ENV == 'production';

function getIPAdress() {
  let networkInterfaces = require('os').networkInterfaces();
  let IP;
  
  Object.keys(networkInterfaces).forEach(net => {
    networkInterfaces[net].forEach(alias => {
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        IP = alias.address
      }
    })
  })

  return IP;
}

module.exports = {
  port: PORT,
  pathUrl: 'http://' + getIPAdress() + ':' + PORT + '/',
  apiUrl: isPro ? 'http://192.168.0.188:5566' : '/api',
  api: 'http://192.168.0.188:5566'
}
