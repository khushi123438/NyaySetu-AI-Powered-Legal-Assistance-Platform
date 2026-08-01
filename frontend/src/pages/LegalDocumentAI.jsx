import { useState } from "react";
import { motion } from "framer-motion";
import Background from "../components/Background/Background";
import {
  FileText,
  Sparkles,
  Download,
  Scale,
} from "lucide-react";

export default function LegalDocumentAI() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDocument = async () => {
    if (!prompt.trim()) {
      alert("Please enter document details.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/generate-ai-doc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) throw new Error();

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "Legal_Document.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Failed to generate document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Background />

      <div className="relative z-20 min-h-screen flex items-center justify-center px-5 py-16">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="w-full max-w-6xl"
        >

          {/* Heading */}

          <div className="text-center mb-10">

            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/20 rounded-full px-5 py-2 mb-5">

              <Sparkles className="w-5 h-5 text-cyan-400" />

              <span className="text-cyan-300 font-medium">
                AI Powered Legal Assistant
              </span>

            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white">

              Legal Document

              <span className="text-cyan-400">
                {" "}Generator
              </span>

            </h1>

            <p className="text-slate-300 mt-5 max-w-3xl mx-auto text-lg leading-8">

              Generate professional legal drafts instantly using AI.
              Simply describe your requirements and download
              your legal agreement in PDF format.

            </p>

          </div>

          {/* Main Card */}

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(6,182,212,.15)]">

            <div className="flex items-center gap-3 mb-6">

              <FileText className="text-cyan-400" />

              <h2 className="text-2xl font-bold text-white">

                Describe Your Document

              </h2>

            </div>

            <textarea
              rows={12}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Example:

Create a Rent Agreement.

Landlord : Rahul Sharma

Tenant : Aman Verma

Property :
Flat No. 302,
Lucknow

Rent : ₹15000/month

Security Deposit :
₹30000

Duration :
11 Months

Additional Conditions :
Electricity Bill paid by Tenant.
`}
              className="w-full rounded-2xl bg-slate-900/70 border border-cyan-400/20 p-5 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-400 resize-none"
            />

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: .97,
              }}
              onClick={generateDocument}
              disabled={loading}
              className="mt-8 w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white shadow-lg shadow-cyan-500/30"
            >

              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Generate PDF
                </>
              )}

            </motion.button>

          </div>

          {/* Suggestions */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            {[
              "Rental Agreement",
              "Employment Agreement",
              "Non Disclosure Agreement",
              "Loan Agreement",
              "Partnership Agreement",
              "Freelance Contract",
            ].map((item) => (

              <motion.div
                whileHover={{
                  y: -8,
                }}
                key={item}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 transition"

              >

                <Scale className="text-cyan-400 mb-4" />

                <h3 className="text-white font-semibold">

                  {item}

                </h3>

                <p className="text-slate-400 mt-2 text-sm">

                  Generate this document instantly using AI.

                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>

      </div>
    </>
  );
}