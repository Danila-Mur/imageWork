// const Router = require("express");
const express = require("express");
const multer = require('multer');
const router = express.Router();
const documentController = require("../controller/document.controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/tmp' )
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(' ', '-'))
    }
});
let uploadFile = multer({storage: storage});

router.post('/document_python', uploadFile.single('file'), documentController.uploader);
router.get('/data', documentController.getCalculateData);

module.exports = router;
