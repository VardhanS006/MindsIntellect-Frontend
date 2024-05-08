import React, { useEffect, useState } from "react";
import bgdash from "../assets/Dashboardbg.jpg";
import "../styles/askndpost.css";
import { useNavigate, useParams } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import CallAPI from './Callfunctions/CallAPI';

export default function Postanswer() {

    const navigate = useNavigate();

    const { quesId } = useParams();

    const [role, setRole] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');

    const [question, setQuestion] = useState([]);

    const [ans, setAns] = useState({
        answer: "",
        file: null,
    });

    const { answer, file } = ans

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

        const fetchData = async () => {
            try {
                const qacount = await CallAPI('get', `http://localhost:8080/qacount?username=${username}`, null, `Bearer ${token}`);
                if (qacount === 'MAX') {
                    alert("You Have Answered Maximum Questions today. Please wait for tomorrow to answer a new Question.");
                    navigate("/qnaportal");
                }
            } catch (error) {
                alert(error);
            }
        };

        const fetchData1 = async () => {
            try {
                const question = await CallAPI('get', `http://localhost:8080/question?quesId=${quesId}`, null, `Bearer ${token}`);
                setQuestion(question.data);
            } catch (error) {
                alert(error);
            }
        };

        if (username !== '' && username !== null) {
            fetchData();
            fetchData1();
        }

    }, [token, role, username, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("answer", ans.answer.toString());
        formdata.append("quesId", quesId.toString());
        if (file !== "" || file !== null) {
            formdata.append("file", ans.file);
        }

        try {
            const apiResponse = await CallAPI('post', `http://localhost:8080/postanswer?username=${username}`, formdata, `Bearer ${token}`);
            navigate("/m/pendings");
        } catch (error) {
            console.log("Error posting answer:"+ error);
            alert("Failed to post answer. Please try again later.");
        }

        navigate("/m/pendings");
    };

    const fileupload = (file) => {
        setAns({ ...ans, "file": file })
    };

    const onreset = () => {
        setAns({
            answer: "",
            file: null
        });
    }

    const onInputChange = (e) => {
        setAns({ ...ans, [e.target.name]: e.target.value });
    };

    return (
        <div className="row answerform p-5 pt-4" style={{ backgroundImage: `url(${bgdash})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", color: "white", minHeight: "123.71vh" }}>

            <div className="row leftform col-lg-5 pt-4 mx-5" style={{ backgroundColor: "#343a40" }}>

                <div className="col-lg-12">

                    <div className="border rounded p-4 m-2 shadow hover-effect">

                        <h1 className="text-center m-3" style={{ fontSize: "300%" }}>Question</h1>

                        <div className="row mt-5">

                            <div className="col-lg-3">
                                <label>Field:</label>
                            </div>

                            <div className="col-lg-9">
                                <h4>{question.field}</h4>
                            </div>

                            <div className="col-lg-3 mt-5">
                                <label>Question:</label>
                            </div>

                            <div className="col-lg-9 mt-5">
                                <h4>{question.question}</h4>
                            </div>

                            <div className="col-lg-3 mt-5">
                                <label>Amount:</label>
                            </div>

                            <div className="col-lg-9 mt-5">
                                <h4>Rs.{question.amount}</h4>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div className="col-lg-1"></div>
            <div className="row col-lg-6 pt-4" style={{ backgroundColor: "#343a40", marginLeft: "-8%" }}>
                <div className="col-lg-12">

                    <div className="border rounded p-4 m-2 shadow hover-effect">
                        <h1 className="text-center m-3" style={{ fontSize: "300%" }}>Answer the Question</h1>

                        <form onSubmit={(e) => onSubmit(e)}>

                            <div className="row mt-5">

                                <label htmlFor="Answer" className="form-label mt-1">Anwer:</label>
                                <textarea className="form-control mb-4" placeholder="Post your answer" name="answer" onChange={(e) => onInputChange(e)} required />

                            </div>

                            <FileUploader handleChange={fileupload} name="file" types={["JPG", "JPEG", "PNG", "PDF"]} />

                            <button type="submit" className="btn btn-outline-primary mt-5 mb-3">Submit</button>
                            <button onClick={onreset} type="button" className="btn btn-outline-danger mx-2 mt-5">Reset</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}
