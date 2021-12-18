const express = require("express");
const router = express.Router();
var multer = require("multer");
var upload = multer({dest: "./uploads/"});
var fs = require("fs");
var type = upload.single("file");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    cb(null, file.originalname);
  },
});
var upload = multer({storage: storage});
module.exports = router;

router.post("/uploadProfilePicture", upload.single("file"), (req, res) => {
  res.json({
    message: "Succce",
  });
});

// router.post("/uploadProfilePicture", type, function (req, res) {
//   try {
//     console.log(req.file);

//   // var tmp_path = req.file.path;
//   // var target_path = "uploads/" + req.file.originalname;
//   // // var src = fs.createReadStream(tmp_path);
//   // var dest = fs.createWriteStream(target_path);

//       res.send({
//         ok: true,
//       });
//     } catch (e) {
//       res.send({ok: false, error: e.message});
//     }
// });

router.get("/get-content", async (req, res) => {
  try {
    let rows = await req
      .db("content_home")
      .select("id", "contentName", "createBy", "createDate");
    // let rows = await req.db('student').select('code', 'firstName as fname', 'lastName')
    res.send({
      ok: true,
      list: rows,
    });
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});

router.post("/create-content", async (req, res) => {
  let data = req.body;
  try {
    var currentdate = new Date();
    let _insertContent = {
      contentName: data.contentName,
      contentDetail: data.contentDetail,
      photoCover: "",
      active: 1,
      createBy: "admin_01",
      createDate: currentdate,
      updateBy: null,
      updateDate: null,
    };
    await req.db("content_home").insert(_insertContent);
    res.send({
      ok: true,
    });
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});

router.post("/delete-content", async (req, res) => {
  let data = req.body;
  try {
    var currentdate = new Date();
    let DeleteContent = {
      active: 0,
      createDate: currentdate,
      updateBy: "admin_01",
      updateDate: currentdate,
    };
    await req.db("content_home").where("id", data.id).update({
      active: 0,
      createDate: currentdate,
      updateBy: "admin_01",
      updateDate: currentdate,
    });
    res.send({
      ok: true,
    });
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});

router.post("/get-content", async (req, res) => {
  let data = req.body;
  // console.log(data.id);
  // console.log(data.type);
  // return
  try {
    const databaseName = "content_".concat(data.type);
    let rows = await req
      .db(databaseName)
      .select("*")
      .where("active", 1)
      .where("id", data.id);
    res.send({
      ok: true,
      list: rows,
    });
    res.send({
      ok: true,
    });
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});
