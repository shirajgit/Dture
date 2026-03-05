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
  <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black px-4 py-20 flex justify-center">
    <div className="w-full max-w-4xl">
      {/* Glow */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-32 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Card */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500/30 via-purple-500/20 to-indigo-500/20">
        <div className="rounded-3xl bg-zinc-950/75 backdrop-blur-xl border border-white/10 shadow-2xl p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                          bg-emerald-500/10 text-emerald-200 border border-emerald-500/25">
              ✨ Create a new debate
            </p>

            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Start a Debate on <span className="text-emerald-300">Dtrue</span>
            </h1>

            <p className="mt-2 text-gray-400 text-sm sm:text-base">
              Keep it clear, respectful, and interesting — your debate will go live instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: Title + Description */}
            <div className="space-y-5">
              {/* Topic */}
              <div>
                <label className="text-sm font-semibold text-gray-200">Debate topic</label>
                <p className="text-xs text-gray-500 mt-1">Example: “Is AI good for jobs?”</p>

                <input
                  className="mt-3 w-full bg-white/5 px-4 py-3 rounded-2xl
                             border border-white/10 text-white text-base
                             placeholder:text-gray-500
                             focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/30
                             transition"
                  placeholder="Debate Topic?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                />

                <div className="mt-2 text-right text-xs text-gray-500">
                  {name?.length || 0}/80
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-semibold text-gray-200">Description</label>
                <p className="text-xs text-gray-500 mt-1">
                  Add context + what people should vote on.
                </p>

                <textarea
                  className="mt-3 w-full bg-white/5 px-4 py-3 rounded-2xl
                             border border-white/10 text-white text-base
                             placeholder:text-gray-500
                             focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/30
                             transition"
                  rows={10}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={600}
                />

                <div className="mt-2 text-right text-xs text-gray-500">
                  {description?.length || 0}/600
                </div>
              </div>
            </div>

            {/* RIGHT: Image + Duration + Button */}
            <div className="space-y-6">
              {/* Upload */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-200">Cover image</p>
                    <p className="text-xs text-gray-500 mt-1">Optional — helps your debate stand out.</p>
                  </div>
                  <span className="text-emerald-300 text-xl">📎</span>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-4 w-full rounded-2xl border border-emerald-500/30 bg-black/30
                             p-3 text-gray-300 cursor-pointer
                             shadow hover:shadow-[0_0_25px_rgba(34,197,94,0.15)]
                             focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
                />

                {imageFile && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 truncate font-medium">
                      Selected: <span className="text-gray-200">{imageFile.name}</span>
                    </p>

                    {/* Optional preview if you store previewUrl in state */}
                    {/* <img src={previewUrl} className="mt-3 w-full h-44 object-cover rounded-2xl border border-white/10" /> */}
                  </div>
                )}
              </div>

              {/* Duration */}
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-gray-200">Duration</p>
                <p className="text-xs text-gray-500 mt-1">Choose how long this debate stays active.</p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["24 Hours", "3 Days", "7 Days"].map((d) => {
                    const isActive = duration === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`py-3 rounded-2xl font-semibold text-sm transition-all duration-200
                          border active:scale-[0.98]
                          ${
                            isActive
                              ? "bg-gradient-to-r from-emerald-400 to-green-400 text-black border-white/10 shadow-[0_0_25px_rgba(34,197,94,0.18)]"
                              : "bg-black/30 text-gray-200 border-white/10 hover:bg-white/10"
                          }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleAddDebate}
                disabled={loading}
                className={`w-full py-4 rounded-2xl font-extrabold text-base
                  bg-gradient-to-r from-emerald-400 to-green-400 text-black
                  border border-white/10
                  shadow-[0_0_35px_rgba(34,197,94,0.18)]
                  hover:shadow-[0_0_50px_rgba(34,197,94,0.25)]
                  transition-all duration-200 active:scale-[0.98]
                  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Creating..." : "Create Debate"}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By creating a debate you agree to keep it respectful and non-harmful.
              </p>
            </div>
          </div>

          <Loading open={loading} text="Creating debate..." />
        </div>
      </div>
    </div>
  </div>
</>
  );
};

export default CreateDebates;