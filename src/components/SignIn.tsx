import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://dture-backend-1.onrender.com/user/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-zinc-900 to-black">
      <form
        onSubmit={handleSignIn}
        className="relative w-full max-w-md rounded-3xl p-8
                   bg-zinc-900/80 backdrop-blur-xl
                   border border-zinc-800
                   shadow-[0_0_40px_rgba(34,197,94,0.25)]
                   transition-all duration-300"
      >
        {/* Glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 blur-xl -z-10" />

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Sign in to continue debating
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-xl
                       bg-zinc-800 text-white
                       border border-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-green-500
                       placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl
                       bg-zinc-800 text-white
                       border border-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-green-500
                       placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-lg transition-all
            ${
              loading
                ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-[0_0_25px_rgba(34,197,94,0.8)]  hover:scale-[1.03]"
            }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
         
             New here?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Create an account
               </span>
          
        </p>
        
      </form>
    </div>
  );
};

export default SignIn;
