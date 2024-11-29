import { MDBBtn, MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const AdminEditForm = () => {

    const [pname, setPName] = useState("")
    const [pdesc, setPDesc] = useState("")
    const [pquantity, setPQuantity] = useState("")
    const [pprice, setPPrice] = useState("")
    const [pstatus, setPStatus] = useState("")
    const [pimg, setPImg] = useState("")
    const [message, setMessage] = useState("")
    const [editImage, setEditImage] = useState(false)

    const navigate = useNavigate()

    const {id} = useParams()

    useEffect(()=>{
        fetch(`/backend/singleproductupdate/${id}`).then((res)=>{return res.json()}).then((data)=>{
            console.log(data)
            if(data.status === 200){
                setPName(data.apiData.PName)
                setPDesc(data.apiData.PDesc)
                setPQuantity(data.apiData.PQty)
                setPPrice(data.apiData.PPrice)
                setPImg(data.apiData.PImg)
                setPStatus(data.apiData.PStatus)
            }else{
                setMessage(data.message)
            }
        })
        
    },[id])

    // --------------------------------------

    function handleUpdateForm(e){
        e.preventDefault()
        // console.log(pname, pdesc, pquantity, pprice, pstatus);

        let Data1 = new FormData()

        if(editImage){
            Data1.append("pname", pname)
            Data1.append("pdesc", pdesc)
            Data1.append("pquantity", pquantity)
            Data1.append("pprice", pprice)
            Data1.append("pstatus", pstatus)
            Data1.append("pimg", pimg);
            fetch(`/backend/adminupdateImage/${id}`,{
                method: "PUT",
                body: Data1
            })
            .then((res)=>{return res.json()}).then((data)=>{
                console.log(data);
                if(data.status === 200){
                    setMessage(data.message)
                    navigate("/admindashboard")
                }else{
                    setMessage(data.message)
                }

            })

        }else{
            const data = {
                pname: pname,
                pdesc: pdesc,
                pquantity: pquantity,
                pprice: pprice,
                pstatus: pstatus
            }

            fetch(`/backend/adminupdate/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((res)=>{return res.json()}).then((data)=>{
                console.log(data);

                if(data.status === 200){
                     setMessage(data.message)
                     navigate("/admindashboard")
                }else{
                    setMessage(data.message)
                }
            })

        }

    }

    return (
        <div className='container-fluid'>
            <div className='row bg-secondary bg-gradient'>
                <div className='col-md-2 py-3' id='sidebar'>
                    <Link to='/admindashboard'><h5 className='text-center'>Dashboard</h5></Link>
                </div>
                <div className='col-md-6 mx-auto py-3  animate__animated animate__zoomIn'>
                    <h3 className='text-center mb-2 text-black'>Admin Update Form</h3>

                    <form onSubmit={(e) => { handleUpdateForm(e) }}>
                        <MDBInput label="Product Name" id="form1" type="text" className='mb-3' value={pname} onChange={(e) => { setPName(e.target.value) }} />
                        <MDBInput label="Product Description" id="form1" type="text" className='mb-3' value={pdesc} onChange={(e) => { setPDesc(e.target.value) }} />
                        <MDBInput label="Project quantity" id="form1" type="number" className='mb-3' value={pquantity} onChange={(e) => { setPQuantity(e.target.value) }} />
                        <MDBInput label="Product Price" id="form1" type="number" className='mb-3' value={pprice} onChange={(e) => { setPPrice(e.target.value) }} />
                        {/* <MDBInput id="form1" type="file" className='mb-3' onChange={(e) => { setPImg(e.target.files[0]) }} /> */}

                        <select class="form-select mb-2" aria-label="Default select example" value={pstatus} onChange={(e) => { setPStatus(e.target.value) }}>
                            <option selected>Product Status</option>
                            <option value="OUT-STOCK">OUT-STOCK</option>
                            <option value="IN-STOCK">IN-STOCK</option>
                        </select>

                        {editImage ? <div>
                            <MDBInput id="form1" type="file" className='mb-3' onChange={(e) => { setPImg(e.target.files[0]) }} />
                        </div>: (
                            <div id="editimage">
                                <img src={`http://localhost:5000/upload/${pimg}`} alt='product'/>
                                <i onClick={()=>{setEditImage(true)}}>Edit Image</i>
                            </div>
                        )}

                        <MDBBtn className='form-control bg-success bg-gradient text-white mt-2' color='secondary'>Update Item</MDBBtn>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminEditForm