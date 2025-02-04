import React from "react";

function NavigationBar() {
  return (
    <div className="h-[104px] bg-blue-300 flex justify-center">
      <span className="w-[274px] h-[26px]">FEEDs & GRIDs</span>
      <div className="w-[486px] h-[50px] flex justify-end">
        <span>HOME</span>
        <span className="ml-10">CONTACT US</span>
      </div>
    </div>
  );
}

export default NavigationBar;
