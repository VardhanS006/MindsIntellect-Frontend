import React, { useState } from 'react';
import axios from 'axios';
import Regimg from '../../assets/Reg-bg.jpg';
import Logoimg from '../../assets/logo512.png';
import '../../styles/form.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Reg() {

    let navigate = useNavigate();

    const [user,setUser]=useState({
        fname:'',
        mname:'',
        lname:'',
        dob:'',
        email:'',
        mobile:'',
        username:'',
        image:'',
        pass:'',
        cpass:'',
        roles:'',
        disabled:false
    });

    const{fname,mname,lname,dob,email,mobile,username,image,pass,roles}=user;
      
    let imgExt="";
    const onInputChange=async (e)=>{
      if (e.target.name === 'image') {
        imgExt = e.target.value.split('.').pop().toLowerCase();
        setUser((prevUser) => ({ ...prevUser, image: ['jpg', 'jpeg', 'png', 'gif'].includes(imgExt)?e.target.files[0]:'false'}));
      }
      
      else {
        setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
      }

      const hasFalseValue = Object.values(user).includes(null);
      setUser((prevUser) => ({ ...prevUser,disabled: hasFalseValue}));
    }

    

    const chckexist= async (attrib,vlu)=>{
      console.log(`http://localhost:8080/users/`+attrib+'='+vlu);
      const result=await axios.get(`http://localhost:8080/users/`+attrib+'='+vlu);
      return result.data;
    }

    const onSubmit=async (e)=>{
      e.preventDefault();
      
      const isUsernameExists = await chckexist('username', user.username);
      const isEmailExists = await chckexist('email', user.email);
      const isMobileExists = await chckexist('mobile', user.mobile);
      let exst = false;

      
      if (isUsernameExists > 0) {
        setUser((prevUser) => ({ ...prevUser,username:null}));
        exst=true;
      }
    
      if (isEmailExists > 0) {
        setUser((prevUser) => ({ ...prevUser,email:null}));
        exst=true;
      }
    
      if (isMobileExists > 0) {
        setUser((prevUser) => ({ ...prevUser,mobile:null}));
        exst=true;
      }
      
      if (exst===true) {
        alert(exst);
        return;
      }

      const [day, month, year] = user.dob.split("-");
      setUser({ ...user, dob:  `${year}-${month}-${day}`});

      const formdata = new FormData();
      formdata.append("fname",user.fname);
      formdata.append("mname",user.mname);
      formdata.append("lname",user.lname);
      formdata.append("dob",user.dob);
      formdata.append("email",user.email);
      formdata.append("mobile",user.mobile);
      formdata.append("username",user.username);
      formdata.append("images",user.image);
      formdata.append("password",user.pass);
      formdata.append("roles",user.roles);

      try {
        await axios.post("http://localhost:8080/user", formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        navigate("/login");
      } catch (error) {
          alert("Some Error Occurred! Please Try Again.", error);
      }
    }

  return (
    <div className='p-5 pt-4' style={{ backgroundImage:`url(${Regimg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat",backgroundAttachment: "fixed", color:"white"}}>
      <div className='row' style={{alignItems: 'center', minHeight: '83.28vh'}}>

          <div className='col-lg-6 text-center my-auto'>
            <img src={Logoimg} alt='Logo' style={{height:"500px",width:"500px"}}/>
          </div>

          <div className='box col-lg-6 border rounded p-4 my-auto shadow'>
              <h2 className='text-center m-4 mt-0'>Register User</h2>
              <form onSubmit={(e)=>onSubmit(e)}>

                <div className='row'>
                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="FirstName" className='form-label'>First Name<i>*</i></label>
                      <input autoComplete='false' type='text' className='form-control' placeholder='First Name' name='fname' value={fname} onChange={(e)=>onInputChange(e)} required></input>
                  </div>

                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="MidName" className='form-label'>Middle Name</label>
                      <input type='text' className='form-control' placeholder='Middle Name' name='mname' value={mname} onChange={(e)=>onInputChange(e)}></input>
                  </div>
                </div>

                <div className='row'>
                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="LastName" className='form-label'>Last Name<i>*</i></label>
                      <input type='text' className='form-control' placeholder='Last Name' name='lname' value={lname} onChange={(e)=>onInputChange(e)} required></input>
                  </div>

                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="DOB" className='form-label'>Date Of Birth<i>*</i></label>
                      <input type='date' className='form-control' placeholder='DD/MM/YYYY' name='dob' value={dob} onChange={(e)=>onInputChange(e)} required></input>
                  </div>
                </div>

                <div className='row'>
                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="Email" className='form-label'>E-mail<i>*</i></label>{user.email===null?<span style={{fontSize:"20px",color:"red",marginLeft:"10px"}}>Exists!</span>:''}
                      <input type='email' className='form-control' placeholder='mailid@example.com' name='email' value={email} onChange={(e)=>onInputChange(e)} required></input>
                  </div>
                
                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="Mobile" className='form-label'>Mobile<i>*</i></label>{user.mobile===null?<span style={{fontSize:"20px",color:"red",marginLeft:"10px"}}>Exists!</span>:''}
                      <input type='number' className='form-control' placeholder='' name='mobile' value={mobile} onChange={(e)=>onInputChange(e)} required></input>
                  </div>
                </div>

                <div className='row'>
                  <div className='mb-3 mt-3 col-lg-2' style={{fontSize:"27px"}}>
                      <label htmlFor="Role" className='form-label'>Role:<i>*</i></label>
                  </div>
                  <div className='mb-3 mt-3 col-lg-2' style={{fontSize:"27px"}}>
                      <label>
                        <input type='radio' name='roles' value='ROLE_LEARNER' onChange={(e)=>onInputChange(e)}></input>
                        Learner
                      </label>
                  </div>
                  <div className='mb-3 mt-3 col-lg-2' style={{fontSize:"27px"}}>
                      <label>
                        <input type='radio' name='roles' value='ROLE_MENTOR' onChange={(e)=>onInputChange(e)}></input>
                        Mentor
                      </label>
                  </div>

                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="Username" className='form-label'>Username<i>*</i></label>{user.username===null?<span style={{fontSize:"20px",color:"red",marginLeft:"10px"}}>Exists!</span>:''}
                      <input type='text' className='form-control' placeholder='Enter Your Username' name='username' value={username} autoComplete='off' onChange={(e)=>onInputChange(e)} required></input>
                  </div>
                </div>

                <div className='row'>
                  <div className='mb-3 col-lg-12'>
                      <label htmlFor="Photo" className='form-label'>Upload Your Formal Photo<i>*</i></label>{user.image==='false'?<span style={{fontSize:"20px",color:"red",marginLeft:"10px"}}>Image Format: jpg, jpeg, png, gif</span>:''}
                      <input type='file' className='form-control' name='image' accept='image/*' required onChange={(e)=>onInputChange(e)}></input>
                  </div>
                </div>

                <div className='row'>
                  <div className='mb-3 col-lg-6'>
                      <label htmlFor="pass" className='form-label'>Password<i>*</i></label>
                      <input type='password' className='form-control' placeholder='Enter Your Password' name='pass' autoComplete='new-password' required onChange={(e)=>onInputChange(e)}></input>
                  </div>
                
                  <div className='mb-2 col-lg-6'>
                      <label htmlFor="cpass" className='form-label'>Confirm Password<i>*</i></label>
                      <input type='password' className='form-control' placeholder='Enter Your Password Again' name='cpass' required onChange={(e)=>onInputChange(e)}></input>
                      {user.pass!==''&&user.cpass!==''?<span style={(user.pass===user.cpass)?{fontSize:"20px",color:"green",fontWeight:"bold"}:{fontSize:"20px",color:"red",fontWeight:"bold"}}>{(user.pass===user.cpass)?"Passwords Match!":"Passowrds Mismatch!"}</span>:''}
                  </div>
                </div>

                <button type='submit' className='form-control btn btn-primary ' disabled={(user.pass !== user.cpass) || user.roles === '' || user.disabled} style={{fontSize:"20px"}}>Submit</button>

                <span>Already Registered? <Link to={'/login'}>Login Here</Link></span>

              </form>
          </div>
      </div>
    </div>
  );
}
