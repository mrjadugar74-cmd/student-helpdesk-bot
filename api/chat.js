export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  const { message } = req.body;

  const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;


  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `You are a helpful college assistant. Answer this student question clearly: ${message}`,
        }),
      }
    );

    const data = await response.json();

    let reply = "Sorry, I couldn’t generate a response.";

    if (data && data[0] && data[0].generated_text) {
      reply = data[0].generated_text;
    }

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ reply: "Server error. Try again." });
  }
}
