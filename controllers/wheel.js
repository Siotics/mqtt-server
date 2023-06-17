const router = require("express").Router();
const { client } = require("../mqclient");
const { CheckValidClient } = require("../module/handleClient");

function WheelProcess(req, res, operation){
    let id = CheckValidClient(req.query.id);
    if (id === "ERROR") {
        res.status(400).send("Must give ESP id");
        return;
    }
    console.log(id);
    client.publish(`esp/${id}/response`, operation);
    res.status(200).json({result:"Success"});
}

router.route("/up").get(async (req, res) => {
    WheelProcess(req, res, "1000");
});

router.route("/back").get(async (req, res) => {
    WheelProcess(req, res, "3000");
});

router.route("/left").get(async (req, res) => {
    WheelProcess(req, res, "2000");
});

router.route("/right").get(async (req, res) => {
    WheelProcess(req, res, "4000");
});

module.exports = router;