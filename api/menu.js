const express = require("express");
const router = express.Router();

module.exports = router;
//     http://localhost:7000/api/student?class=1

router.post("/get-menu", async (req, res) => {
  try {
    let rows = await req
      .db("mas_menu")
      .select("*")
      .where("typeMenu", req.body.typeMenu)
      .orderBy("sequence", "asc");
    // let rows = await req.db('student').select('code', 'firstName as fname', 'lastName')
    res.send({
      ok: true,
      list: rows,
    });
  } catch (e) {
    res.send({ok: false, error: e.message});
  }
});
