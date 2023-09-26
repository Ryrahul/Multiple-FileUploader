export const fileExist = (req, res, next) => {
  if (!req.files) {
    res.status(401).json({ status: "error", message: "No files attached" });
    
  }
  next()
};


