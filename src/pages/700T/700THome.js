import React, { useState, useEffect } from "react";
import { Navbar, Modal, Button } from "react-bootstrap";

import {
  LineChart,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import craneIcon from "../../assets/rightImage.jpg";
import popupIcon from "../../assets/icons/down-popup.png";
import Model from "../../model/Model";
import Layout from "../../components/MainLayout";
import ParallelogramTItle from "../../components/ParallelogramTItle";
import "../../scss/700THome.scss";
import Popup from "reactjs-popup";

const api = new Model();

const data2 = [
  { text: "DOB", value: 500, name: 1 },
  { text: "Address", value: 300, name: 2 },
  { text: "Email", value: 900, name: 3 },
  { text: "Phone", value: 100, name: 4 },
  { text: "Name", value: 700, name: 5 },
];

const data = [
  { name: "Geeksforgeeks", students: 400 },
  { name: "Technical scripter", students: 700 },
  { name: "Geek-i-knack", students: 200 },
  { name: "Geek-o-mania", students: 1000 },
];

const pdata = [
  { name: "Geeksforgeeks", students: 400 },
  { name: "Technical scripter", students: 700 },
  { name: "Geek-i-knack", students: 200 },
  { name: "Geek-o-mania", students: 1000 },
];

const hoist1Drum = [];
const hoist1GearboxNDE = [];
const hoist1GearboxDE = [];
const hoist1Motor = [];

const hoist2Drum = [];
const hoist2GearboxNDE = [];
const hoist2GearboxDE = [];
const hoist2Motor = [];

const hoist3Drum = [];
const hoist3GearboxNDE = [];
const hoist3GearboxDE = [];
const hoist3Motor = [];

const NewHome = () => {
  const [speed, setSpeed] = useState(0);
  const [load, setLoad] = useState(0);
  const [duration, setDuration] = useState(0);
  const [overLoad, setOverLoad] = useState(0);
  const [overSpeed, setOverSpeed] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  let hoist_alarm = "";
  let hoist_warning = "";
  const setValue = (category, recordsets) => {
    let value = "";
    let param = "";
    let title = "";
    let drive_fault = "";
    if (category == "hoist1") {
      title = "Hoist 1";
      for (var x = 0; x < recordsets.length; x++) {
        var row = recordsets[x];
        param = row.param;
        value = Number(row.value);
        if (param == "PZ1_Emerson_UpperTrolley_H1_Drum_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H1_Drum_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H1_GB_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H1_GB_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H1_GB_NDE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H1_GB_NDE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H1_Motor_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H1_Motor_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
      }
    } else if (category == "hoist2") {
      title = "Hoist 2";
      for (var x = 0; x < recordsets.length; x++) {
        var row = recordsets[x];
        param = row.param;
        value = Number(row.value);
        if (param == "PZ1_Emerson_UpperTrolley_H2_Drum_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H2_Drum_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H2_GB_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H2_GB_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H2_GB_NDE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H2_GB_NDE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H2_Motor_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_UpperTrolley_H2_Motor_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_700Crane_Drive_CMS_H1DRVFLT_CMS") {
          drive_fault = value;
          if (value != 0) {
            hoist_warning = 1;
          }
        }
      }
    } else {
      title = "Hoist 3";
      for (var x = 0; x < recordsets.length; x++) {
        var row = recordsets[x];
        param = row.param;
        value = Number(row.value);
        if (param == "PZ1_Emerson_LowerTrolley_H3_Drum_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_LowerTrolley_H3_Drum_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_LowerTrolley_H3_GB_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_LowerTrolley_H3_GB_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_LowerTrolley_H3_GB_NDE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_LowerTrolley_H3_GB_NDE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_LowerTrolley_H3_Motor_DE_H_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_Emerson_LowerTrolley_H3_Motor_DE_V_Velocity") {
          if (value > 25.4) {
            hoist_alarm = 1;
          } else if (value > 8.89) {
            hoist_warning = 1;
          }
        }
        if (param == "PZ1_700Crane_Drive_CMS_H3DRVFLT_CMS") {
          drive_fault = value;
          if (value != 0) {
            hoist_warning = 1;
          }
        }
      }
    }
  };

  const setSpeedLoad = (data) => {
    var param, value;
    for (var x = 0; x < data.length; x++) {
      var row = data[x];
      param = row.param;
      value = Number(row.value);
      if (param == "PZ1_700Crane_H1LOAD") {
        if (value > 10) {
          setLoad(load + value);
        }
      }
      if (param == "PZ1_700Crane_H3LOAD") {
        if (value > 10) {
          setLoad(load + value);
        }
      }
      if (param == "PZ1_700Crane_GSPD") {
        setSpeed(value);
      }
    }
    setSpeed(3.38);
    setLoad(25.55);
  };

  const getTrendsDruation = () => {
    var param, value;
    for (var x = 0; x < data.length; x++) {
      var row = data[x];
      param = row.param;
      value = Number(row.value);
      setDuration(value);
      setOverLoad(value);
      setOverSpeed(value);
    }
  };

  const getLiftData = () => {
    var param, value;
    for (var x = 0; x < data.length; x++) {
      var row = data[x];
      param = row.param;
      value = Number(row.value);
      pdata.push({ name: param, fees: value });
    }
  };

  const getHoistChartData = (arr, data) => {
    var hVelocity, vVelocity;
    for (var x = 0; x < data.length; x++) {
      var row = data[x];
      hVelocity = row.H_Velocity;
      vVelocity = row.V_Velocity;
      arr.push({ hVelocity: hVelocity, vVelocity: vVelocity });
    }
  };

  const Get700TCraneData = () => {
    api.get("/Get700TCraneData", {}, (response, err) => {
      try {
        console.log(response.data);
        console.log(response.data.recordsets);
        if (response.data != null && response.data.recordsets) {
          setValue("hoist1", response.data.recordsets[0]);
          // setValue("hoist2",response.data.recordsets[0]);
          // setValue("hoist3",response.data.recordsets[0]);
          setSpeedLoad(response.data.recordsets[0]);
          setData(response.data.recordsets[0]);
        }
      } catch (e) {
        console.log(e);
      }
    });
    api.get(
      "/Get700TCraneTrends",
      { category: "duration" },
      (response, err) => {
        try {
          console.log(response.data);
          console.log(response.data.recordsets);
          if (response.data != null && response.data.recordsets) {
            getTrendsDruation(response.data.recordsets);
          }
        } catch (e) {
          console.log(e);
        }
      }
    );

    api.get("/Get700TCraneTrends", { category: "lift" }, (response, err) => {
      try {
        console.log(response.data);
        console.log(response.data.recordsets);
        if (response.data != null && response.data.recordsets) {
          getLiftData(response.data.recordsets);
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  const get700TCraneMechTrends = (arr, category, hoist) => {
    api.get(
      "/Get700TCraneMechTrend",
      { category: category, hoist: hoist },
      (response, err) => {
        try {
          console.log(response.data);
          console.log(response.data.recordsets);
          if (response.data != null && response.data.recordsets) {
            getHoistChartData(arr, response.data.recordsets);
          }
        } catch (e) {
          console.log(e);
        }
      }
    );
  };

  const popupOpenHandler = () => {
    console.log("open");
    setOpen(true);
  };

  const popupClose = () => {
    setOpen(false);
  };

  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    Get700TCraneData();
    get700TCraneMechTrends(hoist1Drum, "drum", "Hoist 1");
    get700TCraneMechTrends(hoist1GearboxNDE, "gearbox_nde", "Hoist 1");
    get700TCraneMechTrends(hoist1GearboxDE, "gearbox_de", "Hoist 1");
    get700TCraneMechTrends(hoist1Motor, "motor", "Hoist 1");
    get700TCraneMechTrends(hoist2Drum, "drum", "Hoist 2");
    get700TCraneMechTrends(hoist2GearboxNDE, "gearbox_nde", "Hoist 2");
    get700TCraneMechTrends(hoist2GearboxDE, "gearbox_de", "Hoist 2");
    get700TCraneMechTrends(hoist2Motor, "motor", "Hoist 2");
    get700TCraneMechTrends(hoist3Drum, "drum", "Hoist 3");
    get700TCraneMechTrends(hoist3GearboxNDE, "gearbox_nde", "Hoist 3");
    get700TCraneMechTrends(hoist3GearboxDE, "gearbox_de", "Hoist 3");
    get700TCraneMechTrends(hoist3Motor, "motor", "Hoist 3");
  }, []);
  return (
    <Layout>
      <ParallelogramTItle title="700T CRANE" />
      <div className="new-home">
        <div className="content-layout">
          <div className="row">
            <div className="col-12 col-xl-6 left-side">
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="perform part-info pt-3">
                    <h4 className="part-title">PERFORMANCE</h4>
                    <p className="part-description">Lifts Performance Today:</p>
                    <div className="outcircle">
                      <div className="incircle">
                        <span>{duration}</span>
                      </div>
                    </div>
                    <p className="part-data pt-3">Lift &gt;10mT</p>
                    <h5 className="part-data">Performance Trend</h5>
                    <ResponsiveContainer width="90%" aspect={2}>
                      <BarChart
                        data={data2}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid stroke="#45515F" fill="#45515F" />
                        <XAxis dataKey="text" fill="black" hide />
                        <YAxis dataKey="value" hide />
                        <Tooltip />
                        <Bar type="monotone" dataKey="value" fill="#0086FF" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="operation part-info pt-3">
                    <h4 className="part-title">OPERATION</h4>
                    <p className="part-description">Active Host:</p>
                    <div className="row">
                      <div className="col-6 hoist1_2">Hoist 1 & 2</div>
                      <div className="col-6 hoist3">
                        <div className="inDraw">Hoist 3</div>
                      </div>
                    </div>
                    <div className="row pt-3">
                      <div className="col-6 display-val">
                        <h5>Load</h5>
                        <div className="val-txt">{load}</div>
                      </div>
                      <div className="col-6 display-val">
                        <h5>Speed</h5>
                        <div className="val-txt">{speed}</div>
                      </div>
                    </div>
                    <h5 className="text-center pt-3">Ops Satety Limits</h5>
                    <ResponsiveContainer width="90%" aspect={2}>
                      <AreaChart
                        height={200}
                        data={data}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid stroke="#ccc" fill="red" />
                        <Area dataKey="students" fill="red" />
                        <XAxis dataKey="name" hide />
                        <YAxis hide />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="left-bottom text-center mt-3 pt-3 pb-3">
                <h4 className="part-title">OPERATIOIN INSIGHT</h4>
                <div className="row">
                  <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4">
                    <h5>Lifting trend</h5>
                    <ResponsiveContainer width="100%" aspect={1}>
                      <LineChart
                        data={pdata}
                        height={300}
                        margin={{ top: 0, left: 0, bottom: 0, right: 0 }}
                      >
                        <CartesianGrid stroke="#45515F" fill="#45515F" />
                        <XAxis
                          dataKey="name"
                          interval={"preserveStartEnd"}
                          hide
                        />
                        <YAxis hide />
                        <Tooltip />
                        <Line
                          dataKey="fees"
                          stroke="#0086FF"
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4">
                    <h5>Hoisting Duration</h5>
                    <div className="duration">
                      <div className="circle"></div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 col-lg-12 col-xl-4 counter-wrapper">
                    <div className="display-val">
                      <h5>Overloading Counter</h5>
                      <div className="val-txt">{overLoad}</div>
                    </div>
                    <div className="display-val mt-3">
                      <h5>Overspeeding Counter</h5>
                      <div className="val-txt">{overSpeed}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-6">
              <div className="right-side">
                <img className="img-fluid" src={craneIcon} alt="Crane Image" />
                <div className="machine-wrapper">
                  <div className="transformer row">
                    <div className="col-6 transformer1">
                      <div className="primary">
                        <input
                          type="text"
                          id="P_L1_1"
                          value={data[37] == null ? 0 : data[37].value}
                        />
                        <input
                          type="text"
                          id="P_L2_1"
                          value={data[38] == null ? 0 : data[38].value}
                        />
                        <input
                          type="text"
                          id="P_L3_1"
                          value={data[39] == null ? 0 : data[39].value}
                        />
                        <input
                          type="text"
                          id="P_Hu_1"
                          value={data[36] == null ? 0 : data[36].value}
                        />
                        <input
                          type="text"
                          id="P_PD_1"
                          value={data[40] == null ? 0 : data[40].value}
                        />
                        <input
                          type="text"
                          id="P_SD_1"
                          value={data[41] == null ? 0 : data[41].value}
                        />
                      </div>
                      <div className="secondary">
                        <input
                          type="text"
                          id="S_L1_1"
                          value={data[42] == null ? 0 : data[42].value}
                        />
                        <input
                          type="text"
                          id="S_L2_1"
                          value={data[43] == null ? 0 : data[43].value}
                        />
                        <input
                          type="text"
                          id="S_L3_1"
                          value={data[44] == null ? 0 : data[44].value}
                        />
                        <input
                          type="text"
                          id="S_Hu_1"
                          value={data[36] == null ? 0 : data[36].value}
                        />
                        <input
                          type="text"
                          id="S_PD_1"
                          value={data[45] == null ? 0 : data[45].value}
                        />
                        <input
                          type="text"
                          id="S_SD_1"
                          value={data[46] == null ? 0 : data[46].value}
                        />
                      </div>
                    </div>
                    <div className="col-6 transformer2">
                      <div className="primary">
                        <input
                          type="text"
                          value={data[49] == null ? 0 : data[49].value}
                        />
                        <input
                          type="text"
                          value={data[50] == null ? 0 : data[50].value}
                        />
                        <input
                          type="text"
                          value={data[51] == null ? 0 : data[51].value}
                        />
                        <input
                          type="text"
                          value={data[48] == null ? 0 : data[48].value}
                        />
                        <input
                          type="text"
                          value={data[28] == null ? 0 : data[28].value}
                        />
                        <input
                          type="text"
                          value={data[29] == null ? 0 : data[29].value}
                        />
                      </div>
                      <div className="secondary">
                        <input
                          type="text"
                          value={data[30] == null ? 0 : data[30].value}
                        />
                        <input
                          type="text"
                          value={data[31] == null ? 0 : data[31].value}
                        />
                        <input
                          type="text"
                          value={data[32] == null ? 0 : data[32].value}
                        />
                        <input
                          type="text"
                          value={data[48] == null ? 0 : data[48].value}
                        />
                        <input
                          type="text"
                          value={data[33] == null ? 0 : data[33].value}
                        />
                        <input
                          type="text"
                          value={data[34] == null ? 0 : data[34].value}
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    className="low-trolley"
                    type="text"
                    value={data[57] == null ? 0 : data[57].value}
                  />
                  <input
                    className="up-trolley"
                    type="text"
                    value={data[60] == null ? 0 : data[60].value}
                  />
                  <input
                    className="fix-Gantry"
                    type="text"
                    value={data[52] == null ? 0 : data[52].value}
                  />
                  <button
                    className="hoist-btn hoist-3"
                    onClick={() => setModalShow(true)}
                  >
                    <img
                      className="img-fluid"
                      src={popupIcon}
                      alt="Download Popup Image"
                    />
                    <span className="hoist-btn-title">
                      Mechanical Vibration Condition
                    </span>
                  </button>
                  <button
                    className="hoist-btn hoist-2"
                    onClick={() => setModalShow(true)}
                  >
                    <img
                      className="img-fluid"
                      src={popupIcon}
                      alt="Download Popup Image"
                    />
                    <span className="hoist-btn-title">
                      Mechanical Vibration Condition
                    </span>
                  </button>
                  <button
                    className="hoist-btn hoist-1"
                    onClick={() => setModalShow(true)}
                  >
                    <img
                      className="img-fluid"
                      src={popupIcon}
                      alt="Download Popup Image"
                    />
                    <span className="hoist-btn-title">
                      Mechanical Vibration Condition
                    </span>
                  </button>
                  <input
                    className="hing-Gantry"
                    type="text"
                    value={data[56] == null ? 0 : data[56].value}
                  />
                  <input
                    className="hing-Gantry-bottom"
                    type="text"
                    value={data[52] == null ? 0 : data[52].value}
                  />
                  <input
                    className="hing-Gantry-top"
                    type="text"
                    value={data[56] == null ? 0 : data[56].value}
                  />
                  <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="crane-modal-title"
                    className="crane-modal"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="crane-modal-center-title">
                        Mechanical Condition
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row">
                        <div className="col-12 col-sm-6 col-xl-4 popup_header_label">
                          <h4 className="popup-sub-header">Hoist1</h4>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Drum</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist1Drum}
                                  className={"chart-back"}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="3 3" fill='#2b3644'/> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#2c6de6"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#2ff579"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Gearbox NDE</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist1GearboxNDE}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Gearbox DE</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist1GearboxDE}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Motor De</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist1Motor}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4 popup_header_label">
                          <h4 className="popup-sub-header">Hoist2</h4>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Drum</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist2Drum}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Gearbox NDE</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist2GearboxNDE}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Gearbox DE</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist2GearboxDE}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Motor De</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist2Motor}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6 col-xl-4 popup_header_label">
                          <h4 className="popup-sub-header">Hoist3</h4>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Drum</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist3Drum}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Gearbox NDE</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist3GearboxNDE}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Gearbox DE</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist3GearboxDE}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <h5 className="popup-chart-title">Motor De</h5>
                              <ResponsiveContainer width="100%" height="60%">
                                <LineChart
                                  width={200}
                                  height={100}
                                  data={hoist3Motor}
                                  margin={{
                                    top: 5,
                                    right: 10,
                                    left: 0,
                                    bottom: 5,
                                  }}
                                >
                                  {/* <CartesianGrid strokeDasharray="2 1" /> */}
                                  <XAxis dataKey="name" />
                                  <YAxis />
                                  <Tooltip />
                                  {/* <Legend /> */}
                                  <Line
                                    type="monotone"
                                    dataKey="vVelocity"
                                    stroke="#8884d8"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="hVelocity"
                                    stroke="#82ca9d"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewHome;