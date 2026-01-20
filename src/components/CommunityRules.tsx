import { motion } from "framer-motion";

const rules = [
  {
    title: "Be Respectful",
    desc: "No hate speech, harassment, or personal attacks. Debate ideas, not people."
  },
  {
    title: "No Abusive Language",
    desc: "Using offensive, threatening, or vulgar language is strictly prohibited."
  },
  {
    title: "Stay On Topic",
    desc: "Keep your arguments relevant to the debate topic to maintain quality discussions."
  },
  {
    title: "No Spam or Promotions",
    desc: "Avoid posting spam, ads, or irrelevant promotional content."
  },
  {
    title: "One Person, One Voice",
    desc: "Do not use multiple accounts to manipulate votes or discussions."
  },
  {
    title: "Follow Platform Rules",
    desc: "Any content violating platform policies may be removed without notice."
  },
];

const CommunityRules = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black px-4 py-14">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-white text-center mb-6"
        >
          Community Rules
        </motion.h1>

        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          To keep debates healthy, respectful, and meaningful, all users must
          follow these community guidelines.
        </p>

        {/* Rules */}
        <div className="space-y-6">
          {rules.map((rule, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 hover:border-green-500/40 transition"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {i + 1}. {rule.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {rule.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-zinc-500 text-xs text-center mt-12">
          Violating these rules may result in content removal or account suspension.
        </p>
      </div>
    </div>
  );
};

export default CommunityRules;
