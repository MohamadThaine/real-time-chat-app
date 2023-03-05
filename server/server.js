const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/CheckLoggedIn", (req, res) => {
  res.json({ iLoggedIn: true });
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001.`);
});