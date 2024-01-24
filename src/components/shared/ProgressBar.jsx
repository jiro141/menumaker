import { useState }  from "react";

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full bg-white rounded-full">
      <div
        className="h-2 bg-[#EC7C6A] rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
