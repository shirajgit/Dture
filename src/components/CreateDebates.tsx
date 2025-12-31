import React, { useState, useContext } from "react";
import { DebateContext } from "../DebatesContext";

interface Debate {
  id: number;
  name: string;
  description: string;
  duration: string;
  image: string | null;
}
 

const CreateDebates = () => {
  const { debates, addDebate } = useContext(DebateContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("24 Hours");
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddDebate = () => {
    if (!name.trim() || !description.trim()) return;

    const newDebate: Debate = {
      id: Date.now(),
      name,
      description,
      duration,
      image,
    };

    addDebate(newDebate);

    setName("");
    setDescription("");
    setDuration("24 Hours");
    setImage(null);
  };

  return (
    <div className="container text-center  justify-center mt-20 mb-10">
      <div className="m-10 text-2xl  mb-10 text-center  justify-center  flex"> 
         <input
          className=" bg-gray-900 p-3  w-220 rounded-xl border-gray-600"
        placeholder="Debate Topic?"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      </div>
      <div className="m-10 text-xl flex text-center  justify-center "> 
      <textarea
        className=" bg-gray-900  p-3 h-90 w-220 rounded-xl"
        rows={10}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> </div>
      <div className="m-10 text-xl flex text-center  justify-center "> 
        <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className=" bg-gray-900  p-3  w-190 rounded-xl mb-10"
      />
       </div>
      <ul className="nav nav-pills gap-5 text-xl lg:text-3xl bg-gray-900  p-3 lg rounded-2xl mt-20 mb-5  flex  justify-center" id="pills-tab" role="tablist">
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
       <div className="text-xl lg:text-3xl">
        <button
        className=" actives w-55 lg:w-80 h-15 rounded-5 font-semibold mt-8 mb-8  actives font-semibold shadow-[0_0_25px_4px_rgba(134,239,172,0.4)]   hover:shadow-[0_0_35px_6px_rgba(134,239,172,0.7 transition-all duration-300 transform hover:-translate-y-1"
        onClick={handleAddDebate}
      >
        Create Debate
      </button>
       </div>
      
    </div>
  );
};

export default CreateDebates;