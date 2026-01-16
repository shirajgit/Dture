import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/user/register",
        { username, email, password }
      );

      setMessage(res.data.message || "Account created successfully!");
      setTimeout(() => navigate("/sign-in"), 2000);
      
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSignUp}
        className="bg-black p-6 rounded-lg shadow-md w-80 font-semibold mt-2 shadow-[0_0_25px_4px_rgba(134,239,172,0.4)] hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7)] transition-all duration-300 hover:-translate-y-1"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-sm mb-3 text-center">{message}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
