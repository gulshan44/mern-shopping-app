// import React from 'react'
// import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

// const Homepage = () => {
//   return (
//     <div>
//       <MDBCarousel showControls interval={3000}>
//         <MDBCarouselItem itemId={1} interval={1000} className='sliderimg'>
//           <img src='/slider1.jpg' className='d-block w-100' alt='...' />
//         </MDBCarouselItem>
//         <MDBCarouselItem itemId={2} className='sliderimg'>
//           <img src='/slider4.jpg' className='d-block w-100' alt='...' />
//         </MDBCarouselItem>
//         <MDBCarouselItem itemId={3} className='sliderimg'>
//           <img src='slider3.jpg' className='d-block w-100' alt='...' />
//         </MDBCarouselItem>
//       </MDBCarousel>
//     </div>
//   )
// }

// export default Homepage

import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function Homepage() {
  return (
    <MDBCarousel showControls fade>
      <MDBCarouselItem itemId={1} className='slider_img'>
        <img src='/slide1.jpg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={2} className='slider_img'>
        <img src='/slide2.jpg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
      <MDBCarouselItem itemId={3} className='slider_img'>
        <img src='slide3.jpg' className='d-block w-100' alt='...' />
      </MDBCarouselItem>
    </MDBCarousel>
  );
}