const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "https://property-management-frontend.vercel.app",
  "https://property-management-frontend-git-main.vercel.app",
  "https://property-management-frontend-*.vercel.app",
  "https://property-management-backend-six.vercel.app", 
  "https://property-management-backend-673l.onrender.com",
  "http://localhost:3000",
  "http://localhost:8080",
];

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow any vercel.app subdomain for frontend
      if (origin.includes('vercel.app')) {
        return callback(null, true);
      }

      console.error("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  })
);

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/properties", require("./src/routes/property.routes"));
app.use("/api/leads", require("./src/routes/lead.routes"));

app.get("/", (req, res) => {
  res.send("🚀 Property Management API is running");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


app.use((err, req, res, next) => {
  console.error("🔥 Server error:", err.message);
  console.error("🔥 Error stack:", err.stack);
  console.error("🔥 Error name:", err.name);
  res.status(500).json({
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
