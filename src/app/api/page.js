export default function handler(req, res) {
  // Log the Firebase API Key (or other sensitive environment variables)
  console.log("FIREBASE_API_KEY:", process.env.FIREBASE_API_KEY);
  // Respond with a success message
  res.status(200).json({ message: "Debug information logged" });
}
