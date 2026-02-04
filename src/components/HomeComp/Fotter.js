import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { FaGithub, FaGooglePlay, FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
const Footer = () => {
    const socialLinks = [
        { icon: FaGithub, url: "https://github.com/shirajgit/Dture-full-" },
        { icon: FaLinkedin, url: "https://linkedin.com/in/shiraj-mujawar" },
        { icon: FaGooglePlay, url: "https://play.google.com/store/apps/details?id=com.shahnoor.dtrue" },
        { icon: AiFillInstagram, url: "https://www.instagram.com/dtrue_app" },
    ];
    const debateLinks = [
        { name: "Start a Debate", url: "/create" },
        { name: "Trending Topics", url: "/trend" },
        { name: "Community Rules", url: "/rules" },
        { name: "Contact", url: "/contact" },
    ];
    return (_jsxs("footer", { className: "relative bg-gradient-to-b from-black via-gray-950 to-black text-gray-400 overflow-hidden", children: [_jsx(motion.div, { className: "absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-400/20 blur-3xl", animate: { scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }), _jsxs("div", { className: "relative max-w-7xl mx-auto px-6 py-14", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, viewport: { once: true }, className: "grid grid-cols-1 md:grid-cols-3 gap-10", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-extrabold text-white tracking-wider", children: ["Dture", _jsx("span", { className: "text-green-400", children: "." })] }), _jsx("p", { className: "mt-4 text-sm leading-relaxed", children: "Where opinions meet logic. Debate, discuss, and defend your perspective on Dture." })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold mb-4", children: "Debate" }), _jsx("ul", { className: "space-y-2 text-sm", children: debateLinks.map(({ name, url }, i) => (_jsx(motion.li, { whileHover: { x: 6 }, className: "cursor-pointer hover:text-green-400 transition", children: _jsx(Link, { to: url, className: "text-white no-underline hover:no-underline focus:no-underline active:no-underline", children: name }) }, i))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold mb-4 flex items-center justify-center", children: "Connect" }), _jsx("div", { className: "flex gap-5 ml-20 text-xl", children: socialLinks.map(({ icon: Icon, url }, i) => (_jsx(motion.a, { href: url, target: "_blank", rel: "noopener noreferrer", whileHover: { scale: 1.2, rotate: 5 }, whileTap: { scale: 0.9 }, className: "hover:text-green-400 transition", children: _jsx(Icon, {}) }, i))) })] })] }), _jsx(motion.div, { initial: { width: 0 }, whileInView: { width: "100%" }, transition: { duration: 1 }, className: "h-px bg-white/10 my-10" }), _jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { delay: 0.3 }, className: "flex flex-col md:flex-row justify-between items-center text-sm", children: [_jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " Dture. All rights reserved."] }), _jsxs("p", { className: "mt-2 md:mt-0", children: ["Built for meaningful ", _jsx("span", { className: "text-green-400", children: "debates" })] })] })] }), _jsxs("div", { className: "mt-6 text-center text-xs text-gray-500", children: ["Designed & Developed with \u2764\uFE0F by", " ", _jsx(Link, { to: "https://shiraj-portfolio.vercel.app/", target: "_blank", rel: "noopener noreferrer", className: "text-indigo-400 hover:text-indigo-300 transition", children: "Shiraj Mujawar" })] })] }));
};
export default Footer;
