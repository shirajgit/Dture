import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaGooglePlay, FaLinkedin, FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer  = () => {
  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-950 to-black text-gray-400 overflow-hidden">
      
      {/* Glow Animation */}
      <motion.div
        className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-400/20 blur-3xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-wider">
              Dture<span className="text-green-400">.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Where opinions meet logic. Debate, discuss, and defend
              your perspective on Dture.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Debate</h3>
            <ul className="space-y-2 text-sm">
              {["Start a Debate", "Trending Topics", "Community Rules", "Contact"].map(
                (item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 6 }}
                    className="cursor-pointer hover:text-green-400 transition"
                  >
                    {item}
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4 items-center justify-center">Connect</h3>
            <div className="flex gap-5 ml-20 text-xl">
              {[FaGithub, FaLinkedin, FaGooglePlay, AiFillInstagram ].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="http://play.google.com/store/apps/details?id=com.shahnoor.dtrue"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:text-green-400 transition"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-px bg-white/10 my-10"
        />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <p>© {new Date().getFullYear()} Dture. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built for meaningful <span className="text-green-400">debates</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
