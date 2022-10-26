const cert = require('../cert')
module.exports = {
    options: {
        protocol: 'mqtt',
        port: 1883,
        username: 'user',
        password: 'user123',
        cert: cert
    },
    brokerUrl: 'mqtt://100.10.100.10',
 
}
