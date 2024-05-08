import React, { useEffect } from 'react'
import { FiArrowRight } from "react-icons/fi";
import BannerImage from "../assets/home-banner-image.jpg";
import home1 from "../assets/Homeback.jpg";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.webp";
import "../styles/home.css"
import { Link } from 'react-router-dom';
import { Carousel } from 'bootstrap';

const Home = () => {

  useEffect(() => {
    const carousel = document.querySelector('.carousel');
    const bsCarousel = new Carousel(carousel, {
      interval: 4000,
    });
    return () => bsCarousel.dispose();
  }, []);

  return (
    <div className="home-container">

      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">

            <img src={home1} className="d-block w-100" style={{ height: "730px" }} />

            <div className="home-banner-container">

              <div className="home-text-section">
                <h1 className="primary-heading">A place to share knowledge and better understand the world</h1>
                <p className="primary-text">Unable to solve a Question. You are at right place <br />Don't wait much. Create profile and continue learning.</p>

              </div>

              <div className="home-image-section">
                <img src={BannerImage} alt="" />
              </div>
            </div>

          </div>

          <div className="carousel-item">
            <img src={home2} className="d-block w-100" alt="..." style={{ height: "730px" }}/>
          </div>

          <div className="carousel-item">
            <img src={home3} className="d-block w-100" alt="..." style={{ height: "730px" }}/>
          </div>
        </div>
      </div>

      <div style={{display:'flex',alignItems:"center",justifyContent:"center",marginTop:"1.5%"}}>
        <Link to={"/register"}>
          <button className="secondary-button">
            Register Now <FiArrowRight />{" "}
          </button>
        </Link>
        <h4 style={{color:"white",marginInline:"50px"}}>Or</h4>
        <Link to={"/Login"}>
          <button className="secondary-button">
            Login <FiArrowRight />{" "}
          </button>
        </Link>
        </div>
    </div>
  );
};

export default Home;
