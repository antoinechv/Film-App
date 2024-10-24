import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/data.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="bg-darkBlack w-screen h-screen flex justify-center items-center">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loader;
