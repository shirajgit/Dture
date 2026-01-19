import React, { useState, useContext, useEffect } from "react";
import { DebateContext } from "../DebatesContext";
import axios from "axios";
import Debate from "./Debate";
import { supabase } from "@/supabase";
import { toast } from "react-toastify";
import Popup from "./sub-components/Pop-up";
import Loading from "./sub-components/Pop-up";
import { Flag } from "lucide-react";

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
  const [user, setUser] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("24 Hours");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false)
   

    useEffect(() => {
    const fetchProfile = async () => {
 
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:3000/user/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      
    };

    fetchProfile();
  }, []);


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  console.log("Selected file:", file); // 👈 MUST check
  setImageFile(file);
};

 
const uploadImageToSupabase = async (file: File) => {
  if (!file || !file.name) {
    throw new Error("Invalid file selected");
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(fileName);

  return data.publicUrl;
};


const handleAddDebate = async () => {
  if (!name.trim() || !description.trim()) return;

  let imageUrl: string | null = null;

  try {
        setLoading(true);
    if (imageFile) {
      imageUrl = await uploadImageToSupabase(imageFile as unknown as File);
    }

    const newDebate: Debate = {
      id: Date.now(),
      name,
      description,
      duration,
      image: imageUrl,
      user: user.username, 
    };

    const res = await axios.post(
      "http://localhost:3000/create",
      newDebate
    );


    setName("");
    setDescription("");
    setDuration("24 Hours");
    setImageFile(null);
     setLoading(true)
       
      toast.success( "Debate created Succesfully🔥",
        {
          style: {
            borderRadius: "14px",
            background: "linear-gradient(135deg, #18181b, #27272a)",
            color: "#fff",
            fontWeight: "500",
          },
        }
      );
 
   
  } catch (error) {
    console.error(error);
    alert("Error creating debate");
  } finally{
     setLoading(false)
  }
};

  return (<>
      <div className="container text-center mt-20 items-center justify-center  mb-10">
      <div className="m-10 text-2xl  mb-10 items-center justify-center flex"> 
         <input
          className=" bg-gray-900 p-3  w-220 rounded-xl border-gray-600"
        placeholder="Debate Topic?"
        name="title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <div className="m-10 text-xl items-center justify-center flex"> 
      <textarea
        className=" bg-gray-900  p-3 h-90 w-220 rounded-xl"
        rows={10}
        placeholder="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> </div>
      <div className="m-10 text-xl items-center justify-center flex "> 
        <input
        type="file"
        accept="image/*"
        name="image"
        onChange={handleImageChange}
        className=" bg-gray-900  p-3  w-190 rounded-xl mb-10"
      />
       </div>
      <ul className="nav nav-pills gap-15 text-xl lg:text-3xl bg-gray-900  p-3 rounded-2xl mt-20 mb-5  flex  justify-center" id="pills-tab" role="tablist">
        {["24 Hours", "3 Days", "7 Days"].map((d) => (
          <li className="text-white nav-item" key={d}>
            <button
              className={`text-white nav-link ${duration === d ? "actives text-white  actives font-semibold shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]   hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7 transition-all duration-300 transform hover:-translate-y-1" : ""}`}
              onClick={() => setDuration(d)}
            >
              {d}
            </button>
          </li>
        ))}
      </ul>
       <div className="text-3xl">
        <button
        className=" actives w-85 h-15 rounded-5 font-semibold mt-8 mb-8  actives font-semibold shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]   hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7 transition-all duration-300 transform hover:-translate-y-1"
        onClick={handleAddDebate}
      >
        Create Debate
      </button>
       </div>
        < Loading open={loading} text={"Creating debate..."} /> 
    </div> 
   
    </>
  );
};

export default CreateDebates;