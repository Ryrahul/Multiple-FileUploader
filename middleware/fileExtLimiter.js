const path = require("path");

const fileExtlimiter = (extArray) => {
  return (req, res, next) => {
    const files = req.files;
    const fileExt = [];
    Object.keys(files).forEach((key) => {
      fileExt.push(path.extname(files[key].name));
    });
    const allowed = fileExt.every((ext) => extArray.includes(ext));
    if (!allowed) {
      const message =
        `Upload failed. Only ${extArray.toString()} files allowed.`.replaceAll(
          ",",
          ", "
        );

      return res.status(422).json({ status: "error", message });
    }
    next();
  };
};
module.exports = fileExtlimiter;
