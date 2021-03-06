const express = require("express");
const router = express.Router();
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({storage: storage});

module.exports = router;
//     http://localhost:7000/api/student?class=1

router.get("/get-news", async (req, res) => {
  try {
    let rows = await req.db("content_news").select("*").where("active", 1);
    res.send({
      ok: true,
      list: rows,
    });
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});

router.post("/createAndUpdate-news", async (req, res) => {
  let data = req.body.item;
  try {
    if (data.id == 0) {
      var currentdate = new Date();
      let _insertContent = {
        contentName: data.contentName,
        contentPreview: data.contentPreview,
        contentDetail: data.contentDetail,
        photoCover: req.body.image,
        active: 1,
        createBy: "admin_01",
        createDate: currentdate,
        updateBy: null,
        updateDate: null,
      };
      let returnId = await req
        .db("content_news")
        .insert(_insertContent)
        .returning("id");
      res.send({
        ok: returnId,
      });
    } else {
      var currentdate = new Date();
      await req.db("content_news").where("id", data.id).update({
        contentName: data.contentName,
        contentPreview: data.contentPreview,
        contentDetail: data.contentDetail,
        active: 1,
        updateBy: "admin_01",
        updateDate: currentdate,
      });
      res.send({
        ok: "",
      });
    }
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});

router.post("/update-news", async (req, res) => {
  let data = req.body;
  try {
    var currentdate = new Date();
    await req.db("content_news").where("id", data.id).update({
      contentName: data.contentName,
      contentDetail: data.contentDetail,
      active: 1,
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

router.post("/delete-news", async (req, res) => {
  let data = req.body;
  try {
    var currentdate = new Date();
    let DeleteContent = {
      active: 0,
      createDate: currentdate,
      updateBy: "admin_01",
      updateDate: currentdate,
    };
    await req.db("content_news").where("id", data.id).update({
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
