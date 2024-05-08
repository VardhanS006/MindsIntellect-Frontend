import React, { useState, useEffect } from 'react';
import img1 from "../assets/gold.png";
import img2 from "../assets/silver.png"; 
import img3 from "../assets/bronze.jpg"; 
import hmpg from "../assets/hmpg.jpg"; 
import '../styles/plans.css';

export default function Plans() {
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  return (
    <div
      className="plan p-5 pt-4"
      style={{
        backgroundImage: `url(${hmpg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
        minHeight: "123.71vh",
      }}
    >
      <div className='text-center'>
        <h1 className='p-3' style={{ color: "white", fontSize: "500%" }}>Plans</h1>
        <div className='leaderbody'>
          <div className='topuser row justify-content-center'>
            {/* Basic Card */}
            <div className='col-lg-4'>
              <div className={animateCards ? 'card' : 'opacity-0'} style={{ border: "3px solid blue" }}>
                <div style={{ marginTop: "-30%", alignItems: "center" }}>
                  <img src={img3} alt='photo1' style={{ border: "5px solid blue" }} />
                </div>
                <div className='card-body text-center' style={{ marginTop: "12.5%", marginBottom: "12.5%" }}>
                  <h1>Basic</h1>
                  <div className='card bg-primary mt-3 mb-3' style={{ width: "auto", fontSize: "130%" }}>₹100</div>
                  <h2>Limited Answers</h2>
                  <h2>Customer support available</h2>
                  <h2>fast Resolution</h2>
                  <h2>3 Answers per day</h2>
                </div>
              </div>
            </div>

            {/* Standard Card */}
            <div className='col-lg-4'>
              <div className={animateCards ? 'card' : 'opacity-0'} style={{ border: "3px solid yellow" }}>
                <div style={{ marginTop: "-30%", alignItems: "center" }}>
                  <img src={img2} alt='photo1' style={{ border: "5px solid yellow" }} />
                </div>
                <div className='card-body text-center' style={{ marginTop: "12.5%", marginBottom: "12.5%" }}>
                  <h1>Standard</h1>
                  <div className='card bg-primary mt-3 mb-3' style={{ width: "auto", fontSize: "130%" }}>₹200</div>
                  <h2>Moderaate Question Limit</h2>
                  <h2>Customer support available</h2>
                  <h2>Fast Solution</h2>
                  <h2>10 Answers per day</h2>
                </div>
              </div>
            </div>

            {/* Premium Card */}
            <div className='col-lg-4'>
              <div className={animateCards ? 'card' : 'opacity-0'} style={{ border: "3px solid blue" }}>
                <div style={{ marginTop: "-30%", alignItems: "center" }}>
                  <img src={img1} alt='photo1' style={{ border: "5px solid blue" }} />
                </div>
                <div className='card-body text-center' style={{ marginTop: "12.5%", marginBottom: "12.5%" }}>
                  <h1>Premium</h1>
                  <div className='card bg-primary mt-3 mb-3' style={{ width: "auto", fontSize: "130%" }}>₹300</div>
                  <h2>Maximum Question Limit</h2>
                  <h2>24x7 customer support</h2>
                  <h2>Faster Resolution</h2>
                  <h2>25 Answers per day</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
