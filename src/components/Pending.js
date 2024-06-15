import React, { useState, useEffect } from "react";
import "../styles/qnapage.css";
import bground from "../assets/bgunanswer2.jpg";
import { QuestionModal } from "./Callfunctions/QuestionModal";
import CallAPI from "./Callfunctions/CallAPI";
import { useNavigate } from "react-router-dom";
import { AnswerModal } from "./Callfunctions/AnswerModal";

const Pending = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [quesId, setQuesId] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [pendingQuestions, setPendingQuestions] = useState([]);

  const handleClose = () => {
    setShowModal(false);
    setQuesId("");
  };

  const handleShow = (queId) => {
    setQuesId(queId);
    setShowModal(true);
  };

  const fetchPendingQuestions = async (role, username, token) => {
    try {
      let requrl = '';
      if (role === 'ROLE_MENTOR') {
        requrl = `http://localhost:8080/Auserpendings?username=${username}`;
      } else if (role === 'ROLE_LEARNER') {
        requrl = `http://localhost:8080/Quserpendings?username=${username}`;
      }

      const response = await CallAPI('get', requrl, null, `Bearer ${token}`);
      setPendingQuestions(response.data);
    } catch (error) {
      console.error("Error fetching pending questions:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (!storedToken) {
      alert("Session Expired");
      navigate("/login");
      return;
    }

    setToken(storedToken);
    setRole(storedRole);
    setUsername(storedUsername);

    const currentPath = window.location.pathname;
    if (storedRole === "ROLE_MENTOR" && currentPath.startsWith("/l/")) {
      navigate("/m/pendings");
      return;
    } else if (storedRole === "ROLE_LEARNER" && currentPath.startsWith("/m/")) {
      navigate("/l/pendings");
      return;
    }

    if (pendingQuestions.length === 0) {
      fetchPendingQuestions(storedRole, storedUsername, storedToken);
    }
  }, [navigate, pendingQuestions.length]);

  return (
    <div
      className="p-5 pt-4 pending-container"
      style={{
        backgroundImage: `url(${bground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
        minHeight: "123.71vh",
      }}
    >
      <h1 className="p-3">Pendings</h1>
      <div className="row">
        <div className="col-lg-12">
          <div className="card qna">
            <div className="card-header px-3 py-1 mb-3">
              <h1 className="m-3">
                Here are your {role === "ROLE_LEARNER" ? "Questions pending for Answer." : "Answers pending for Rating."}
              </h1>
            </div>
            <div className="card-body">
              {pendingQuestions.map((qora, index) => (
                <div
                  key={index}
                  className="card mb-4"
                  onClick={() => handleShow(role === "ROLE_LEARNER" ? qora.questionId : qora.answerId)}
                >
                  <div className="row align-items-center text-center">
                    <div className="col-lg-1">
                      <h2>{index + 1}</h2>
                    </div>
                    <div className="col-lg-2">
                      <h4>{qora.status}</h4>
                    </div>
                    <div className="col-lg-7 qna-content">
                      <h2>{role === "ROLE_LEARNER" ? qora.question : qora.answer}</h2>
                    </div>
                    <div className="col-lg-2">
                      {qora.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {quesId && role === "ROLE_LEARNER" && (
        <QuestionModal showModal={showModal} handleClose={handleClose} type="pending" quesId={quesId} token={token} />
      )}
      {quesId && role === "ROLE_MENTOR" && (
        <AnswerModal showModal={showModal} handleClose={handleClose} type="pending" ansId={quesId} token={token} />
      )}
    </div>
  );
};

export default Pending;
