import { useState } from "react";
import { motion } from "framer-motion";
import Background from "../components/Background/Background";
import { FaGoogle, FaBalanceScale, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Auth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("User");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    city: "",
    state: "",
    pincode: "",
    barId: "",
    experience: "",
    specialization: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSpecialization = (value) => {
    setForm((prev) => {
      const exists = prev.specialization.includes(value);
      return {
        ...prev,
        specialization: exists
          ? prev.specialization.filter((s) => s !== value)
          : [...prev.specialization, value],
      };
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (isLogin) {
        const res = await fetch(`${API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            role,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data.user));

        // RBAC ROUTE
        if (data.role === "Advocate") navigate("/advocate");
        else navigate("/user");
      } else {
        const endpoint =
          role === "Advocate"
            ? `${API}/authAdvocate/signup`
            : `${API}/auth/signup`;

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, role }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

        alert("Signup successful 🚀 Now login");
        setIsLogin(true);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
 <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4">

      {/* Background */}
      <Background />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>

      {/* FLOATING ORBS */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>

      {/* MAIN GRID */}
      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE - TRUST / QUOTE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white space-y-6"
        >

          <div className="flex items-center gap-3 text-cyan-400">
            <FaBalanceScale />
            <span className="text-sm tracking-widest uppercase">
              NyaySetu Legal AI
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            Justice begins with{" "}
            <span className="text-cyan-400">clarity</span>, not confusion.
          </h1>

          <p className="text-slate-400 leading-7">
            AI-powered legal guidance trusted by users to understand rights,
            resolve disputes, and connect with verified advocates instantly.
          </p>

          {/* TRUST QUOTE BOX */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <p className="text-sm text-slate-300 italic">
              “Technology should not replace justice — it should make justice accessible.”
            </p>

            <div className="mt-3 flex items-center gap-2 text-cyan-400 text-xs">
              <FaShieldAlt />
              Verified & Encrypted Platform
            </div>
          </div>

        </motion.div>

       {/* RIGHT */}
<motion.div>
  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">

    <h2 className="text-center text-white text-2xl font-bold tracking-wide">
      Nyay<span className="text-cyan-400">Setu</span>
    </h2>

    {/* ROLE SWITCH */}
    <div className="flex mt-4 bg-black/30 p-1 rounded-xl">
      {["User", "Advocate"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          className={`w-1/2 py-2 rounded-lg transition-all duration-300 ${
            role === r ? "bg-cyan-500 text-black font-semibold" : "text-white"
          }`}
        >
          {r}
        </button>
      ))}
    </div>

    {/* FORM */}
    <div className="space-y-3 mt-4">
      {!isLogin && (
        <>
          <input name="name" placeholder="Full Name" onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

          <input name="mobile" placeholder="Mobile" onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

          <input name="city" placeholder="City" onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

          <input name="state" placeholder="State" onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

          <input name="pincode" placeholder="Pincode" onChange={handleChange}
            className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

          {role === "Advocate" && (
            <>
              <input name="barId" placeholder="Bar ID"
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

              <input name="experience" placeholder="Experience (years)"
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

           <div className="p-3 rounded-xl border border-white/10 bg-black/30">
    <p className="text-cyan-300 font-semibold mb-2">
      Specialization
    </p>

    <div className="grid grid-cols-2 gap-2 text-slate-300">
      
      {[
        "All",
        "Civil",
        "Constitutional",
        "Criminal",
        "Family",
        "Administrative",
        "Commercial",
        "Labour",
        "Taxation",
        "PIL",
      ].map((s) => (
        <label key={s} className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleSpecialization(s)}
            className="accent-cyan-400"
          />
          {s}
        </label>
      ))}

    </div>
  </div>
            </>
          )}
        </>
      )}

      <input name="email" placeholder="Email" onChange={handleChange}
        className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />

      <input name="password" type="password" placeholder="Password"
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-black/40 text-white outline-none border border-white/10 focus:border-cyan-400" />
    </div>

{/* BUTTON */} <button onClick={handleSubmit} disabled={loading} className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold tracking-wide hover:scale-[1.02] transition-all" > {isLogin ? "Enter Dashboard" : "Create Account"} </button>
  
    {/* LOGIN / SIGNUP TOGGLE TEXT */}
<p className="text-center text-sm text-slate-400 mt-4">
  {isLogin ? (
    <>
      Not registered?{" "}
      <span
        className="text-cyan-400 cursor-pointer font-medium hover:underline"
        onClick={() => setIsLogin(false)}
      >
        Create account
      </span>
    </>
  ) : (
    <>
      Already have an account?{" "}
      <span
        className="text-cyan-400 cursor-pointer font-medium hover:underline"
        onClick={() => setIsLogin(true)}
      >
        Login
      </span>
    </>
  )}
</p>

    {/* PREMIUM QUOTE */}
    <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-black/30">
      <p className="text-sm text-slate-300 italic leading-relaxed">
        “In the silence of law, technology becomes the voice of justice —
        precise, unbiased, and always awake.”
      </p>

      <p className="text-xs text-cyan-400 mt-2 flex items-center gap-2">
        <FaShieldAlt />
        Encrypted • Verified • Trust-first System
      </p>
    </div>

  </div>
</motion.div>
 </div>
    </div>
  );
}

