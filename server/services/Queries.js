const sql = require("mssql");
const config = require("../config/config");
const { interfaceObj } = require("./interfaces/SQLInterface.js");

("use strict");
class QueryService {
  constructor() {
    this.sqlInterface = interfaceObj;
  }

  async GetTodayLiftChart() {
    await this.sqlInterface.PerformQuery(`
      var params = {
        infoTableName : "InfoTable",
        dataShapeName : "ds_YOTF_OC_700TCrane_lift_trend"
      };
      
      var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
      
      function addDataToResult(timestamp, SUM_LOAD){
          var newEntry = new Object();
          newEntry.timestamp = timestamp; 
          newEntry.SUM_LOAD = SUM_LOAD;
          
          result.AddRow(newEntry);
      }
      
      function getDataFromSQL(){
          var params={
              category: "lift"
          }
          var reportable = me.Crane700T_GetCraneTrendsSQL(params);
          var tableLength = reportable.rows.length;
          for (var x = 0; x < tableLength; x++) {
              var timestamp;
              var SUMH1H2;
              var H3LOAD;
              var row = reportable.rows[x];
              timestamp = row.timestamp;
              SUMH1H2 = row.SUMH1H2;
              H3LOAD = row.H3LOAD;
              var SUM_LOAD = parseFloat(SUMH1H2) + parseFloat(H3LOAD)
              addDataToResult(timestamp, SUM_LOAD.toFixed(2));
              
          }
      }
      
      getDataFromSQL();
        
    `);
  }

  async GetCraneTrendsSQL() {
    console.log("before getMapData");
    let results = await this.sqlInterface.PerformQueryPromise(
      `
      DECLARE @category varchar(50)
      SELECT @category = [[category]]
      EXECUTE [dbo].[Get700TCraneLiftTrend] @category = @category
        `,
      []
    );
    return results;
  }

  async Get700TCraneLiftTrend() {
    await this.sqlInterface.PerformQuery(`
      var params = {
        infoTableName : "InfoTable",
        dataShapeName : "ds_700T_crane_position"
      };
      
      var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
      
      function addDataToResult(pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,pos9,pos10){
          // ds_700_Crane_Real_Time entry object
          var newEntry = new Object();
          newEntry.POS1 = pos1; 
          newEntry.POS2 = pos2; 
          newEntry.POS3 = pos3; 
          newEntry.POS4 = pos4;
          newEntry.POS5 = pos5; 
          newEntry.POS6 = pos6; 
          newEntry.POS7 = pos7; 
          newEntry.POS8 = pos8; 
          newEntry.POS9 = pos9; 
          newEntry.POS10 = pos10; 
          
          result.AddRow(newEntry);
      }
      
      function getDataFromSQL(){
          var reportable = me.Crane700T_GetCraneStatusSQL();
          var fgpos = 0;
          var hgpos = 0;
          var tableLength = reportable.rows.length;
          for (var x = 0; x < tableLength; x++) {
              var row = reportable.rows[x];
              if (row.param == 'PZ1_700Crane_Display_CMS_FGPOS_CMS'){
                  fgpos = 700 - row.value;
              }else if (row.param == 'PZ1_700Crane_Display_CMS_HGPOS_CMS'){
                  hgpos = 700 - row.value;
              }
          }
          pos1 = false;

          pos2 = false;
          pos3 = false;
          pos4 = false;
          pos5 = false;
          pos6 = false;
          pos7 = false;
          pos8 = false;
          pos9 = false;
          pos10 = false;
          
          if(fgpos >=70 && fgpos < 140){
              pos9 = true;
          }else if(fgpos >=140 && fgpos < 210){
              pos8 = true;
          }else if(fgpos >=210 && fgpos < 280){
              pos7 = true;
          }else if(fgpos >=280 && fgpos < 350){
              pos6 = true;
          }else if(fgpos >=350 && fgpos < 420){
              pos5 = true;
          }else if(fgpos >=420 && fgpos < 490){
              pos4 = true;
          }else if(fgpos >=490 && fgpos < 560){
              pos3 = true;
          }else if(fgpos >=560 && fgpos < 630){
              pos2 = true;
          }else if(fgpos >=630 && fgpos <= 700){
              pos1 = true;
              
          }else{
              pos10 = true;
          }
              
      
          addDataToResult(pos1,pos2,pos3,pos4,pos5,pos6,pos7,pos8,pos9,pos10);
      }
      
      getDataFromSQL() 
    `);
  }
  //

