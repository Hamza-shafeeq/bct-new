import React from "react";

const Mainbutton = ({ title, func }) => {
  return (
    <button
      className="text-sm flex items-center bg-[#E41E34] p-2 px-4 rounded-md font-poppins text-[14px]"
      onClick={func}
    >
      {title}
    </button>
  );
};

export default Mainbutton;
