const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

export const filesizelimiter = (req, res, next) => {
  const files = req.files;
  const fileOverlimit = [];

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMIT) {
      fileOverlimit.push(files[key].name);
    }
  });
  if (fileOverlimit.length) {
    const properVerb = fileOverlimit.length > 1 ? "are" : "is";

    const sentence =
      `Upload failed. ${filesOverlimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(
        ",",
        ", "
      );

    const message =
      fileOverlimit.length < 3
        ? sentence.replace(",", " and")
        : sentence.replace(/,(?=[^,]*$)/, " and");

    return res.status(413).json({ status: "error", message });
  }
  next();
};
