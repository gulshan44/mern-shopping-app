import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const AdminInsertForm = () => {

    const navigate = useNavigate()

    const [pname, setPName] = useState("")
    const [pdesc, setPDesc] = useState("")
    const [pquantity, setPQuantity] = useState("")
    const [pprice, setPPrice] = useState("")
    const [pstatus, setPStatus] = useState("")
    const [pimg, setPImg] = useState("")
    // const [message, setMessage] = useState("")

    function handleInsertForm(e) {
        e.preventDefault()
        // console.log(pname, pdesc, pquantity, pprice, pstatus, pimg)

        let Data = new FormData()

        Data.append("pname", pname)
        Data.append("pdesc", pdesc)
        Data.append("pprice", pprice)
        Data.append("pquantity", pquantity)
        Data.append("pstatus", pstatus)
        Data.append("pimg", pimg)

        fetch("/backend/adminproductinsertform", {
            method: "POST",
            body: Data
        })
        .then((res) => { return res.json() }).then((data) => {
            // console.log(data)

            if (data.status === 201) {
                // setMessage(data.message)
                toast.success(data.message)
                navigate("/admindashboard")

            } else {
                // setMessage(data.message)
                toast.error(data.message)
            }
        })

    }

    return (
        <div className='container-fluid'>
            <div className='row bg-secondary bg-gradient'>

                <div className='col-md-6 mx-auto py-3 animate__animated animate__fadeIn'>

                    <div className='py-3 mb-1' id='sidebar'>
                        <Link to='/admindashboard'><h5 className='text-center'>Admin Dashboard</h5></Link>
                    </div>

                    <h3 className='text-center mb-2 text-black'>Admin Add Product Form</h3>

                    <form onSubmit={(e) => { handleInsertForm(e) }}>
                        <MDBInput label="Product Name" id="form1" type="text" className='mb-3' value={pname} onChange={(e) => { setPName(e.target.value) }} />
                        <MDBInput label="Product Description" id="form1" type="text" className='mb-3' value={pdesc} onChange={(e) => { setPDesc(e.target.value) }} />
                        <MDBInput label="Project quantity" id="form1" type="number" className='mb-3' value={pquantity} onChange={(e) => { setPQuantity(e.target.value) }} />
                        <MDBInput label="Product Price" id="form1" type="number" className='mb-3' value={pprice} onChange={(e) => { setPPrice(e.target.value) }} />
                        <MDBInput id="form1" type="file" className='mb-3' onChange={(e) => { setPImg(e.target.files[0]) }} />

                        <select class="form-select mb-2" aria-label="Default select example" value={pstatus} onChange={(e) => { setPStatus(e.target.value) }}>
                            <option selected>Product Status</option>
                            <option value="OUT-STOCK">OUT-STOCK</option>
                            <option value="IN-STOCK">IN-STOCK</option>
                        </select>

                        <MDBBtn className='form-control bg-success bg-gradient text-white' color='secondary'>Add Item</MDBBtn>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminInsertForm