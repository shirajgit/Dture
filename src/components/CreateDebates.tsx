import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./sub-components/Pop-up";

interface Debate {
  id: number;
  name: string;
  description: string;
  duration: string;
  image: string | null;
  user: string;
}

const CreateDebates = () => {
  const [name, setName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("24 Hours");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("https://dture-backend-1.onrender.com/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  // ✅ Upload ONLY to /upload
  const uploadImageToImageKit = async (file: File) => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

      const res = await axios.post("https://dture-backend-1.onrender.com/upload", formData, {
        headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.url as string; // backend returns { url }
  };

  const handleAddDebate = async () => {
    if (!name.trim() || !description.trim() || !duration || !user) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    let imageUrl: string | null = null;

    try {
      // ✅ 1) upload image first
      if (imageFile) {
        imageUrl = await uploadImageToImageKit(imageFile);
      }

      // ✅ 2) then create debate with JSON
      const newDebate: Debate = {
        id: Date.now(),
        name,
        description,
        duration,
        image: imageUrl,
        user: user.username,
      };

      await axios.post("https://dture-backend-1.onrender.com/create", newDebate, {
        headers: { "Content-Type": "application/json" },
      });

      setName("");
      setDescription("");
      setDuration("24 Hours");
      setImageFile(null);

      toast.success("Debate created successfully 🔥");
    } catch (error) {
      console.error(error);
      toast.error("Error creating debate ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex justify-center px-4 py-19">
        <div className="w-full max-w-3xl gap-10 text-center space-y-8">
          <div className="text-xl">
            <input
              className="w-full bg-zinc-900 p-3 rounded-xl border border-zinc-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-20"
              placeholder="Debate Topic?"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-10 text-xl">
            <textarea
              className="w-full bg-zinc-900 p-2 rounded-xl border border-zinc-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={12}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="w-full max-w-xl mx-auto space-y-2">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-xl border border-green-500 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80
                 p-3 text-gray-300 cursor-pointer shadow-md hover:shadow-green-400/50 transition-shadow
                 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-lg pointer-events-none">
                📎
              </span>
            </div>

            {imageFile && (
              <p className="text-sm text-gray-400 mt-1 truncate font-medium">{imageFile.name}</p>
            )}
          </div>

          <div className="flex justify-center">
            <div className="flex gap-4 bg-zinc-900 p-3 rounded-2xl border border-zinc-700">
              {["24 Hours", "3 Days", "7 Days"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300
                    ${duration === d ? "bg-green-500 text-black" : "text-gray-300 hover:bg-zinc-800"}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="text-2xl">
            <button
              onClick={handleAddDebate}
              disabled={loading}
              className={`px-8 py-3 font-bold rounded-5
              bg-gradient-to-r from-green-400 to-emerald-500 text-black
              transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Create Debate
            </button>
          </div>

          <Loading open={loading} text="Creating debate..." />
        </div>
      </div>
    </>
  );
};

export default CreateDebates;