  async GetTodayLiftDurationTrend() {
    await this.sqlInterface.PerformQuery(`
      var params = {
        infoTableName : "InfoTable",
        dataShapeName : "ds_YOTF_OC_Crane700T_Duration_Trend"
      };
      
      var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
      
      function addDataToResult(timestamp, duration, time, y_axis){
          var newEntry = new Object();
          newEntry.timestamp = timestamp; 
          newEntry.duration = duration;
          newEntry.time = time;
          newEntry.y_axis = y_axis;
          
          result.AddRow(newEntry);
      }
      
      function getDataFromSQL(){
          var params={
              category: "duration"
          }
          var reportable = me.Crane700T_GetCraneTrendsSQL(params);
          var tableLength = reportable.rows.length;
          for (var x = 0; x < tableLength; x++) {
              var timestamp;
              var duration;
              var row = reportable.rows[x];
            // logger.debug("duration fd "+row.timestamp + " date "+date + "hours "+hours);
              timestamp = row.timestamp;
              var date = new Date(timestamp);
            var hours = date.getHours();
              duration = row.duration;
              
      
              addDataToResult(timestamp, duration,hours, duration);
              
          }
      }
      
      getDataFromSQL();
    
    `);
  }

  async GetHoistStatusJS() {
    await this.sqlInterface.PerformQuery(`
      var params = {
        infoTableName : "InfoTable",
        dataShapeName : "ds_YOTF_OC_700T_Crane_Status"
      };
      
      var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
      
      function addDataToResult(title,hoist_status,drive_fault){
          var newEntry = new Object();
          newEntry.title = title;
          newEntry.device_status = hoist_status; 
          newEntry.drive_fault = drive_fault; 
          
          result.AddRow(newEntry);
      }
      
      function getDataFromSQL(hoist){
          var reportable = me.Crane700T_GetCraneStatusSQL();
          var tableLength = reportable.rows.length;
          
          var title;
          var drive_fault = 0;
          var hoist_alarm = 0;
          var hoist_warning = 0;
          var hoist_status = "#04ff00";
        
          if(hoist == "hoist1"){
              title = "Hoist 1";
              for (var x = 0; x < tableLength; x++) {
                  var row = reportable.rows[x];
                  param = row.param;
                  value = Number(row.value);
                  if(param == "PZ1_Emerson_UpperTrolley_H1_Drum_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H1_Drum_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H1_GB_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H1_GB_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H1_GB_NDE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H1_GB_NDE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H1_Motor_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H1_Motor_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
              }
          }else if(category == "hoist2"){
              title = "Hoist 2";
              for (var x = 0; x < tableLength; x++) {
                  var row = reportable.rows[x];
                  param = row.param;
                  value = Number(row.value);
                  if(param == "PZ1_Emerson_UpperTrolley_H2_Drum_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H2_Drum_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H2_GB_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H2_GB_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H2_GB_NDE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H2_GB_NDE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H2_Motor_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_UpperTrolley_H2_Motor_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_700Crane_Drive_CMS_H1DRVFLT_CMS"){
                      drive_fault = value;
                      if(value != 0){
                          hoist_warning = 1;
                      }
                  }
              }
          }else{
              title = "Hoist 3";
              for (var x = 0; x < tableLength; x++) {
                  var row = reportable.rows[x];
                  param = row.param;
                  value = Number(row.value);
                  if(param == "PZ1_Emerson_LowerTrolley_H3_Drum_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_LowerTrolley_H3_Drum_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_LowerTrolley_H3_GB_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_LowerTrolley_H3_GB_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_LowerTrolley_H3_GB_NDE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_LowerTrolley_H3_GB_NDE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_LowerTrolley_H3_Motor_DE_H_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_Emerson_LowerTrolley_H3_Motor_DE_V_Velocity"){
                      if(value > 25.4){
                          hoist_alarm = 1;
                      }else if(value > 8.89){
                          hoist_warning = 1;
                      }
                  }
                  if(param == "PZ1_700Crane_Drive_CMS_H3DRVFLT_CMS"){
                      drive_fault = value;
                      if(value != 0){
                          hoist_warning = 1;
                      }
                  }
              }
          }
        
          if (hoist_alarm == 1){
              hoist_status = "#ff1e1e";
          }else if(hoist_warning == 1){
              hoist_status == "#c76737";
          }
          addDataToResult(title,hoist_status,drive_fault);
      }
      
      getDataFromSQL(category);
    
    `);
  }

  async GetCraneStatusSQL() {
    await this.sqlInterface.PerformQuery(`
      EXEC [dbo].[Get700TCraneData]
    `);
  }

