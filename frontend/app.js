const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", require("./src/routes/auth.routes"));
app.use("/", require("./src/routes/risk.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Frontend corriendo en puerto", PORT));
