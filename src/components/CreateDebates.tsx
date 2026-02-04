import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import  Loading  from "./sub-components/Pop-up";

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

  // Fetch logged-in user
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

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  };

  // Upload image to Supabase
  const uploadImageToSupabase = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) throw error;

    const { data } = supabase.storage.from("images").getPublicUrl(fileName);
    return data.publicUrl;
  };

  // Handle debate creation
  const handleAddDebate = async () => {
    if (!name.trim() || !description.trim() || !duration || !user) {
      toast.error("Please fill all fields!", {
        style: {
          borderRadius: "14px",
          background: "linear-gradient(135deg, #18181b, #27272a)",
          color: "#fff",
          fontWeight: "500",
        },
      });
      return;
    }

    setLoading(true);
    let imageUrl: string | null = null;

    try {
      if (imageFile) {
        imageUrl = await uploadImageToSupabase(imageFile);
      }

      const newDebate: Debate = {
        id: Date.now(),
        name,
        description,
        duration,
        image: imageUrl,
        user: user.username,
      };

      await axios.post("https://dture-backend-1.onrender.com/create", newDebate);

      // Reset form
      setName("");
      setDescription("");
      setDuration("24 Hours");
      setImageFile(null);

      toast.success("Debate created successfully 🔥", {
        style: {
          borderRadius: "14px",
          background: "linear-gradient(135deg, #18181b, #27272a)",
          color: "#fff",
          fontWeight: "500",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Error creating debate ❌", {
        style: {
          borderRadius: "14px",
          background: "linear-gradient(135deg, #18181b, #27272a)",
          color: "#fff",
          fontWeight: "500",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex justify-center px-4 py-19">
        <div className="w-full max-w-3xl gap-10 text-center space-y-8">

          {/* Debate Title */}
          <div className="text-xl">
             <input
            className="w-full   bg-zinc-900 p-3 rounded-xl border border-zinc-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-20"
            placeholder="Debate Topic?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> 
          </div>
        

          {/* Description */}
          <div className="mt-10 text-xl">
            <textarea
            className="w-full   bg-zinc-900 p-2 rounded-xl border border-zinc-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={12}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </div>
          

          {/* Image Upload */}
     <div className="w-full max-w-xl mx-auto space-y-2">
  
  {/* File Input */}
  <div className="relative">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="w-full rounded-xl border border-green-500 bg-gradient-to-r from-zinc-900/80 to-zinc-800/80
                 p-3 text-gray-300 cursor-pointer shadow-md hover:shadow-green-400/50 transition-shadow
                 focus:outline-none focus:ring-2 focus:ring-green-400"
    />

    {/* Optional icon */}
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 text-lg pointer-events-none">
      📎
    </span>
  </div>

  {/* File Name */}
  {imageFile && (
    <p className="text-sm text-gray-400 mt-1 truncate font-medium">
      {imageFile.name}
    </p>
  )}
</div>


          {/* Duration Selector */}
          <div className="flex justify-center">
            <div className="flex gap-4 bg-zinc-900 p-3 rounded-2xl border border-zinc-700">
              {["24 Hours", "3 Days", "7 Days"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300
                    ${
                      duration === d
                        ? "bg-green-500 text-black rounded-2 shadow-[0_0_25px_rgba(34,197,94,0.6)]"
                        : "text-gray-300 hover:bg-zinc-800"
                    }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-2xl">
                <button
            onClick={handleAddDebate}
            disabled={loading}
            className={`px-8 py-3  font-bold rounded-5
              bg-gradient-to-r from-green-400 to-emerald-500
              text-black shadow-[0_0_30px_rgba(34,197,94,0.6)]
              hover:shadow-[0_0_45px_rgba(34,197,94,0.9)]
              transition-all duration-300 transform hover:-translate-y-1
              ${loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            Create Debate
          </button>
          </div>
      

          {/* Loader */}
          <Loading open={loading} text="Creating debate..." />

        </div>
      </div>
    </>
  );
};

export default CreateDebates;
