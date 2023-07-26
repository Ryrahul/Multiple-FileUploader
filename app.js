const express = require("express");
const fileUpload = require("express-fileupload");
const FileUpload = require("express-fileupload");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/upload", fileUpload({ createParentPath: true }), (req, res) => {
  const files = req.files;
  console.log(files);
   return res.json({status:"logged", message: "Succesfull" });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
