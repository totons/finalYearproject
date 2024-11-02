
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img1 from '../../../assets/cricket.jpeg';
import img2 from '../../../assets/football.jpg';
import img3 from '../../../assets/badminton.jpg';
import img4 from '../../../assets/chess.jpg';
import img5 from '../../../assets/volleyball.jpg';
import img6 from '../../../assets/handball.jpg';

const HomeSlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: false, // Prevents autoplay from stopping on hover
      };

     return (
        <div className="mt-20 max-w-7xl mx-auto px-4">
  <h2 className="text-5xl font-bold text-center mb-12 text-gray-800 ">Facilities</h2>
  <div className="slider-container">
    <Slider {...settings}>
      <div className="p-4">
        <div className="flex flex-col items-center bg-white cursor-pointer dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <img className="h-60 w-full object-cover rounded-md mb-4" src={img1} alt="Facility 1" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Facility 1</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <img className="h-60 w-full object-cover rounded-md mb-4" src={img2} alt="Facility 2" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Facility 2</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <img className="h-60 w-full object-cover rounded-md mb-4" src={img3} alt="Facility 3" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Facility 3</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <img className="h-60 w-full object-cover rounded-md mb-4" src={img4} alt="Facility 4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Facility 4</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <img className="h-60 w-full object-cover rounded-md mb-4" src={img5} alt="Facility 5" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Facility 5</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <img className="h-60 w-full object-cover rounded-md mb-4" src={img6} alt="Facility 6" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Facility 6</h3>
        </div>
      </div>
    </Slider>
  </div>
</div>

     );
};

export default HomeSlider;
