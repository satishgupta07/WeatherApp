import React from "react";

const Loading = (props) => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-12 w-12"></div>
      {props.children}
    </div>
  );
};

export default Loading;
