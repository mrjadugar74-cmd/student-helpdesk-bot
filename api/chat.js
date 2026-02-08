import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  // Import data from collegeData.json
  const filePath = path.join(process.cwd(), "collegeData.json");
  const collegeData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Get message and convert to lowercase
  const message = req.body.message.toLowerCase();
  
  let reply = "";

  // Reply based on keywords
  if (message.includes("fee")) {
    reply = collegeData.fees;
  }
  else if (message.includes("hostel")) {
    reply = collegeData.hostel;
  }
  else if (message.includes("timing") || message.includes("hours")) {
    reply = collegeData.timings;
  }
  else if (message.includes("contact")) {
    reply = collegeData.contact;
  }
  else if (message.includes("exam")) {
    reply = "Exams follow the academic calendar.";
  }
  else if (message.includes("placement")) {
    reply = "Placements are handled by the placement cell.";
  }
  else if (message.includes("attendance")) {
    reply = "Minimum 75% attendance is required.";
  }
  else {
    reply = "I'm not sure about that. Please contact the admin.";
  }

  res.status(200).json({ reply });
}


