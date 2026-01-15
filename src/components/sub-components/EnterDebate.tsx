import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import axios from "axios";

const EnterDebate = () => {
  const { id } = useParams();
  const [debates, setDebates] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const res = await axios.get("http://localhost:3000/debates");
        setDebates(res.data.debates);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDebates();
  }, []);

  const debate = debates.find((d) => d.id === Number(id));

  if (!debate) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold">No debate found 😅</h2>
        <p className="text-gray-400 mt-2">
          Please go back and select a debate.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 pb-24 px-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-500  p-1 rounded-2xl shadow-lg">
        <img
          src={debate.image}
          alt={debate.name}
          className="w-24 h-24 rounded-2xl object-cover border-2 border-white/30"
        />
        <div>
          <h1 className="text-3xl font-bold">{debate.name}</h1>
          <p className="text-sm text-green-100 mt-1">
            Join the discussion & share your thoughts
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Description */}
        <div className="md:col-span-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Description
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {debate.description}
          </p>
        </div>

        {/* Opinions */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-400 mb-4">
            Opinions
          </h3>

          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
            {/* Against */}
            <div className="self-start max-w-[75%] bg-red-500/20 border border-red-400/40 rounded-2xl p-4">
              <p className="text-sm text-red-300 mb-1 font-semibold">
                Against
              </p>
              <p className="text-gray-100">
                Technology reduces human effort and makes people dependent.
              </p>
            </div>

            {/* For */}
            <div className="self-end max-w-[75%] bg-green-500/20 border border-green-400/40 rounded-2xl p-4">
              <p className="text-sm text-green-300 mb-1 font-semibold">
                For
              </p>
              <p className="text-gray-100">
                Technology helps us save time and focus on creativity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your opinion..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-900 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="p-3 bg-green-600 hover:bg-green-700 rounded-xl transition">
            <IoSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterDebate;
