const express = require("express");
const router = express.Router();

module.exports = router;
//     http://localhost:7000/api/student?class=1

router.get("/get-souvenir", async (req, res) => {
  try {
    let rows = await req.db("content_souvenir").select("*").where("active", 1);
    res.send({
      ok: true,
      list: rows,
    });
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});

router.post("/createAndUpdate-souvenir", async (req, res) => {
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
        updateBy: "",
        updateDate: "",
      };
      let returnId = await req
        .db("content_souvenir")
        .insert(_insertContent)
        .returning("id");
      res.send({
        ok: returnId,
      });
    } else {
      var currentdate = new Date();
      await req.db("content_souvenir").where("id", data.id).update({
        contentName: data.contentName,
        contentPreview: data.contentPreview,
        contentDetail: data.contentDetail,
        active: 1,
        updateBy: "admin_01",
        updateDate: currentdate,
      });
    }
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});

router.post("/update-souvenir", async (req, res) => {
  let data = req.body;
  try {
    var currentdate = new Date();
    await req.db("content_souvenir").where("id", data.id).update({
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

router.post("/delete-souvenir", async (req, res) => {
  let data = req.body;
  try {
    var currentdate = new Date();
    let DeleteContent = {
      active: 0,
      createDate: currentdate,
      updateBy: "admin_01",
      updateDate: currentdate,
    };
    await req.db("content_souvenir").where("id", data.id).update({
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

router.post("/get-content-souvenir", async (req, res) => {
  let data = req.body;
  try {
    let rows = await req
      .db("content_souvenir")
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
