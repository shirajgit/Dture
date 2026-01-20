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
    <div className="max-w-4xl mx-auto mt-10 text-white">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-emerald-400">
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
      <button
        onClick={generateAI}
        disabled={loading}
        className="
          mt-6 px-6 py-3 rounded-xl font-semibold
          bg-gradient-to-r from-purple-600 to-indigo-600
          hover:from-purple-700 hover:to-indigo-700
          disabled:opacity-50
        "
      >
        {loading ? "Analyzing 🤖..." : "Generate AI Result 🤖"}
      </button>

      {/* AI Verdict */}
      {aiResult && (
        <div className="
          mt-8 bg-zinc-900 border border-purple-500
          p-6 rounded-2xl shadow-lg
        ">
          <h2 className="text-xl text-purple-400 mb-3">
            🤖 AI Verdict
          </h2>
          <pre className="whitespace-pre-wrap text-gray-300 text-sm">
            {aiResult}
          </pre>
        </div>
      )}
    </div>
  );
};

export default EndedDebateView;
