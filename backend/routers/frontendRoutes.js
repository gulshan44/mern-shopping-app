const router = require("express").Router()
const Regc = require("../controller/regController")
const Productc = require("../controller/productController")


const multer = require("multer")
const Product = require("../models/Product")

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./Public/upload");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

let upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    }
})



router.post("/Register", Regc.Registration)
router.post("/Login", Regc.Login)
router.post("/adminproductinsertform", upload.single("pimg"), Productc.productInsertForm)
router.get("/adminshowdetails", Productc.showDetails)
router.delete("/adminproductremove/:id", Productc.deleteItem)
router.get("/singleproductupdate/:id", Productc.singleProductUpdate)
router.put("/adminupdate/:id", Productc.adminfinalupdate)
router.put("/adminupdateImage/:id", upload.single("pimg"), Productc.adminfinalupdateImage)



module.exports = router