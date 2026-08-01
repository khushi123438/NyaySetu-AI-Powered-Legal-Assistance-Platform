import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaBalanceScale,
  FaBriefcase,
  FaSignOutAlt,
  FaShieldAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import API from "../api";
import Background from "../components/Background/Background";

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [popup, setPopup] = useState({
  open: false,
  title: "",
  content: "",
});

  useEffect(() => {
   const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth");
      return;
    }

  const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    console.log(data);

    // ✅ Correct
    setProfile(data.profile);

  } catch (err) {
    console.log(err);
    alert("Failed to load profile");
  } finally {
    setLoading(false);
  }
};

    fetchProfile();
  }, [navigate]);

  const logout = () => {
   localStorage.removeItem("token");
localStorage.removeItem("role");
localStorage.removeItem("user");
    navigate("/auth");
  };

 if (loading) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-gray-700 font-semibold text-center">
            Loading Profile...
          </p>
        </div>
      </div>
    </div>
  );
}

if (!profile) return null;
    return (
   <div className="relative min-h-screen overflow-hidden">

    {/* Animated Background */}
    <Background />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

    {/* Profile Content */}
    <div className="relative z-10 min-h-screen flex justify-center items-center px-5 py-10">

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="h-32 bg-gradient-to-r text-cyan-400 relative">

          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-cyan-400 flex justify-center items-center">
              <FaUserCircle className="text-7xl text-white" />
            </div>
          </div>

        </div>

        <div className="pt-16 px-8 pb-8">

          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Your Profile
          </h2>

          <div className="mt-8 space-y-4">

            <ProfileRow
              icon={<FaUserCircle />}
              label="Name"
              value={profile.name}
            />

            <ProfileRow
              icon={<FaEnvelope />}
              label="Email"
              value={profile.email}
            />

            <ProfileRow
              icon={<FaPhone />}
              label="Mobile"
              value={profile.mobile}
            />

            <ProfileRow
              icon={<FaMapMarkerAlt />}
              label="City"
              value={profile.city}
            />

            <ProfileRow
              icon={<FaMapMarkerAlt />}
              label="State"
              value={profile.state}
            />

            <ProfileRow
              icon={<FaMapMarkerAlt />}
              label="Pincode"
              value={profile.pincode}
            />

            <ProfileRow
              icon={<FaShieldAlt />}
              label="Role"
              value={profile.role}
            />

            {profile.role?.toLowerCase() === "advocate" && (
              <>
                <ProfileRow
                  icon={<FaBalanceScale />}
                  label="Bar ID"
                  value={profile.barId}
                />

                <ProfileRow
                  icon={<FaBriefcase />}
                  label="Experience"
                  value={`${profile.experience} Years`}
                />

                <ProfileRow
                  icon={<FaBalanceScale />}
                  label="Specialization"
                  value={
                    Array.isArray(profile.specialization)
                      ? profile.specialization.join(", ")
                      : profile.specialization
                  }
                />
              </>
            )}
          </div>

    <div className="mt-8 bg-white rounded-2xl p-5 shadow-lg">

  <Option
    text="Our Services"
    content="NyaySetu provides AI-powered legal assistance, verified advocate search, document analysis, legal news updates, secure consultation requests, and real-time chat with advocates."
    setPopup={setPopup}
  />

  <Option
    text="Terms & Conditions"
    content="By using NyaySetu, you agree to use the platform responsibly. Information provided by AI is for guidance only and should not replace professional legal advice."
    setPopup={setPopup}
  />

  <Option
    text="Privacy Policy"
    content="Your personal information is encrypted and securely stored. NyaySetu never shares your data with third parties without your consent."
    setPopup={setPopup}
  />

  <button
    onClick={logout}
    className="w-full mt-4 bg-red-100 hover:bg-red-200 transition rounded-xl py-3 font-semibold text-red-700 flex justify-center items-center gap-2"
  >
    <FaSignOutAlt />
    Logout
  </button>

</div>
                    </div>
      </div>

    </div>
    {popup.open && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

    <div className="bg-white rounded-2xl max-w-md w-[90%] p-6 relative shadow-2xl">

      <button
        onClick={() =>
          setPopup({
            open: false,
            title: "",
            content: "",
          })
        }
        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
      >
        <FaTimes size={20} />
      </button>

      <h2 className="text-2xl font-bold text-cyan-600 mb-4">
        {popup.title}
      </h2>

      <p className="text-gray-700 leading-7">
        {popup.content}
      </p>

    </div>

  </div>
)}
  </div>
);
}
function ProfileRow({ icon, label, value }) {
  return (
    <div className="flex justify-between items-center bg-indigo-50 border-l-4 border-indigo-600 rounded-lg px-4 py-3">

      <div className="flex items-center gap-3 font-semibold text-gray-700">

        <span className="text-indigo-600">{icon}</span>

        {label}

      </div>

      <div className="text-gray-900 font-medium text-right">
        {value || "-"}
      </div>

    </div>
  );
}
function Option({ text, content, setPopup }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 hover:bg-cyan-50 transition rounded-xl px-4 py-3 mb-3">

      <span className="font-semibold text-gray-800">
        {text}
      </span>

      <button
        onClick={() =>
          setPopup({
            open: true,
            title: text,
            content,
          })
        }
        className="w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white flex items-center justify-center"
      >
        <FaPlus size={12} />
      </button>


    </div>

    
  );
}