import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaBalanceScale,
  FaSearch,
  FaMapMarkerAlt,
  FaUserCircle,
  FaStar, // Added missing icon import
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Background from "../components/Background/Background";
import Navbar from "../components/Navbar-User/Navbar-User";
import Footer from "../components/Footer-User/Footer-User";

import API from "../api";

export default function User() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchPin, setSearchPin] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [showNoteBox, setShowNoteBox] = useState(false);
  const [selectedAdvocate, setSelectedAdvocate] = useState(null);
  const [message, setMessage] = useState("");
  const advocateSectionRef = useRef(null);

  const caseTypes = [
    "All",
    "Civil",
    "Criminal",
    "Constitutional",
    "Administrative",
    "Family",
    "Commercial",
    "Labour",
    "Taxation",
    "PIL",
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    fetchAdvocates();
  }, []);

  const fetchAdvocates = async () => {
    try {
      setLoading(true);
    const res = await fetch(`${API}/authAdvocate/all`);
const data = await res.json();

if (data.success) {
  setAdvocates(data.advocates);
  setFilteredAdvocates(data.advocates);
}
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

 const filterByCase = (type) => {
  setSelectedType(type);

  let list = advocates;

  if (type !== "All") {
    list = advocates.filter((item) => {
      if (Array.isArray(item.specialization)) {
        return item.specialization.includes(type);
      }

      return item.specialization === type;
    });
  }

  setFilteredAdvocates(list);

  // Scroll to advocates section
  setTimeout(() => {
    advocateSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
};

 const searchByPincode = () => {
  let list = advocates;

  if (searchPin.trim()) {
    list = advocates.filter(
      (item) =>
        item.pincode &&
        item.pincode.toString() === searchPin.toString()
    );
  }

  setFilteredAdvocates(list);

  // Scroll to advocates section
  setTimeout(() => {
    advocateSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);
};
const sendHireRequest = async (description) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    return;
  }

  try {
    const res = await fetch(`${API}/api/hire`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify({
    advocateId: selectedAdvocate._id,
    caseType: "General",
    description: description,
  }),
});

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      setShowPopup(false);
      setShowNoteBox(false);
      setMessage("");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};
  return (
   <div className="relative min-h-screen bg-[#030712] overflow-x-hidden pb-12">
      <Background />
      <div className="absolute inset-0 bg-black/60"></div>
<Navbar />


      {/* ================= HERO ================= */}
      <section id="hero" className="relative z-10 pt-36 pb-14">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-6xl font-bold text-white"
          >
            Find Your <span className="text-cyan-400">Legal Expert</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-slate-300 mt-6 text-xl"
          >
            Find verified advocates near you and connect instantly.
          </motion.p>

        {/* SEARCH */}
<div className="mt-12 max-w-5xl mx-auto">
  <div className="flex flex-col md:flex-row gap-4 items-center">

    {/* Search Bar */}
    <div className="flex-1 flex items-center gap-4 px-6 h-16 rounded-2xl bg-white/10 backdrop-blur-2xl border border-cyan-400/20 shadow-[0_0_25px_rgba(34,211,238,0.15)]">

      <FaMapMarkerAlt className="text-cyan-400 text-xl" />

      <input
        type="text"
        placeholder="Search by Pincode..."
        value={searchPin}
        onChange={(e) => setSearchPin(e.target.value)}
        className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400 text-lg"
      />
    </div>

    {/* Search Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={searchByPincode}
      className="h-16 px-10 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white font-semibold flex items-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:shadow-[0_0_45px_rgba(34,211,238,0.6)] transition-all duration-300"
    >
      <FaSearch />
      Search
    </motion.button>

  </div>
</div>

          {/* ================= CASE TYPES ================= */}
        <div id="case-types" className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              Browse by <span className="text-cyan-400">Case Type</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {caseTypes.map((type, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => filterByCase(type)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border ${
                    selectedType === type
                      ? "border-cyan-400 bg-cyan-500/20 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  } backdrop-blur-xl`}
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                      <FaBalanceScale className="text-white text-3xl" />
                    </div>
                  </div>
                  <h3 className="text-center text-white text-lg font-semibold mt-5">
                    {type}
                  </h3>
                  <p className="text-center text-slate-400 text-sm mt-2">
                    Find best advocates
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= ADVOCATES GRID ================= */}
     <div id="advocates" ref={advocateSectionRef} className="mt-20">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white">Top Advocates</h2>
                <p className="text-slate-400 mt-2">
                  Verified lawyers available for consultation
                </p>
              </div>
              <div className="text-cyan-400 font-semibold">
                {filteredAdvocates.length} Advocates Found
              </div>
            </div>

            {loading ? (
             <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-96 rounded-3xl bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredAdvocates.length === 0 ? (
              <div className="text-center py-24">
                <h2 className="text-3xl font-bold text-white">
                  No Advocates Found
                </h2>
                <p className="text-slate-400 mt-4">
                  Try another specialization or pincode.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredAdvocates.map((advocate) => (
                  <motion.div
                    key={advocate._id}
                    whileHover={{ y: -10 }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
                  >
                    {/* Card Header */}
                    <div className="relative h-24 bg-gradient-to-r text-cyan-400">
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                        <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-cyan-400 flex items-center justify-center">
                       <FaUserCircle className="text-cyan-400 text-5xl" />
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                 <div className="px-5 pt-12 pb-5">
                   <h2 className="text-center text-xl font-bold text-white truncate">
                        {advocate.name}
                      </h2>
                      <p className="text-center text-slate-400 mt-2">
                        Advocate
                      </p>

                      {/* Rating */}
                  <div className="flex justify-center items-center gap-2 mt-3">
  <FaStar className="text-yellow-400" />

  <span className="text-white">
    {(4 + (parseInt(advocate._id.slice(-2), 16) % 10) / 10).toFixed(1)}
  </span>

  <span className="text-slate-500">
    ({(parseInt(advocate._id.slice(-3), 16) % 450) + 50} Reviews)
  </span>
</div>
                      {/* Details */}
                     <div className="space-y-2 mt-5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Experience</span>
                          <span className="text-white font-semibold">
                            {advocate.experience || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">City</span>
                          <span className="text-white">
                            {advocate.city || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Pincode</span>
                          <span className="text-white">
                            {advocate.pincode || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mobile</span>
                          <span className="text-white">
                            {advocate.mobile || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Specialization */}
                    <div className="mt-5">
                        <h4 className="text-white font-semibold mb-3">
                          Specialization
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {advocate.specialization?.length ? (
                            advocate.specialization.map((item, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm"
                              >
                                {item}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500">
                              Not Available
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="mt-7 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-green-400">Available</span>
                        </div>
                        <span className="text-slate-400 text-sm">Verified</span>
                      </div>

                      {/* Buttons */}
                    <div className="mt-5">
                        <button
                          onClick={() => {
  setSelectedAdvocate(advocate);
  setShowPopup(true);
  setShowNoteBox(false);
  setMessage("");
}}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition text-white font-semibold text-sm"
                        >
                          Consult Now
                        </button>
                     
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
          </section>

      {/* ================= CONSULT POPUP ================= */}

      {showPopup && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

         <div className="relative bg-slate-900 border border-cyan-500 rounded-2xl p-8 w-[420px]">

  {/* Close Button */}
  <button
    onClick={() => {
      setShowPopup(false);
      setShowNoteBox(false);
      setMessage("");
    }}
    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition"
  >
    ✕
  </button>
            <h2 className="text-2xl font-bold text-white text-center">
              Consult an Advocate
            </h2>

            {!showNoteBox ? (
              <div className="mt-6 space-y-4">

                <button
                  onClick={() => setShowNoteBox(true)}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Consult with Note
                </button>

                <button
                  onClick={() => sendHireRequest("No message added")}
                  className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                >
                  Consult without Note
                </button>


              </div>
            ) : (
              <div className="mt-6">

                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full rounded-xl bg-slate-800 border border-cyan-500 p-4 text-white outline-none"
                />

                <button
                  onClick={() => sendHireRequest(message)}
                  className="w-full mt-4 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Send Request
                </button>

              </div>
            )}

          </div>

        </div>
      )}
<div className="relative z-20">
  <Footer />
</div>
    </div>
  );
}