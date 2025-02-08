import React, { useEffect, useState } from 'react';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

function Sidebar() {
  const [sideBool, setSideBool] = useState(true);
  
  useEffect(()=>{
    localStorage.setItem('sidebarOpen',sideBool) 
  },[sideBool])

  return (
    <div style={{position:"fixed"}}>
      <button 
        onClick={() => setSideBool((pre) => !pre)} 
      >
        {sideBool ?  <GoSidebarExpand/> :<GoSidebarCollapse/>}
      </button>

      {sideBool && <div style={{height:"100vh",border:"2px solid black" ,width:"100px"}}>
         <button>sort</button>

        </div>}
    </div>
  );
}

export default Sidebar;
