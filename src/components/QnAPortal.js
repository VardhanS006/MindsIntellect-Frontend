import React, { useState, useEffect } from "react";
import "../styles/qnapage.css";
import bground from "../assets/bgask.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import CallAPI from "./Callfunctions/CallAPI";
import { useNavigate } from "react-router-dom";
import { QuestionModal } from "./Callfunctions/QuestionModal";

const Askme = () => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [quesId, setQuesId] = useState('');

  const [questions, setQuestions] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState("");

  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {

    setToken(localStorage.getItem('token') !== null ? localStorage.getItem('token') : '');
    setRole(localStorage.getItem('role') !== null ? localStorage.getItem('role') : '');
    setUsername(localStorage.getItem('username') !== null ? localStorage.getItem('username') : '');

    if (token === '' && !localStorage.getItem('token')) {
      alert("Session Expired");
      navigate('/login');
    }

    if (token !== undefined && token !== '') {
      fetchQuestions();
    }
  }, [token, role, username, navigate]);

  const handleClose = () => {
    setShowModal(false);
    setQuesId('');
  }
  const handleShow = (queId) => {
    setQuesId(queId);
    setShowModal(true);
  };

  const fetchQuestions = async () => {
    try {
      const questions = await CallAPI('get', `http://localhost:8080/finalquestions`, null, `Bearer ${token}`);
      setQuestions(questions.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
    applyFilter(event.target.value);
  };

  const applyFilter = (criteria) => {
    let sortedQuestions = [...questions];
    switch (criteria) {
      case "highest_amount":
        sortedQuestions.sort((a, b) => b.amount - a.amount);
        break;
      case "lowest_amount":
        sortedQuestions.sort((a, b) => a.amount - b.amount);
        break;
      case "latest_first":
        sortedQuestions.reverse();
        break;
      case "oldest_first":
        break;
      default:
        break;
    }
    setQuestions(sortedQuestions);
  };

  return (
    <div
      className="qnaportal p-5 pt-4"
      style={{
        backgroundImage: `url(${bground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
        minHeight: "123.71vh",
      }}
    >
      <h1 className="p-3">Questions</h1>
      <div className="row">
        <div className="col-lg-12">
          <div className="card qna">
            <div
              className="card-header px-3 py-1"
              style={{ borderBottom: "1px solid white" }}
            >
              {/* <h1 className="mb-0">Questions Listed Below</h1> */}
              <div className="d-flex justify-content-end">
                <div className="card fltr" style={{ width: "auto" }}>
                  <div className="card-body">
                    <select
                      className="form-select mb-2"
                      onChange={handleFilterChange}
                      value={filterCriteria}
                    >
                      <option value="">-- Select Filter & Sort --</option>
                      <option value="highest_amount">Highest Amount</option>
                      <option value="lowest_amount">Lowest Amount</option>
                      <option value="latest_first">Latest First</option>
                      <option value="oldest_first">Oldest First</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="card mb-4"
                  style={{ minHeight: "20vh" }}
                  onClick={() => handleShow(question.questionId)}
                >
                  <div
                    className="row align-items-center text-center"
                    style={{ minHeight: "20vh" }}
                  >
                    <div className="col-lg-1">
                      <h2>{index + 1}</h2>
                    </div>
                    <div className="col-lg-2">
                      <h4>
                        <FontAwesomeIcon icon={faRupeeSign} />
                        {' ' + question.amount}
                      </h4>
                    </div>
                    <div
                      className="col-lg-7"
                      style={{
                        borderLeft: "1px solid white",
                        borderRight: "1px solid white",
                      }}
                    >
                      <h2>
                        {question.question} <br />
                      </h2>
                    </div>
                    <div className="col-lg-2" style={{ fontSize: "4vh" }}>
                    <FontAwesomeIcon icon={faStarHalfAlt} />{' '+question.rating+'/5'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {quesId !== '' ? <QuestionModal showModal={showModal} handleClose={handleClose} type='answer' quesId={quesId} token={token} /> : ''}
    </div>
  );
};

export default Askme;
