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
    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "files", files[key].name);
      files[key].mv(filepath, (err) => {
        return res.json({
          status: "error",
          message: "Not proper filepath or filename",
        });
      });
    });
    res.json({
      status: "logged",
      message: Object.keys(files).toString(),
    });
  }
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
