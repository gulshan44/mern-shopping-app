const Reg = require("../models/Reg")
const bcrypt = require("bcrypt")


exports.Registration = async (req, res) => {
    // console.log(req.body)
    const { username, password, email } = req.body
    const checkpass = await bcrypt.hash(password, 10)
    const usercheck = await Reg.findOne({ username: username })

    try {
        if (usercheck == null) {
            const record = new Reg({ username: username, password: checkpass, email: email })
            record.save()
            res.json({
                status: 201,
                apiData: record,
                message: "successfully Registered"
            })
        } else {
            res.json({
                status: 401,
                message: "username is already taken"
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.Login = async (req, res) => {
    // console.log(req.body)
    const { username, password } = req.body
    const record = await Reg.findOne({ username: username })
    // console.log(record)

    try {
        if (record !== null) {
            const userpasscheck = await bcrypt.compare(password, record.password)
            // console.log(userpasscheck)

            if (userpasscheck) {
                res.json({
                    status: 200,
                    apiData: record.username,
                    message: `${username} Successfully Login`
                })
            } else {
                res.json({
                    status: 400,
                    message: "oops something went wrong.."
                })
            }
        } else {
            res.json({
                status: 400,
                message: "oops something went wrong.."
            })
        }
    } catch {
        res.json({
            status: 401,
            message: "wrong credientials"
        })
    }
}