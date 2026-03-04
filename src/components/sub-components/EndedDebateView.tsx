import axios from "axios";
import VoteBar from "./Votebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EndedDebateView = () => {
  const { id } = useParams();
  const [debate, setDebate] = useState<any>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch SINGLE ended debate
  useEffect(() => {
    const fetchDebate = async () => {
      try {
        const res = await axios.get(
          `https://dture-backend-1.onrender.com/delete-debates/${id}`
        );
        setDebate(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDebate();
  }, [id]);

  // ✅ AI Verdict
  const generateAI = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/ai-result", {
        debate: {
          name: debate.name,
          agree: debate.agree,
          disagree: debate.disagree,
        },
      });

      setAiResult(res.data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!debate) {
    return <p className="text-white text-center mt-20">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4 text-white">

  {/* Title Card */}
  <div className="
    bg-zinc-950/80 backdrop-blur
    border border-emerald-400/20
    rounded-3xl p-6
    shadow-[0_0_35px_rgba(16,185,129,0.15)]
  ">
    
    <h1 className="text-2xl sm:text-3xl font-bold text-emerald-400">
      {debate.name}
    </h1>

    {/* Vote Bar */}
    <div className="mt-6">
      <VoteBar
        agreeVotes={debate.agree}
        disagreeVotes={debate.disagree}
      />
    </div>

    {/* AI Button */}
    <div className="mt-6 flex flex-wrap gap-4">
      <button
        onClick={generateAI}
        disabled={loading}
        className="
          flex items-center gap-2
          px-6 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-purple-600 to-indigo-600
          hover:from-purple-700 hover:to-indigo-700
          transition-all duration-300
          shadow-lg hover:shadow-purple-500/30
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Analyzing 🤖..." : "Generate AI Result 🤖"}
      </button>
    </div>

  </div>

  {/* AI Verdict */}
  {aiResult && (
    <div
      className="
        mt-8
        bg-gradient-to-br from-zinc-900 to-zinc-950
        border border-purple-500/30
        p-6 rounded-3xl
        shadow-[0_0_35px_rgba(168,85,247,0.15)]
      "
    >
      <h2 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
        🤖 AI Verdict
      </h2>

      <div className="
        bg-black/40
        border border-white/10
        rounded-xl p-4
        text-gray-300 text-sm sm:text-base
        leading-relaxed
      ">
        <pre className="whitespace-pre-wrap">
          {aiResult}
        </pre>
      </div>
    </div>
  )}

</div>
  );
};

export default EndedDebateView;
