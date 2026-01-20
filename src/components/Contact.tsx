import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black px-4 py-14">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold text-white text-center mb-6"
        >
          Contact Us
        </motion.h1>

        <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
          Have questions, feedback, or want to report an issue?  
          We’d love to hear from you.
        </p>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Get in Touch
            </h3>

            <div className="flex items-center gap-3 text-zinc-300">
              <FaEnvelope className="text-green-400" />
              <span>dture@gmail.com</span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed">
              For bug reports, rule violations, or general support,
              please reach out via email or social platforms.
            </p>

            {/* Socials */}
            <div className="flex gap-4 pt-4 text-xl">
              <a
                href="https://github.com/shirajgit"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/shiraj-mujawar"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/mr_shiraj_mujawar786/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              Send a Message
            </h3>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400"
            />

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-400 resize-none"
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-xl transition"
            >
              Send Message
            </button>
          </motion.form>

        </div>
      </div>
    </div>
  );
};

export default Contact;
