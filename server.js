var express = require("express");
var multer = require("multer");
var path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

var app = express();

app.use("/public", express.static(path.join(__dirname, "/uploads")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./veiw/abc.html"));
});

app.post("/upload", upload.single("file"), function (req, res, next) {
  console.log(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json("http://localhost:3000/public/" + req.file.filename);
});

app.listen(3000);
