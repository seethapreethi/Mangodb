const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require('./models/user');
const jwt = require('jsonwebtoken');


// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

dotenv.config();
const app = express();

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");
const loginRoutes = require("./routes/registerRouter");

const corsOptions = {
  origin: ["http://localhost:2395", "http://localhost:8275", "http://localhost:6290"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);
app.use("/", loginRoutes);






const dbURI = "mongodb://localhost:27017/usermanagment";


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
