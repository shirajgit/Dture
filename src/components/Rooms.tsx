import { useState } from "react";
import Active from "./sub-components/Active";
import MineDebate from "./sub-components/MineDebates";
import EndedDebates from "./sub-components/EndedDebates";

const Rooms = () => {
  const [activeTab, setActiveTab] = useState<"active" | "ended" | "mine">("active");

  // ✅ Parent state for count
  const [myDebatesCount, setMyDebatesCount] = useState(0);

  return (
    <div className="container mx-auto mt-18 mb-10 px-4">
      <ul className="flex flex-col sm:flex-row gap-4 sm:gap-10 lg:gap-50 justify-center bg-gray-900 p-3 rounded-3xl text-base sm:text-lg lg:text-2xl">
        <li className="w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("active")}
            className={`w-full sm:w-auto px-5 py-2 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === "active"
                ? "bg-green-600 text-white shadow-[0_0_15px_4px_rgba(74,222,128,0.6)]"
                : "text-gray-300 hover:text-white hover:bg-green-700"
            }`}
          >
            Active
          </button>
        </li>

        <li className="w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("ended")}
            className={`w-full sm:w-auto px-5 py-2 rounded-2xl font-semibold transition-all duration-300 ${
              activeTab === "ended"
                ? "bg-green-600 text-white shadow-[0_0_15px_4px_rgba(74,222,128,0.6)]"
                : "text-gray-300 hover:text-white hover:bg-green-700"
            }`}
          >
            Ended
          </button>
        </li>

        <li className="w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("mine")}
            className={`w-full sm:w-auto px-5 py-2 rounded-3xl font-semibold transition-all duration-300 ${
              activeTab === "mine"
                ? "bg-green-600 text-white shadow-[0_0_15px_4px_rgba(74,222,128,0.6)]"
                : "text-gray-300 hover:text-white hover:bg-green-700"
            }`}
          >
            Mine
          </button>
        </li>
      </ul>

      {/* ✅ Optional: show count */}
    {activeTab === "mine" && (
  <div className="mt-8 text-center">
    <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
      My Debates
    </p>
    <p className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
      {myDebatesCount}
    </p>
  </div>
)}


      <div className="mt-10">
        {activeTab === "active" && <Active />}
        {activeTab === "ended" && <EndedDebates />}

        {/* ✅ PASS REQUIRED PROP */}
        {activeTab === "mine" && <MineDebate NoOfdebates={setMyDebatesCount} />}
      </div>
    </div>
  );
};

export default Rooms;
