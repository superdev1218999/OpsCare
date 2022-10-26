const express = require("express");
const router = express.Router();
const helper = require("./../helper/helper.js");
const QueryService = require("../services/Queries.js");
const cors = require("cors");
const Api = require('../api.js');
const api = new Api();

const queryService = new QueryService();

  router.post(
    "/getuserdata",
    async (req, res) => {
      var username = req.authInfo.preferred_username;
      try {
        let val = await api.GetUserData(username);
        helper.callback(res, val, null);
      } catch (e) {
        helper.callback(res, null, e);
      }
    }
  );

  router.get("/getAssets", async (req, res) => {
    console.log("getAssets Triggered");
    let results = await queryService.GetAssets();
    return res.json(results);
  });

  router.get("/getMapData", async (req, res) => {
    console.log("getMapData Triggered");
    let results = await queryService.GetMapData();
    return res.json(results);
  });

  router.get("/getT007Data", async (req, res) => {
    console.log("getT007Data Triggered");
    let results = await queryService.GetT007Data();
    return res.json(results);
  });

  router.get("/Get700TCraneData", async (req, res) => {
    console.log("getT007Data Triggered");
    let results = await queryService.Get700TCraneData();
    //console.log(results);
    return res.send(results);
  });

  //GetCraneTrends
  router.get("/Get700TCraneTrends", async (req, res) => {
    console.log("Crane700T_GetCraneTrendsSQL Triggered");
    let results = await queryService.Crane700T_GetCraneTrendsSQL(req.category?req.category:"");
    //console.log(results);
    return res.send(results);
  });

  // login Route
  router.post("/users/login", async (req, res) => {    
    var username = req.body.username
    var password = req.body.password

    // if (isEmpty(username) || isEmpty(password)) {
    //     helper.callback(res,null,"Invalid Credentials")
    //     return
    // }

    api.LogIn(username, password, (val,err)=>{
        if (val != null) {
            // res.cookie('jwtToken',val.token,{ maxAge: 24 * 60 * 60 * 1000, httpOnly: true, signed : true})
        }
        helper.callback(res,val,err)
    })
  });

  // signup Route

  router.get("/users/signup", async (req, res) => {
    var username = req.query.username;
    var password = req.query.password;

    console.log("username from index",req.query.username)
    console.log("pwd from index",req.query.password)
    //console.log("req body",req.body)

    // if (isEmpty(username) || isEmpty(password)) {
    //     helper.callback(res,null,"Invalid Credentials")
    //     return
    // }

    api.SignUp(username, password, (val,err)=>{
        if (val != null) {
            // res.cookie('jwtToken',val.token,{ maxAge: 24 * 60 * 60 * 1000, httpOnly: true, signed : true})
        }
        helper.callback(res,val,err)
    });

  });

  router.post("/logout", (req, res) => {
    // res.cookie('jwtToken','',{ maxAge: 0, httpOnly: true, signed : true})
    helper.callback(res,true,null)
  })
  router.post("/token/verify", (req, res) => {
    helper.authorize(api,res,req,(val,err) => {
      res.send({success : true, value : val}).status(200);
    })
  })

  module.exports = router;
