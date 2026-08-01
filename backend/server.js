import dotenv from "dotenv";
dotenv.config(); 
import dns from "dns";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import PDFDocument from "pdfkit";

import chatRoutes from "./routes/chat.js";
import authRouter from "./routes/auth.js";
import authAdvocateRoutes from "./routes/authAdvocate.js";
import hireRouter from "./routes/booking.js";
import profileRoutes from "./routes/profile.js";
import aiRoutes from "./routes/ai.routes.js";
import documentRoutes from "./routes/document.routes.js";

dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => {
    console.error("DB connection error:", err);
    process.exit(1);
  });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(process.cwd(),"uploads")));
app.use("/auth", authRouter);
app.use("/authAdvocate", authAdvocateRoutes);
app.use('/api/hire', hireRouter);
app.use("/api/profile", profileRoutes);
app.use("/chat", chatRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/document", documentRoutes);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model("Contact", contactSchema);

// Contact Us API
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message)
        return res.status(400).json({ success: false, message: "All fields required" });

    try {
        // Save to DB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Optional: Send Email to Admin
        if(process.env.ADMIN_EMAIL && process.env.EMAIL_USER && process.env.EMAIL_PASS){
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
            });

            await transporter.sendMail({
                from: `"NyaySetu Contact Form" <${process.env.EMAIL_USER}>`,
                to: process.env.ADMIN_EMAIL,
                subject: "New Contact Us Message",
                html: `<h3>New Message from ${name}</h3>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong> ${message}</p>`
            });
        }

        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get("/", (req, res) => res.json({ message: "NyaySetu API running 🚀" }));

app.get("/api/ai/health", (req, res) => {
    res.json({
        success: true,
        message: "NyaySetu AI Backend Running",
        model: process.env.MODEL,
        ollama: process.env.OLLAMA_URL
    });
});

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get("/news", async (req, res) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=legal OR law OR court OR judgment&language=en&pageSize=12&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    const data = await response.json();
    res.json(data.articles ? data : { articles: [] });
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ success: false, message: "Failed to fetch news" });
  }
});


app.post("/api/generate-ai-doc", (req, res) => {

const { prompt } = req.body;

const doc = new PDFDocument();

res.setHeader("Content-Type","application/pdf");
res.setHeader("Content-Disposition","attachment; filename=legal_document.pdf");

doc.pipe(res);

// Title
doc.fontSize(18).text("LEGAL AGREEMENT", { align: "center" });

doc.moveDown();

// Intro
doc.fontSize(12).text("This document is generated based on the following request:");
doc.moveDown();
doc.text(prompt);

doc.moveDown();

// Structured Legal Content
doc.fontSize(14).text("1. Parties Involved");
doc.fontSize(12).text("This agreement is made between Party A and Party B.");

doc.moveDown();

doc.fontSize(14).text("2. Purpose");
doc.fontSize(12).text("The purpose of this agreement is described in the request above.");

doc.moveDown();

doc.fontSize(14).text("3. Terms and Conditions");
doc.fontSize(12).text("Both parties agree to follow the mutually decided conditions.");

doc.moveDown();

doc.fontSize(14).text("4. Payment / Consideration");
doc.fontSize(12).text("Any payment terms should be clearly defined by both parties.");

doc.moveDown();

doc.fontSize(14).text("5. Termination Clause");
doc.fontSize(12).text("Either party may terminate this agreement with prior notice.");

doc.moveDown();

doc.fontSize(14).text("6. Governing Law");
doc.fontSize(12).text("This agreement shall be governed under applicable laws.");

doc.moveDown(2);

doc.text("Party A Signature: __________________");

doc.moveDown();

doc.text("Party B Signature: __________________");

doc.moveDown();

doc.text("Date: __________________");

doc.moveDown(2);

doc.fontSize(10).text("Disclaimer: This is an AI generated draft. Please consult a licensed advocate before legal use.");

doc.end();

});

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
