require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());

mongoose.connect(
  "mongodb+srv://job:job@cluster0.bhq2u.mongodb.net/job?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  (err) => {
    if (err) console.log(err);
    else console.log("mongdb is connected");
  }
);

app.use(express.json());

// app.use("/", require("./routes/index"));
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/users", require("./routes/UserRoutes"));
app.use("/jobs", require("./routes/JobRoutes"));
app.use("/applicants", require("./routes/ApplicantRoutes"));
app.use("/companies", require("./routes/CompanyRoutes"));

app.listen(process.env.PORT || 4000, () =>
  console.log("server started at 4000")
);
