import React, { useState } from 'react'

const ProductPage = () => {

  const [message, setMessage] = useState("")
  const [product, setProduct] = useState([])

  return (
    <div className='container'>

      <h1>Products Page</h1>
      <p>Here are our amazing products!</p>

      <div className='row'>
        <div className='col-md-4'>

          <img src='' alt='...' />
          <h4 className='m-0'>product</h4>
          <p className='m-0'>this is product page</p>
          <h6>$0 <span>$10</span></h6>

        </div>
      </div>

    </div>
  )
}

export default ProductPage