import React, { useEffect, useState } from 'react';
import bganswer from '../assets/bgunanswer.png';
import '../styles/unanspage.css';
import { QuestionModal } from './Callfunctions/QuestionModal';
import { useNavigate } from 'react-router-dom';
import CallAPI from './Callfunctions/CallAPI';

export default function Unanswered() {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    const [unanswered, setUnanswered] = useState([]);

    const [quesId, setQuesId] = useState('');

    useEffect(() => {

        setToken(localStorage.getItem('token') !== null ? localStorage.getItem('token') : '');
        setRole(localStorage.getItem('role') !== null ? localStorage.getItem('role') : '');
        setUsername(localStorage.getItem('username') !== null ? localStorage.getItem('username') : '');

        if (token === '' && !localStorage.getItem('token')) {
            alert("Session Expired");
            navigate('/login');
        }
        if (role === 'ROLE_LEARNER') {
            navigate('/l/dashboard');
        }

        if (token !== undefined && token !== '') {

            loadQuestions();

        }

    }, [token,role,username,navigate]);

    const loadQuestions = async () => {
        try {
            const quesUnans = await CallAPI('get', `http://localhost:8080/unanswered`, null, `Bearer ${token}`);
            setUnanswered(quesUnans.data);
            // alert("sdca");
            console.log(quesUnans.data);
        } catch (error) {

            alert(error);
        }
    }

    const handleClose = () => {
        setShowModal(false);
        setQuesId('');
    }
    const handleShow = (queId) => {
        setQuesId(queId);
        setShowModal(true);
    };

    return (
        <div className='p-5 pt-4' style={{ backgroundImage: `url(${bganswer})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", color: "white", minHeight: "123.71vh" }}>
            <h1 className='p-3'>Questions Unanswered</h1>

            <div className='row'>

                <div className='col-lg-3'>

                    <div className='card qna'>

                        <div className='card-header px-2 py-3' style={{ borderBottom: "1px solid white" }}>
                            <h3 className='mx-3'>Filters</h3>
                        </div>

                        <div className='card-body'>

                        </div>
                    </div>
                </div>

                <div className='col-lg-9'>

                    <div className='card qna'>

                        <div className='card-header pr-5 py-3' style={{ borderBottom: "1px solid white" }}>

                            <div className='sortslct'>
                                <select>
                                    <option value='ltst'>Latest First</option>
                                    <option value='oldt'>Oldest First</option>
                                </select>
                            </div>

                            <h2 className='mx-3'>Sort By:</h2>
                        </div>



                        <div className='card-body'>
                            {
                                unanswered.map((ques, index) => (

                                    <div className='card mb-4' style={{ minHeight: "20vh" }} onClick={() => handleShow(ques.questionId)}>
                                        <div className='row align-items-center text-center' style={{ minHeight: "20vh" }}>

                                            <div className='col-lg-1'>
                                                <h1><b>{index+1}</b></h1>
                                            </div>

                                            <div className='col-lg-9' style={{ borderLeft: "1px solid white", borderRight: "1px solid white" }}>
                                                <h4>{ques.question}</h4>
                                            </div>

                                            <div className='col-lg-2' style={{ fontSize: "3vh" }}>
                                                <h2 style={{ fontSize: "165%" }}>Rs.{ques.amount}</h2>
                                            </div>

                                        </div>
                                    </div>

                                ))
                            }

                        </div>

                    </div>
                </div>

            </div>

            {quesId !== '' ? <QuestionModal showModal={showModal} handleClose={handleClose} type='question' quesId={quesId} token={token} /> : ''}
        </div>
    )
}
