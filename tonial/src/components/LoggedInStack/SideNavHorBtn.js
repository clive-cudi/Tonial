import React from "react";
import ReactTooltip from "react-tooltip";
import { useEffect } from "react";
import { useState } from "react";

function SideNavHorBtn({ icon, active, tooltip, btnOnClick }) {
  const [isMobile, setMobile] = useState(false)

  useEffect(()=>{
    if(window.innerWidth < 860){
      setMobile(true)
    } else {
      setMobile(false)
    }
  },[])

  return (
    <div className="sn-h-btn">
      {
        active === true ? <span className="indicator-h"></span> : ''
      }
      {
        isMobile === false && <ReactTooltip place="top" type="dark" effect="float" />
      }
      {
        isMobile === false ? <button onClick={btnOnClick} className={active === true ? "sn-btn-active" : ""}>{icon}</button> : <button onClick={btnOnClick} className={active === true ? "sn-btn-active" : ""} data-tip={tooltip}>{icon}</button>
      }
    </div>
  );
}

export default SideNavHorBtn;