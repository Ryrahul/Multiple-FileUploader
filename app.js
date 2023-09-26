import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { fileExist } from "./middleware/fileExist.js";
import { filesizelimiter } from "./middleware/filesizelimiter.js";
import { fileExtlimiter } from "./middleware/fileExtLimiter.js";

const PORT = process.env.PORT ?? 8080;
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
        return res.status(200).json({
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

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
