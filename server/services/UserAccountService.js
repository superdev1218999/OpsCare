const { uuid } = require('uuidv4');
const crypto = require("crypto");
const jwt  = require('jsonwebtoken');
const sql = require('mssql');
const config = require('../config/config.js')
"use strict";
const USERTABLE = 'UserAccount';

// const SECRET  = config.secretJWT;
// const SECRETPW  = config.secretPW;

const SECRET  = '12vg533e3sCtWacjHp21L';
const SECRETPW  = 's0asd2275tfadjvn';

class UserAccountService {
    constructor (sqlInterface) {
        this.sqlInterface = sqlInterface
    }
    GetUser(username, callback) {
        if (typeof(username) != "string" ) {
            callback (null)
        }

        this.sqlInterface.PerformQueryPromise(
            `SELECT * FROM ${USERTABLE} WHERE username=@user`,
            [{ 
                name : 'user',
                type : sql.VarChar(255),
                value : username
            }],
            (recordset, error) => {
              console.log("user record", recordset);
                if (recordset.length === 0) {
                    callback(null)
                } else {
                    callback(recordset[0])
                }
            }
        )
    }
    GetSaltAndPw(username,callback) {
        // if (typeof(username) != "string" ) {
        //     callback(null,"Invalid username submitted")
        //     return
        // }
        this.sqlInterface.PerformQueryPromise(
            `SELECT salt, password, id FROM ${USERTABLE} WHERE username=@user`,
            [{ 
                name : 'user',
                type : sql.VarChar(255),
                value : username
            }],
            (recordset, error) => {
              console.log("salt pwd", recordset);
                if (recordset.length === 0) {
                    callback(null, "No such user found!")
                    return
                }
                callback(recordset[0], null)
            }
        )
    }
    GetRegisteredApps(accountId,callback) {
        this.sqlInterface.PerformQueryPromise(
            `SELECT 
                module, app FROM ${config.sqlTables.USERACCOUNTAPP} 
                WHERE accountId=@accountId`,
            [{ 
                name : 'accountId',
                type : sql.VarChar(255),
                value : accountId
            }],
            (recordset, error) => {
                callback(recordset, null)
            }
        )
    }
    
    GetUserInfo(accountId, callback) {
      console.log(accountId);
        this.sqlInterface.PerformQueryPromise(
            `SELECT * FROM ${USERTABLE} WHERE id=@id`,
            [{ 
                name : 'id',
                type : sql.Int(),
                value : accountId
            }],
            (recordset, error) => {
              console.log("userid", recordset);
                if (recordset.length === 0) {
                    callback(null)
                } else {
                    callback(recordset[0])
                }
            }
        )
    }
    
    GenerateToken(userinfo) {
        var token = jwt.sign(userinfo, SECRET, { expiresIn: '7d' });
        return token
    }

    // API functions
    SignUp(username, password, callback) {
        
        // retrieve salt
        const hmac = crypto.createHmac('sha256', SECRETPW);
        var salt = uuid().split("-")[0]

        console.log("username----",username);

        hmac.update(password + salt);
        const hashed =  hmac.digest('hex');

        this.GetSaltAndPw(username, (user) => {
            
            if (user !== null) {
                callback (false,"User aleady exist")
            } else {
                this.sqlInterface.PerformQueryPromise(
                    `INSERT INTO UserAccount (username, password,salt) VALUES (@user,@password,@salt)`,
                    [{ 
                        name : 'user',
                        type : sql.VarChar(255),
                        value : username
                    },{ 
                        name : 'password',
                        type : sql.VarChar(255),
                        value : hashed
                    },{ 
                        name : 'salt',
                        type : sql.VarChar(255),
                        value : salt
                    }],
                    (recordset, error) => {
                        this.Login(username,password,callback)
                    }
                )
            }
        })
    }
    
    Login(username, password, callback) {
        // retrieve salt
        const hmac = crypto.createHmac('sha256', SECRETPW);
        this.GetSaltAndPw(username,(values,error) => {

            if (error != null) {
                callback(false,error)
            } else {
                hmac.update(password + values.salt);
                const hashed =  hmac.digest('hex')
                if (values.password === hashed) {

                    // generate token
                    this.GetUserInfo(values.id, (userInfo) => {
                      console.log("userinfo", userInfo)
                        var token = this.GenerateToken(userInfo)
                        userInfo.token = token;
                        callback(userInfo, null);
                    })
                } else {
                    callback(false,"Invalid Password")
                }
            }
        }) 
    }
    VerifyToken(token, callback) {
        // get token from req headesr
        jwt.verify(token, SECRET, function(err, decoded) {
            console.log("token", err);
            if (err) {
                if (err.name == "TokenExpiredError") {
                    return callback(null,'Token has expired, please re log in')
                } else {
                    return callback(null,'Invalid Token')
                }
            } else {
                return callback(decoded,null)
            }
        });
    }
}
module.exports = UserAccountService;