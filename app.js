const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fileExist = require("./middleware/fileExist");
const filesizelimiter = require("./middleware/filesizelimiter");
const fileExtlimiter = require("./middleware/fileExtLimiter");

const port = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  [fileExist, filesizelimiter, fileExtlimiter([".png", ".jpg", ".jpeg"])],
  (req, res) => {
    const files = req.files;
    console.log(files);
    return res.json({ status: "logged", message: "Succesfull" });
  }
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
