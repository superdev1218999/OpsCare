import React from "react";
import { Link } from "react-router-dom";
import DiagonalBarTitle from "../../components/DiagonalBarTitle";
import MainLayout from "../../components/MainLayout";
import SubTitleDiagonal from "../../components/SubTitleDiagonal";
import "../../scss/home.scss";
import pipeIcon from "../../assets/pages/YOTF_PS.png";
import panelIcon from "../../assets/pages/YOTF_PanelLine.png";
import paintIcon from "../../assets/pages/YOTF_PaintHall.png";
import blockIcon from "../../assets/pages/YOTF_BlockAssembly.png";
import dockIcon from "../../assets/pages/YOTF_DG.png";
import craneIcon from "../../assets/pages/YOTF_700Crane.png";

const shopPanel = [
  { source: pipeIcon, href: "/", title: "YOTF_PS" },
  {
    source: panelIcon,
    href: "/",
    title: "YOTF_PanelLine",
  },
  {
    source: paintIcon,
    href: "/",
    title: "YOTF_PaintHall",
  },
  {
    source: blockIcon,
    href: "/",
    title: "YOTF_BlockAssembly",
  },
];

const assetPanel = [
  { source: dockIcon, href: "/", title: "YOTF_DG" },
  {
    source: craneIcon,
    href: "/700T",
    title: "YOTF_700Crane",
  },
];

const Home = () => {
  return (
    <MainLayout>
      <div className="homepage">
        <DiagonalBarTitle title="DIGITAL ASSET MANAGEMENT" />
        <div className="homepage-data">
          <SubTitleDiagonal title="Shop" titleClass="small-diagonal" />
          <div className="digital-panel digital-panel-shop">
            <ul>
              {shopPanel.map((item) => (
                <li>
                  <Link to={item.href}>
                    <img src={item.source} alt={item.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <SubTitleDiagonal title="Asset" titleClass="small-diagonal" />
          <div className="digital-panel digital-panel-asset">
            <ul>
              {assetPanel.map((item) => (
                <li>
                  <Link to={item.href}>
                    <img src={item.source} alt={item.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
