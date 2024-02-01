import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const Error = (props) => {
  const infoType = props.type === "info";

  return (
    <div
      className={`flex justify-center items-center ${
        infoType
          ? "bg-yellow-100 border-yellow-500 text-yellow-600"
          : "bg-red-200 border-red-500 text-red-600"
      } border-1 rounded-md p-4 flex-col ${props.flex || "flex-grow"} ${
        props.margin || "m-4 auto"
      }`}
    >
      <FaExclamationCircle className="text-xl mr-2" />

      <div className="text-center">
        <p
          className={`font-semibold ${
            infoType ? "text-yellow-700" : "text-red-700"
          } text-sm md:text-base`}
        >
          {props.errorMessage || "Internal error"}
        </p>
      </div>
    </div>
  );
};

export default Error;
