import React, { useState } from "react";
import { useFullScreen } from "react-hooks-full-screen";
import FullScreenIcon from "../assets/Keppel_Fullscreen_Media.png";
import Tooltip from "@material-ui/core/Tooltip";
const FullScreen = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  useFullScreen("root", showFullScreen);

  return (
    <>
      <img
        src={FullScreenIcon}
        alt="Full Screen Icon"
        onClick={() => setShowFullScreen(!showFullScreen)}
        className="top-icon img-fluid p-1 inverted"
      />
    </>
  );
};

export default FullScreen;
