const sql = require("mssql");
const config = require("../../config/config.js");
("use strict");
class SqlInterface {
  constructor() {
    this.config = {
      server: config.sqlServer,
      database: config.sqlDb,
      port: config.sqlPort,
      user: config.sqlUser,
      password: config.sqlPassword,
      options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
      },
    };
  }

  ConnectDB(callback) {
    if (this.pool == undefined) {
      new sql.ConnectionPool(this.config)
        .connect()
        .then((pool) => {
          this.pool = pool;
          callback(pool);
        })
        .catch((err) => {
          callback(null);
        });
    } else {
      callback(this.pool);
    }
  }

  PerformQueryPromise(queryString, inputs, callback){
      this.ConnectDB( function(pool) {
          if (pool == null) {
              callback(null, "SQL Down")
              return
          }
          let req = new sql.Request(pool)
          var i, currInput
          for (i=0;i<inputs.length;i++) {
              currInput = inputs[i]
              if (currInput.value == null || currInput.value == undefined) {
                  req.input(currInput.name, currInput.value)
              } else if (currInput.type == undefined) {
                  req.input(currInput.name, currInput.value )
              } else {
                  req.input(currInput.name, currInput.type, currInput.value )
              }
          }
          req.query(queryString, function (err, result) {
              if ( err ) {
                  console.log(err);
                  callback(null, err)
                  return
              }
              callback(result.recordset, null)
          })
      })
  }
  async ExecuteStoredProcedure(procedureName, inputs, callback) {
    // this.ConnectDB(function (pool) {
    let request = await sql.connect(this.config);
    var i, currInput;
    var sqlRequest = request.request();
    if (inputs) {
      for (i = 0; i < inputs.length; i++) {
        currInput = inputs[i];
        sqlRequest.input(currInput.name, currInput.type, currInput.value);
      }
    }
    return sqlRequest
      .execute(procedureName)
      .then(function (results) {
        //console.log(results)
        return results;//callback(results, null);
      })
      .catch(function (err) {
        console.log(err);
        console.log(`${procedureName} failed`);
        return err;
        //callback(null, err);
      });
  }
}
  
module.exports = {
  interfaceObj: new SqlInterface(),
  constructor: SqlInterface,
};


