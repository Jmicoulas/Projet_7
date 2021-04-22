const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");


router.get("/", homeController.getHome);
router.post("/upload", upload.single("file"), uploadController.uploadFiles);

module.exports = router;