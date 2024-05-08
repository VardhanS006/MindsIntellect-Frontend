import React, { useEffect, useState } from 'react';
import Regimg from '../../assets/Reg-bg.jpg';
import Logoimg from '../../assets/logo512.png';
import '../../styles/form.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {

  const navigate = useNavigate();

  const [user,setUser]=useState({
    email:'',
    password:''
  });
  const [error,setError]=useState('');

  const{email,password}=user;

  const onInputChange=async (e)=>{
    setUser({...user,[e.target.name]: e.target.value});

    setError('');
  }


  const chckexist= async (attrib,vlu)=>{
    const result=await axios.get(`http://localhost:8080/users/`+attrib+'='+vlu);
    return result.data;
  }

  useEffect(()=>{
    localStorage.clear();
  });


  const loginchck=async (e)=>{
    e.preventDefault();

    const isEmailExists = await chckexist('email', user.email);
  
    if (isEmailExists <= 0) {
      setUser({...user,email: null});
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/login", user);
      
      if (response.status === 200) {
        const role = response.data.role;
        localStorage.setItem('token', response.data.jwtToken);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', role);

        if (role==="ROLE_LEARNER"){
          navigate("/l/dashboard");
        }
        else if (role==="ROLE_MENTOR"){
          navigate("/m/dashboard");
        }
      }
      else{
        setError('Invalid Password');
      }
      
    } catch (error) {
        console.error("Some Error Occurred! Please Try Again.", error);
    }
  }

  return (
    // <div className='p-5' style={{ backgroundImage:`url(${Regimg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat",backgroundAttachment: "fixed", color:"white"}}>
    <div className='p-5 pt-4' style={{ backgroundImage:`url(${Regimg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat",backgroundAttachment: "fixed", color:"white"}}>
      <div className='row' style={{alignItems: 'center', minHeight: '113vh'}}>

          <div className='col-lg-6 text-center my-auto'>
            <img src={Logoimg} alt='Logo' style={{height:"500px",width:"500px"}}/>
          </div>

          <div className='box col-lg-6 border rounded p-4 mt-2 shadow'>
              <h2 className='text-center m-4 mt-0'>Login</h2>
              {/* <form onSubmit={(e)=>loginchck(e)}> */}
              {error!==''?<span style={{fontSize:"20px",color:"red",marginLeft:"10px"}}>{error}</span>:''}
              <form onSubmit={loginchck}>

                <div className='row'>
                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="Email" className='form-label'>Email</label>{user.email===null?<span style={{fontSize:"20px",color:"red",marginLeft:"10px"}}>Email Doesn't exist</span>:''}
                      <input type='text' className='form-control' placeholder='Enter your Email' name='email' value={email} onChange={(e)=>onInputChange(e)} required></input>
                  </div>

                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="pass" className='form-label'>Password</label>
                      <input type='password' className='form-control' placeholder='Enter Your Password' name='password' value={password} onChange={(e)=>onInputChange(e)} required></input>
                  </div>
                </div>

                <button type='submit' className='form-control btn btn-primary mt-3' style={{fontSize:"20px"}}>Login</button>

                <span>Haven't Registered Yet? <Link to={'/register'}>Register Here</Link></span>

              </form>
          </div>
      </div>
    </div>
  );
}