  async Get700TCraneData_old() {
    await this.sqlInterface.PerformQuery(`
      ALTER PROCEDURE [dbo].[Get700TCraneData]
      AS
      BEGIN
      
        -- SET NOCOUNT ON added to prevent extra result sets from
        -- interfering with SELECT statements.
        SET NOCOUNT ON;
        
        CREATE TABLE #temptable
        (
          param varchar(1000),
          value varchar(1000)
        )
        
        /*
        -- Lifts
        ;WITH my_table AS(
          SELECT ROW_NUMBER() OVER (ORDER BY timestamp) row,timestamp, ISNULL([PZ1_700Crane_H1LOAD],0) AS [H1LOAD],
          ISNULL([PZ1_700Crane_H2LOAD],0) AS [H2LOAD], ISNULL([PZ1_700Crane_H1LOAD],0)+ISNULL([PZ1_700Crane_H2LOAD],0) AS [SUMH1H2],
          ISNULL([PZ1_700Crane_H3LOAD],0) AS [H3LOAD] FROM(
              SELECT tagname, MAX(CAST(value AS FLOAT)/100) AS value, DATEADD(MINUTE, DATEDIFF(MINUTE, 0, timestamp), 0) as timestamp
              FROM [OpsCare].[dbo].[HistorianRawData]
              WHERE tagname LIKE '%H%LOAD%'
              AND timestamp >= (select dateadd(day, datediff(day, 0, getdate()), 0) + '07:30')
              GROUP BY tagname,DATEADD(MINUTE, DATEDIFF(MINUTE, 0, timestamp), 0)
            ) AS source_table
            PIVOT(
              SUM(value) FOR tagname IN ([PZ1_700Crane_H1LOAD],[PZ1_700Crane_H2LOAD],[PZ1_700Crane_H3LOAD])
            ) AS pivot_table	
        )
      
        SELECT 'LIFTS',count(*) FROM my_table a LEFT JOIN my_table b ON a.row = b.row+5
        WHERE (a.H3LOAD > 10 and b.H3LOAD <= 10) OR (a.SUMH1H2 > 36 and b.SUMH1H2 <= 36)
        */
          -- HOIST LOAD Values
        INSERT INTO #temptable SELECT tagname,CAST(value AS float) AS value FROM HistorianCurrentData WHERE tagname LIKE ('PZ1_700Crane_%LOAD')
      
        -- Gantry Speed
        INSERT INTO #temptable SELECT tagname,ROUND(ABS(CAST(value AS FLOAT)/1000),2) AS value FROM HistorianCurrentData WHERE tagname = 'PZ1_700Crane_GSPD'
      
        -- Lower trolley Velocity
        INSERT INTO #temptable SELECT tagname,ROUND(value,2) as value FROM HistorianCurrentData WHERE tagname LIKE ('PZ1_Emerson_LowerTrolley%Velocity')
      
        -- Upper trolley Velocity
        INSERT INTO #temptable SELECT tagname,ROUND(value,2) as value FROM HistorianCurrentData WHERE tagname LIKE ('PZ1_Emerson_UpperTrolley%Velocity')
      
        --Transformers
        INSERT INTO #temptable SELECT tagname,ROUND(CAST(value AS float),2) AS value FROM HistorianCurrentData WHERE tagname LIKE ('PZ1_Emerson_TransformerRoom%')
      
        --Pos
        INSERT INTO #temptable SELECT tagname,ROUND(CAST(value AS float)/100,2) AS value FROM HistorianCurrentData WHERE tagname LIKE ('PZ1_700Crane_Display_CMS_%POS_CMS%')
      
        
      END	 SELECT * FROM #temptable
    `);
  }

  async GetSafetyLimitTrendJS() {
    console.log(this.sqlInterface);
    await this.sqlInterface.PerformQueryPromise(`
    var params = {
      infoTableName : "InfoTable",
      dataShapeName : "ds_YOTF_OC_Crane_SafetyLimit"
    };
    
    var result = Resources["InfoTableFunctions"].CreateInfoTableFromDataShape(params);
    
    function addDataToResult(speed,load){
        var newEntry = new Object();
        newEntry.speed = speed;
        newEntry.load = load;
    
        result.AddRow(newEntry);
    }
    
    function getDataFromSQL(){
        var reportable = me.Crane700T_GetCraneStatusSQL();
        var tableLength = reportable.rows.length;
        var param,value;
        var speed,load;
        for (var x = 0; x < tableLength; x++) {
            var row = reportable.rows[x];     
            param = row.param;
            value = Number(row.value);
            if (param == "PZ1_700Crane_H1LOAD"){
                if (value > 10){
                    load = load + value;
                }
            }
            if (param == "PZ1_700Crane_H3LOAD"){
                if (value > 10){
                    load = load + value;
                }
            }
            if (param == "PZ1_700Crane_GSPD"){
                speed = value;
            }
        }
        speed = 3.38;
        load = 25.55;
        addDataToResult(speed,load);
    }
    
    getDataFromSQL();
    
    `);
  }

  async Get700TCraneData() {
    return await this.sqlInterface
      .ExecuteStoredProcedure(`Get700TCraneData`, [], this.callback)
      .then(function (response) {
        //console.log(response);
        return response;
      });
  }

  async Crane700T_GetCraneTrendsSQL(category) {
    return await this.sqlInterface
      .ExecuteStoredProcedure(
        `Get700TCraneLiftTrend`,
        [{ name: "category", type: sql.VarChar(100), value: category }],
        this.callback
      )
      .then(function (response) {
        //console.log(response);
        return response;
      });
  }

  callback(results) {
    return results;
    //console.log(results);
  }

  async Get1() {
    await this.sqlInterface.PerformQuery(`
      
    `);
  }

  async Get2() {
    await this.sqlInterface.PerformQuery(`
      
    `);
  }

  async GetUserAccount(username) {
    return (
      await this.sqlInterface.PerformQueryPromise(
        `
        SELECT username, [password] FROM user_account WHERE username = @username
    `,
        [{ name: "username", value: username }]
      )
    )[0];
  }
}

module.exports = QueryService;
