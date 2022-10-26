const ServiceManager = require("./services/ServiceManager.js");
("use strict");
class API {
  constructor() {
    this.serviceManager = new ServiceManager();
  }
  GetUserData = async (username, callback) => {
    return await this.serviceManager.GetUserAccountApi().GetUserInfo(username);
  };
  LogIn(username, password, callback) {
      this.serviceManager.GetUserAccountApi().Login(username, password, callback)
  }
  SignUp(username, password, callback) {
      this.serviceManager.GetUserAccountApi().SignUp(username, password, callback)
  }
  VerifyJWT(req, res, callback) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      this.serviceManager.GetUserAccountApi().VerifyToken(token, callback);
    } else {
      callback(null, "Auth Token is missing");
    }
  }

  RegenToken(decoded, callback) {
    delete decoded.exp;
    delete decoded.iat;
    callback(this.serviceManager.GetUserAccountApi().GenerateToken(decoded));
  }
  GetApps(accountId, callback) {
    this.serviceManager
      .GetUserAccountApi()
      .GetRegisteredApps(accountId, callback);
  }
  AddSocket(socket) {
    this.serviceManager.GetOPCUAService().AddSocket(socket);
  }
  VerifyToken(req, res, callback) {
      let token = req.headers['x-access-token'] || req.headers['authorization'];
      if (token.startsWith('Bearer ')) {
          // Remove Bearer from string
          token = token.slice(7, token.length);
      }
      if (token) {
         this.serviceManager.GetUserAccountApi().VerifyToken(token,callback)
      } else {
          callback(null,'Auth Token is missing')
      }
  }
}
module.exports = API;
