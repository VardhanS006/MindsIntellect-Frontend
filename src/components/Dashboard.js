import { useEffect, useState } from 'react';
import bgdash from '../assets/Dashboardbg.jpg';
import '../styles/dash.css';
import { Link, useNavigate } from 'react-router-dom';
import CallAPI from './Callfunctions/CallAPI';
import { QuestionModal } from './Callfunctions/QuestionModal';

const Dashboard = () => {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [quesId, setQuesId] = useState('');

    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    const [user, setUser] = useState('');
    const [userdata, setUserdata] = useState({});

    const [qora, setQora] = useState([]);

    const handleClose = () => {
        setShowModal(false);
        setQuesId('');
    }
    const handleShow = (queId) => {
        setQuesId(queId);
        setShowModal(true);
    };

    let requrl = ``;
    let qoraurl = ``;

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

                const currentPath = window.location.pathname

                if (role === 'ROLE_MENTOR' && currentPath.startsWith('/l/')) {
                    navigate('/m/dashboard');
                }
                if (role === 'ROLE_LEARNER' && currentPath.startsWith('/m/')) {
                    navigate('/l/dashboard');
                }

                if (role === 'ROLE_MENTOR') {
                    requrl = `http://localhost:8080/mentor?user=${user.userId}`;
                    qoraurl = `http://localhost:8080/userquestion?username=${username}`;
                }
                else if (role === 'ROLE_LEARNER') {
                    requrl = `http://localhost:8080/learner?user=${user.userId}`;
                }

                const fetchData1 = async () => {
                    try {
                        const apiResponse = await CallAPI('get', requrl, null, `Bearer ${token}`);
                        setUserdata(apiResponse.data);
                    } catch (error) {
                        alert(error);
                    }
                };

                const fetchQorA = async () => {
                    try {
                        const qora = await CallAPI('get', qoraurl, null, `Bearer ${token}`);
                        setQora(qora.data);
                    } catch (error) {
                        console.error("Error fetching questions:", error);
                    }
                };

                if (user !== '') {
                    fetchData1();
                    fetchQorA();
                }

            }
        }

    }, [token, role, username, user]);

    return (
        <div className='p-5 pt-4' style={{ backgroundImage: `url(${bgdash})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", color: "white", minHeight: "123.71vh" }}>
            <h1 className='p-3'>User Profile</h1>
            <div className='card profile'>
                <div className='row align-items-center'>

                    <div className='col-lg-2 m-4'>
                        <img src={user.image} className='m-3' style={{ maxHeight: "270px", maxWidth: "270px", backgroundColor: "white", borderRadius: "50%" }} alt='Profile' />
                    </div>

                    <div className='col-lg-6' style={{ textAlign: "left", margin: "2.7rem" }}>
                        <h2>Welcome</h2>
                        <h1 style={{ fontSize: "4rem", fontFamily: "Copperplate Gothic Light" }}>{user.fname + ' ' + user.mname + (user.mname !== '' || user.mname !== null ? ' ' : '') + user.lname}</h1>
                        <h4>{role.replace('ROLE_', '')}</h4>
                        <Link to={'/edit-profile'} style={{ fontSize: "5vh" }}>Edit Profile</Link>
                    </div>

                    {role === 'ROLE_MENTOR' && (
                        <div className='col-lg-3 my-auto border-left' style={{ textAlign: "left" }}>
                            <h2>Total Earnings</h2>
                            <h1>Rs. {userdata.amnt_withdrawn + userdata.amnt_pending}</h1>
                            <h2 className='mt-5'>Pending Withdrawals</h2>
                            <h1>Rs. {userdata.amnt_pending}</h1>
                        </div>
                    )}

                </div>
            </div>

            <div className='small-cards row mt-4'>

                <div className='col-lg-3'>
                    <div className='card'>

                        <div className='card-header'>
                            <h2>Subscription</h2>
                        </div>

                        <div className='card-body'>
                            <h4 style={{display:"inline"}}>
                                {
                                    (user.sub_id === 1 ? 'Basic Plan' :
                                        (user.sub_id === 2 ? 'Standard Plan' :
                                            (user.sub_id === 3 ? 'Premium' :
                                                '')))}
                            </h4>
                            {user.sub_id < 3 ? <Link to={'/subscription'} style={{display:"inline",float:"right",fontSize:"larger"}}>UPGRADE</Link> : ''}
                            <progress value={user.sub_id} max={3} style={{ width: "100%" }}></progress>
                        </div>

                    </div>
                </div>

                <div className='col-lg-3'>
                    <div className='card'>

                        <div className='card-header'>
                            <h2>Today's {role === 'ROLE_LEARNER' ? 'Question' : 'Answer'} Count</h2>
                        </div>

                        <div className='card-body'>
                            <h4>{user.qna_count}/
                                {
                                    (user.sub_id === 1 ? '3' :
                                        (user.sub_id === 2 ? '10' :
                                            (user.sub_id === 3 ? '25' :
                                                '')))}
                            </h4>
                            <progress value={user.qna_count} max={
                                (user.sub_id === 1 ? '3' :
                                    (user.sub_id === 2 ? '10' :
                                        (user.sub_id === 3 ? '25' :
                                            '')))}
                                style={{ width: "100%" }}></progress>
                        </div>

                    </div>
                </div>

                <div className='col-lg-3'>
                    <div className='card'>

                        <div className='card-header'>
                            <h2>Amount {role === 'ROLE_MENTOR' ? 'Withdrawn' : 'Paid'}</h2>
                        </div>

                        <div className='card-body'>
                            {role === 'ROLE_MENTOR' && (
                                <div>
                                    <h4>Rs.{userdata.amnt_withdrawn}/Rs.{userdata.amnt_withdrawn + userdata.amnt_pending}</h4>
                                    <progress value={userdata.amnt_withdrawn} max={userdata.amnt_withdrawn + userdata.amnt_pending} style={{ width: "100%" }}></progress>
                                </div>
                            )}
                            {role === 'ROLE_LEARNER' && (
                                <div>
                                    <h4>Rs.{userdata.amnt_paid}/Rs.{userdata.amnt_paid + userdata.amnt_pending}</h4>
                                    <progress value={userdata.amnt_paid} max={userdata.amnt_paid + userdata.amnt_pending} style={{ width: "100%" }}></progress>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className='col-lg-3'>
                    <div className='card'>

                        <div className='card-header'>
                            <h2>Average Rating</h2>
                        </div>

                        <div className='card-body'>
                            <h4>3.7/5</h4>
                            <progress value={3.7} max={5} style={{ width: "100%" }}></progress>
                        </div>

                    </div>
                </div>

            </div>

            <div className='row mt-4'>

                <div className='col-lg-8 qora'>
                    <div className='card'>

                        <div className='card-header px-3 py-1' style={{ borderBottom: "1px solid white" }}>
                            <h1>{role === 'ROLE_MENTOR' ? 'Your Questions' : 'Your Answers'}</h1>
                        </div>

                        <div className='card-body'>
                            {qora.map((quesans, index) => (
                                <div className='card mb-4' style={{ minHeight: "20vh" }}>
                                    <div className='row align-items-center text-center' style={{ minHeight: "20vh" }}>

                                        <div className='col-lg-1'>
                                            <h1><b>{index + 1}</b></h1>
                                        </div>

                                        <div className='col-lg-9' style={{ borderLeft: "1px solid white", borderRight: "1px solid white" }}>
                                            <h4>{quesans.question || quesans.answer}</h4>
                                        </div>

                                        <div className='col-lg-2' style={{ fontSize: "3vh" }}>
                                            <Link style={{ color: "rgb(188, 19, 254)" }} onClick={() => handleShow(quesans.questionId)}>View Details</Link>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div className='col-lg-4 acdata'>
                    {role === 'ROLE_MENTOR' ?

                        <div className='card'>

                            <div className='card-header px-3 py-2' style={{ borderBottom: "1px solid white" }}>
                                <h1 style={{ display: "inline" }}>Account Details</h1>
                                {userdata.ac_number !== 0 ? <h5 className='my-2' style={{ display: "inline", float: "right" }}><Link>Update Details</Link></h5> : ''}
                            </div>

                            {userdata.ac_number !== 0 ?
                                <div className='card-body'>

                                    <div className='mb-3'>
                                        <h3 style={{ display: "inline" }}><b>A/c Name: </b></h3>
                                        <h4 style={{ display: "inline" }}>Hamood Arif</h4>
                                    </div>
                                    <div className='mb-3'>
                                        <h3 style={{ display: "inline" }}><b>A/c No: </b></h3>
                                        <h4 style={{ display: "inline" }}>53698********</h4>
                                    </div>
                                    <div className='mb-3'>
                                        <h3 style={{ display: "inline" }}><b>Bank: </b></h3>
                                        <h4 style={{ display: "inline" }}>HDFC Bank</h4>
                                    </div>
                                    <div className='mb-3'>
                                        <h3 style={{ display: "inline" }}><b>Bank IFSC: </b></h3>
                                        <h4 style={{ display: "inline" }}>HDFC00022</h4>
                                    </div>

                                </div>
                                :
                                ''}

                        </div>

                        :

                        <div></div>

                    }

                </div>

            </div>
            {quesId !== '' ? <QuestionModal showModal={showModal} handleClose={handleClose} type='answer' quesId={quesId} token={token} /> : ''}
        </div>
    );
};

export default Dashboard;
