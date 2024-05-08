import React, { useEffect, useState } from 'react';
import bground from '../assets/subs.jpg';
import '../styles/Subscription.css';
import { useNavigate } from 'react-router-dom';
import { Confirmation } from './Callfunctions/Confirmation';
import CallAPI from './Callfunctions/CallAPI';

export default function Subscription() {

  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const [user, setUser] = useState('');

  const [subId, setSubId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [qa, setQa] = useState('');

  const subscribe = (sub_id) => {
    setSubId(sub_id);
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    setSubId('');
  }

  useEffect(() => {

    setToken(localStorage.getItem('token') !== null ? localStorage.getItem('token') : '');
    setRole(localStorage.getItem('role') !== null ? localStorage.getItem('role') : '');
    setUsername(localStorage.getItem('username') !== null ? localStorage.getItem('username') : '');

    if (token === '' && !localStorage.getItem('token')) {
      alert("Session Expired");
      navigate('/login');
    }
    else {
      if (token !== undefined && token !== '') {

        const fetchData = async () => {
          try {
            const apiResponse = await CallAPI('get', `http://localhost:8080/userdata?username=${username}`, null, `Bearer ${token}`);
            console.log(apiResponse.data);
            setUser(apiResponse.data);
          } catch (error) {
            alert(error);
          }
        };
        if (user === '' || user === null) {
          fetchData();
        }
      }
    }
    setQa(role === 'ROLE_MENTOR' ? 'Question' : 'Answer')

  }, [token, role, username, navigate]);

  return (
    <div
      className="subs p-5 pt-4 d-flex justify-content-center align-items-center flex-column"
      style={{
        backgroundImage: `url(${bground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: 'white',
        minHeight: '100vh',
      }}
    >
      <h1 className="text-center mb-4 subscription-title">Subscription Plans</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4 my-auto">
            <div className="card subscription-card">
              <div className="card-header text-center" style={{ backgroundColor: "#575757", border: "5px solid green" }}>Basic Plan</div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title text-center">₹100</h5>
                <p className="card-text text-center">Limited {qa}s</p>
                <p className="card-text text-center">Customer support available</p>
                <p className="card-text text-center">Fast Resolution</p>
                <p className="card-text text-center">3 {qa}s per day</p>
                <button className="btn btn-success">Subscribed</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card subscription-card" style={{ height: "500px" }}>
              {user.sub_id >= 2 ?
                <div className="card-header text-center" style={{ backgroundColor: "#6d281c", border: "5px solid green" }}>Standard Plan</div>
                :
                <div className="card-header text-center" style={{ backgroundColor: "#6d281c" }}>Standard Plan</div>
              }
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title text-center">₹200</h5>
                <p className="card-text text-center">Moderate {qa} limit</p>
                <p className="card-text text-center">Customer support available</p>
                <p className="card-text text-center">Fast Resolution</p>
                <p className="card-text text-center">10 {qa}s per day</p>
                {user.sub_id >= 2 ?
                  <button className="btn btn-success" style={{ fontSize: "larger" }}>Subscribed</button>
                  :
                  <button className="btn btn-primary" onClick={() => subscribe(2)} style={{ fontSize: "larger" }}>Subscribe</button>
                }
              </div>
            </div>
          </div>
          <div className="col-md-4 my-auto">
            <div className="card subscription-card">
              {user.sub_id >= 3 ?
                <div className="card-header text-center" style={{ backgroundColor: "#c99739", border: "5px solid green" }}>Premium Plan</div>
                :
                <div className="card-header text-center" style={{ backgroundColor: "#c99739" }}>Premium Plan</div>
              }
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title text-center">₹300</h5>
                <p className="card-text text-center">Maximum {qa} limit</p>
                <p className="card-text text-center">24/7 customer support</p>
                <p className="card-text text-center">Fast Resolution</p>
                <p className="card-text text-center">25 {qa}s per day</p>
                {user.sub_id >= 3 ?
                  <button className="btn btn-success" >Subscribed</button>
                  :
                  <button className="btn btn-primary" onClick={() => subscribe(3)}>Subscribe</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {subId !== '' ? <Confirmation showModal={showModal} handleClose={handleClose} subId={subId} username={username} token={token} /> : ''}
    </div>
  );
}
