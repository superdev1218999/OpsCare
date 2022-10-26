const { interfaceObj } = require("./interfaces/SQLInterface.js");
const UserAccountService = require("./UserAccountService.js");
const QueryService = require("./Queries.js");
class ServiceManager {
  constructor() {
    this.monitoredTags = [];
    this.sqlService = interfaceObj;
    this.userAccountApi = new UserAccountService(interfaceObj);
    this.queryServiceApi = new QueryService(interfaceObj)
  }

  GetQueryService(){
    //let trend = this.queryServiceApi;
    console.log("today trend: "+trend);
    return this.queryServiceApi;
  }

  GetUserAccountApi() {
    return this.userAccountApi;
  }
  GetSQLService() {
    return this.sqlService;
  }
}
module.exports = ServiceManager;
