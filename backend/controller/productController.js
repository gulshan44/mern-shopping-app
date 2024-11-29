const Product = require("../models/Product")

    
exports.productInsertForm = (req, res) => {
    // console.log(req.body)
    // console.log(req.file)

    const { pname, pdesc, pprice, pquantity, pstatus } = req.body
    const filename = req.file.filename

    try {
        const record = new Product({
            PName: pname,
            PPrice: pprice,
            PDesc: pdesc,
            PQty: pquantity,
            PStatus: pstatus,
            PImg: filename
        })
        record.save()
        console.log(record)

        res.json({
            status: 201,
            apiData: record,
            message: "Your product is successfully inserted"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }

}

exports.showDetails = async (req, res) => {
    try {
        const record = await Product.find()
        // console.log(record)
        res.json({
            status: 200,
            apiData: record,
            message: "Data Listed"
        })

    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })

    }
}

exports.deleteItem = async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    try {
        await Product.findByIdAndDelete(id)
        res.json({
            status: 200,
            message: "successfully remove data"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.singleProductUpdate = async (req, res) => {
    //  console.log(req.params.id)
    const id = req.params.id
    try {
        const record = await Product.findById(id)
        res.json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.adminfinalupdate = async (req, res) => {
    // console.log(req.body)
    // console.log(req.params.id)
    const id = req.params.id
    const { pname, pdesc, pquantity, pprice, pstatus } = req.body

    try {
        await Product.findByIdAndUpdate(id, { PName: pname, PDesc: pdesc, PQty: pquantity, PPrice: pprice, PStatus: pstatus })
        res.json({
            status: 200,
            message: "Successfully Product Update"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })

    }

}

exports.adminfinalupdateImage = async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    const { pname, pdesc, pqty, pprice, pstatus } = req.body
    const filename = req.file.filename
    //  console.log(req.file.filename) 

    try {
        if (req.file) {
            await Product.findByIdAndUpdate(id, { PName: pname, PDesc: pdesc, PQty: pqty, PPrice: pprice, PStatus: pstatus, PImg: filename })
        } else {
            await Product.findByIdAndUpdate(id, { PName: pname, PDesc: pdesc, PQty: pqty, PPrice: pprice, PStatus: pstatus })
        }

        res.json({
            status: 200,
            message: "Successfully Product Update"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })

    }

}