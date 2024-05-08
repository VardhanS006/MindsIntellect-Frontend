import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/modalstyle.css';
import CallAPI from './CallAPI';
import { AnswerModal } from './AnswerModal';

export const QuestionModal = ({ showModal, handleClose, type, quesId, token }) => {

  const navigate = useNavigate();
  const [showModal2, setShowModal2] = useState(false);

  const [ansId,setAnsId] = useState('');
  const [anstype,setAnstype] = useState('answer');

  const [question, setQuestion] = useState([]);

  const handleClose2 = () => {
    setShowModal2(false);
    setAnsId('');
  }
  const handleShow2 = (ansrId) => {
    if(question.status==='RATE_PENDING'){
      setAnstype('rate');
    }
    else{
      setAnstype('rate');
    }
    alert(ansrId);
    setAnsId(ansrId);
    setShowModal2(true);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const question = await CallAPI('get', `http://localhost:8080/question?quesId=${quesId}`, null, `Bearer ${token}`);
        setQuestion(question.data);
      } catch (error) {
        alert(error);
      }
    };
    if (quesId !== '' || quesId !== null) {
      fetchData();
    }

  }, [navigate, quesId, token]);

  return (
    <div>
      {showModal && (
        <div className="modal col-lg-6" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h5 className="modal-title fs-5">Question #{quesId}</h5>
                <button type="button" className="btn-close" onClick={handleClose}>
                </button>
              </div>
              <div className="modal-body">
                <p>{question.question}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                {type === 'question' && (
                  <Link to={`/m/postanswer/${quesId}`}>
                    <button type="button" className="btn btn-primary">
                      Answer this Question
                    </button>
                  </Link>
                )}
                {type !== 'question' && question.status !== 'ANSWER_PENDING' && question.status !== 'PAYMENT_PENDING' && (
                  <button type="button" className="btn btn-primary" onClick={() => handleShow2(question.answerId)}>
                    {'Answer ->'}
                  </button>
                )}
                {type === 'pending' && question.status === 'ANSWER_PENDING' && (
                  <button type="button" className="btn btn-primary">
                    {'Edit'}
                  </button>
                )}
                {type === 'pending' && question.status === 'PAYMENT_PENDING' && localStorage.getItem("role")==='ROLE_LEARNER' && (
                  <button type="button" className="btn btn-primary" onClick={() => handleShow2(question.answerId)}>
                    {'Pay & View Answer'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {ansId !== '' ? <AnswerModal showModal={showModal2} handleClose={handleClose2} type={anstype} ansId={ansId} token={token} />: ''}
    </div>
  );
}