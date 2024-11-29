import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const AdminDashboard = () => {

  const navigate = useNavigate()

  const [product, setProduct] = useState([])
  // const [message, setMessage] = useState("")

  useEffect(() => {
      fetch("/backend/adminshowdetails").then((res) => { return res.json() }).then((data) => {
          // console.log(data)
          if (data.status === 200) {
              setProduct(data.apiData)
          } else {
              console.log(data.message)
          }
      })
  }, [])

  function handleRemove(e, id) {
      fetch(`/backend/adminproductremove/${id}`, {
          method: "DELETE"
      }).then((res) => { return res.json() }).then((data) => {
          // console.log(data);
          if (data.status === 200) {
              // setMessage(data.message)
              toast.success(data.message)
              navigate('/admindashboard')
          } else {
              toast.error(data.message)
              // setMessage(data.message)
          }

      })
  }

  return (
    <div className='container-fluid'>
    <div className='row'>

        <div className='col-md-12 py-3 px-0'>

            <div className='py-3' id='sidebar'>
                <Link to="/AdminInsertForm"><h5 className='text-center'>Admin Add Product</h5></Link>
            </div>

            <table className='table table-hover animate__animated animate__fadeIn'>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Product Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((item, key) => (
                            <tr>
                                <td><img src={`upload/${item.PImg}`} alt='img' id='myimg' /></td>
                                <td>{item.PName}</td>
                                <td>{item.PDesc}</td>
                                <td>{item.PQty}</td>
                                <td>{item.PPrice}</td>
                                <td>{item.PStatus}</td>
                                <td><Link to={`/adminproductupdate/${item._id}`} className='btn btn-primary btn-sm fs-6'><i class="bi bi-pencil-square"></i></Link></td>
                                <td><Link to={`/adminproductremove/${item._id}`} onClick={(e) => { handleRemove(e, item._id) }} className='btn btn-danger btn-sm fs-6'><i class="bi bi-x-lg"></i></Link></td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}

export default AdminDashboard