const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const userRouter = require("./routes/auth");
const productRouter = require("./routes/products");

const db = require("./database/db");
const cors = require("cors");
const path = require("path");
const app = express();

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// allow cors
app.use(cors());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// app.get('/',  async(req, res)=> {
//   res.send("Working");
// })

// Parse incoming request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/auth", userRouter);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}...`);
});
