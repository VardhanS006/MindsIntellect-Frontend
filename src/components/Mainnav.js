import React, { useEffect, useState } from 'react';
import '../styles/navbotm.css';
import dashboard from '../assets/dashboard.png';
import leaderboard from '../assets/leaderboard4.png';
import askques from '../assets/AskQuestion.png';
import postansr from '../assets/PostAnswer.png';
import QnaPortl from '../assets/QnaPortal.png';
import Pndng from '../assets/Pendings.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Mainnav() {

  const navigate = useNavigate();
  let currentPath = window.location.pathname;

  const [token, setToken] = useState('');
  const [role, setRole] = useState('');
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    // currentPath = window.location.pathname;

    setToken(localStorage.getItem('token') !== null ? localStorage.getItem('token') : '');
    setRole(localStorage.getItem('role') !== null ? localStorage.getItem('role') : '');

    if (token === '' && !localStorage.getItem('token')) {
      setLoggedin(false);
      // navigate('/login');
    }
    else {
      if (token !== undefined && token !== '') {
        setLoggedin(true);
      }
      else {
        setLoggedin(false);
      }
    }
  }, [token,loggedin,navigate]);

  return (
    <div>

      {/* {currentPath.startsWith('/l/') || currentPath.startsWith('/m/') || currentPath.startsWith('/qnaportal') ? */}
      {loggedin &&

        <div className='nav-container'>

          <div className='navobj'>
            <Link to={role === 'ROLE_MENTOR' ? "/m/unanswered" : role === 'ROLE_LEARNER' ? "/l/askquestion" : "/login"}>
              <img src={role === 'ROLE_MENTOR' ? postansr : askques} alt='Dash' style={{ maxHeight: "150%", translate: "-10% -20%" }} />
              <div className="overlay" style={{ marginLeft: "-20%" }}>{role === 'ROLE_MENTOR' ? "Post an Answer" : role === 'ROLE_LEARNER' ? "Ask a Question" : ""}</div>
            </Link>
          </div>

          <div className='navobj'>
            <Link to={'/qnaportal'}>
              <img src={QnaPortl} alt='Dash' style={{ maxHeight: "150%", translate: "-10% -20%" }} />
              <div className="overlay">QnAPortal</div>
            </Link>
          </div>


          <div className='navobj'>
            <Link to={role === 'ROLE_MENTOR' ? "/m/dashboard" : role === 'ROLE_LEARNER' ? "/l/dashboard" : "/login"}>
              <img src={dashboard} alt='Dash' style={{ maxHeight: "150%", translate: "-10% -20%" }} />
              <div className="overlay">Dashboard</div>
            </Link>
          </div>


          <div className='navobj'>
            <Link to={role === 'ROLE_MENTOR' ? "/m/pendings" : role === 'ROLE_LEARNER' ? "/l/pendings" : "/login"}>
              <img src={Pndng} alt='Dash' style={{ maxHeight: "150%", translate: "-10% -20%" }} />
              <div className="overlay">Pendings</div>
            </Link>
          </div>

          <div className='navobj'>
            <Link to={role === 'ROLE_MENTOR' ? "/m/leaderboard" : role === 'ROLE_LEARNER' ? "/l/leaderboard" : "/login"}>
              <img src={leaderboard} alt='Dash' style={{ maxHeight: "150%", translate: "-10% -20%" }} />
              <div className="overlay" style={{ marginLeft: "-10%" }}>LeaderBoards</div>
            </Link>
          </div>

        </div>
        }
    </div>
  );
}
