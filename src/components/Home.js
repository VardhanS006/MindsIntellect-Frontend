import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import BannerImage from '../assets/home-banner-image.jpg';
import bground from '../assets/Homeback.jpg';
import '../styles/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${bground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: 'white',
        minHeight: '123.9vh',
      }}
    >
      <div className="home-content">
        <div className="home-banner-container">
          <div className="home-text-section">
            <h1 className="primary-heading">
              A place to share knowledge and better understand the world
            </h1>
            <p className="primary-text">
              Unable to solve a Question. You are at right place <br />
              Don't wait much. Create profile and continue learning.
            </p>
            <Link to={'/register'}>
              <button className="secondary-button">
                Register <FiArrowRight />{' '}
              </button>
            </Link>
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
      <div className="home-footer">
        <p>Designed by <h5 style={{ color: 'yellow' }}>Hamood Arif Siddiqui and Utkarsh Vardhan Singh</h5>
        </p>
      </div>
    </div>
  );
};

export default Home;
