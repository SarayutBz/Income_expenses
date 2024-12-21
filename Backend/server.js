const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const localhost = "localhost:";
const port = 3000;
let conn = null;

const initMySql = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "sayuball",
    password: "iloveyousomust",
    database: "finpense",
    port: 3306,
  });
};

app.get("/users", async (req, res) => {
  try {
    const results = await conn.query("SELECT * FROM users");
    res.json(results[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "มะได้ละอ้ายแก้ใหม่",
      errorMessage: error.message,
    });
  }
});

app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const { name, email, password, passwordConfirm } = req.body;

    // ตรวจสอบข้อมูล
    if (!name || !email || !password || password !== passwordConfirm) {
      return res
        .status(400)
        .json({ message: "ข้อมูลไม่ถูกต้องหรือรหัสผ่านไม่ตรงกัน" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // บันทึกข้อมูลลงฐานข้อมูล
    const results = await conn.query("INSERT INTO users SET ?", {
      name,
      email,
      password: hashedPassword, // ใช้ password ที่ถูก hash
    });

    res.json({
      message: "เพิ่มได้ละอ้าย",
      data: results[0],
    });
  } catch (error) {
    console.error("Error:", error.message);

    // ตรวจสอบข้อผิดพลาดจาก MySQL เช่น Email ซ้ำ
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email นี้ถูกใช้งานแล้ว" });
    }

    res.status(500).json({
      message: "มะได้ละอ้ายแก้ใหม่",
      errorMessage: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await conn.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "หาไม่เจออ้าย" });
    }

    const user = rows[0];
    console.log("User data from database:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again.",
      errorMessage: error.message,
    });
  }
});

app.listen(port, async () => {
  await initMySql();
  console.log("เชื่อมได้ละอ้าย");
  console.log(localhost + port);
});
