import mongoose from "mongoose";
import readline from "readline";
import Advocate from "./models/Advocate.js"; 

const MONGO_URI = "mongodb://127.0.0.1:27017/nyayasetu";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function updateMissingMobiles() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB.\n");

   
    const advocates = await Advocate.find({ $or: [{ mobile: "" }, { mobile: null }] });

    if (advocates.length === 0) {
      console.log("No advocates with missing mobile numbers found.");
      await mongoose.disconnect();
      rl.close();
      return;
    }

    console.log(`Found ${advocates.length} advocates with missing mobile numbers.\n`);

    for (let adv of advocates) {
      console.log(`Advocate: ${adv.name} | Email: ${adv.email}`);
      let mobile = await question("Enter mobile number: ");
      mobile = mobile.trim();

    
      if (!mobile) mobile = "Not provided";

     
      adv.mobile = mobile;
      await adv.save();
      console.log(`Updated ${adv.name} with mobile: ${mobile}\n`);
    }

    console.log("All missing mobile numbers updated!");
    await mongoose.disconnect();
    rl.close();
  } catch (err) {
    console.error("Error:", err);
    rl.close();
    await mongoose.disconnect();
  }
}

updateMissingMobiles();
