import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import axios from "axios";

const EnterDebate = () => {
  const { id } = useParams();

  const [debates, setDebates] = useState<any[]>([]);
  const [agreeVotes, setAgreeVotes] = useState(0);
  const [disagreeVotes, setDisagreeVotes] = useState(0);
  const [message, setMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  const [opinions, setOpinions] = useState<
    { text: string; type: "agree" | "disagree" }[]
  >([]);

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
      <div className="h-screen flex items-center justify-center text-white">
        <h2 className="text-3xl font-bold">No debate found 😅</h2>
      </div>
    );
  }

  // 🟢 Handlers
  const handleAgree = () => {
    if (hasVoted || !message.trim()) return;

    setAgreeVotes((p) => p + 1);
    setOpinions((p) => [...p, { text: message, type: "agree" }]);

    setMessage("");
    setHasVoted(true);
  };

  const handleDisagree = () => {
    if (hasVoted || !message.trim()) return;

    setDisagreeVotes((p) => p + 1);
    setOpinions((p) => [...p, { text: message, type: "disagree" }]);

    setMessage("");
    setHasVoted(true);
  };

  axios.put(`http://localhost:3000/debates/${debate.id}`, {
    agree: agreeVotes,
    disagree: disagreeVotes,
    opinions,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-24 pb-28 px-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-green-600 to-emerald-500 p-2 rounded-2xl shadow-lg">
        <img
          src={debate.image}
          alt={debate.name}
          className="w-24 h-24 rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{debate.name}</h1>
          <p className="text-sm text-green-100">
            Join the discussion & share your thoughts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Description */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Description
          </h3>
          <p className="text-gray-300">{debate.description}</p>

          <button
            onClick={handleAgree}
            disabled={hasVoted}
            className={`w-full mt-4 py-3 rounded-xl font-semibold
              ${
                hasVoted
                  ? "bg-gray-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
          >
            👍 Agree ({agreeVotes})
          </button>

          <button
            onClick={handleDisagree}
            disabled={hasVoted}
            className={`w-full mt-3 py-3 rounded-xl font-semibold
              ${
                hasVoted
                  ? "bg-gray-600"
                  : "bg-red-600 hover:bg-red-700"
              }`}
          >
            👎 Disagree ({disagreeVotes})
          </button>
        </div>

        {/* Opinions */}
        <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
          <h3 className="text-xl font-semibold text-green-400 mb-4">
            Opinions
          </h3>

          <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
            {opinions.length === 0 && (
              <p className="text-gray-400 text-center">
                No opinions yet 🚀
              </p>
            )}

            {opinions.map((op, i) => (
              <div
                key={i}
                className={`max-w-[75%] rounded-2xl p-4
                  ${
                    op.type === "agree"
                      ? "self-end bg-green-500/20 border border-green-400/40"
                      : "self-start bg-red-500/20 border border-red-400/40"
                  }`}
              >
                <p
                  className={`text-sm font-semibold mb-1
                    ${
                      op.type === "agree"
                        ? "text-green-300"
                        : "text-red-300"
                    }`}
                >
                  {op.type === "agree" ? "For" : "Against"}
                </p>

                <p className="text-gray-100">{op.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-0 w-full bg-black/80 border-t border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your opinion..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-900 border border-white/10"
          />
          <button className="p-3 bg-green-600 rounded-xl">
            <IoSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterDebate;
