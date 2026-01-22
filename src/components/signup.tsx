import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface RegisterResponse {
  message: string;
}

interface ErrorResponse {
  message: string;
}

const SignUp = ()=> {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSignUp = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post<RegisterResponse>(
        "https://dture-backend-1.onrender.com/user/register",
        { username, email, password }
      );

      setMessage(res.data.message || "Account created successfully 🎉");

      setTimeout(() => {
        navigate("/sign-in");
      }, 1800);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setError(
        error.response?.data?.message ||
          "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-zinc-900 to-black">
      <form
        onSubmit={handleSignUp}
        className="relative w-full max-w-md rounded-3xl p-8
                   bg-zinc-900/80 backdrop-blur-xl
                   border border-zinc-800
                   shadow-[0_0_40px_rgba(34,197,94,0.25)]
                   transition-all duration-300"
      >
         
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-400/20 to-emerald-500/20 blur-xl -z-10" />

  
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            Join the Dture community
          </p>
        </div>

   
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

         
        {message && (
          <p className="text-green-400 text-sm mb-4 text-center">
            {message}
          </p>
        )}

       
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-xl
                     bg-zinc-800 text-white
                     border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     placeholder-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

    
        <input
          type="email"
          placeholder="Email address"
          className="w-full mb-4 px-4 py-3 rounded-xl
                     bg-zinc-800 text-white
                     border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

 
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-xl
                     bg-zinc-800 text-white
                     border border-zinc-700
                     focus:outline-none focus:ring-2 focus:ring-green-500
                     placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

       
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-4 rounded-xl font-bold text-lg rounded transition-all
            ${
              loading
                ? "bg-zinc-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-emerald-500 text-black shadow-[0_0_25px_rgba(34,197,94,0.8)]  hover:scale-[1.03]"
            }`}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

 
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-green-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
