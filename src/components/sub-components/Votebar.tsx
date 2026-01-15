import React from "react";

const VoteBar = ({ agreeVotes, disagreeVotes }:{agreeVotes :number, disagreeVotes :number}) => {
const total = agreeVotes + disagreeVotes;

const agreePercent =
  total === 0 ? 0 : Math.round((agreeVotes / total) * 100);

const disagreePercent =
  total === 0 ? 0 : 100 - agreePercent;

  return (<>
    <div className="w-full max-w-md">
      {/* Bar */}
      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden flex">
        <div
          className="bg-green-500 h-3 transition-all duration-500"
          style={{ width: `${agreePercent}% `}}
        ></div>
        <div
          className="bg-red-500 h-3 transition-all duration-500"
          style={{ width: `${disagreePercent}% `}}
        ></div>
      </div>

      {/* Text */}
      <div className="flex justify-between text-sm mt-2">
        <span className="text-green-600 font-medium">
          Agree: {agreePercent.toFixed(1)}%
        </span>
        <span className="text-red-500 font-medium">
          Disagree: {disagreePercent.toFixed(1)}%
        </span>
      </div>
    </div>
  </> );
};

export default VoteBar;