var express = require("express");
var fileUpload = require("express-fileupload");
var cloudinary = require("./cloudinary");

var port = 3000;
var app = express();

// use middleware for grant access upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// register route
app.post("/upload", (req, res) => {
  const { photo } = req.files;

  if (!photo) {
    res.status(400).json({ status: 400, message: "Photo is required" });
  }

  cloudinary.v2.uploader.upload(
    photo.tempFilePath,
    {
      public_id: new Date().getTime(),
    },
    (error, result) => {
      if (error) {
        res.status(500).json({ status: 500, message: "upload failed", error });
      } else {
        res.json({ status: 200, message: "Success", result });
      }
    }
  );
});

// running apps
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
