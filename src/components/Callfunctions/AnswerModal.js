import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/modalstyle.css';
import CallAPI from './CallAPI';
import { QuestionModal } from './QuestionModal';
import { RateModal } from './RateModal';

export const AnswerModal = ({ showModal, handleClose, type, ansId, token }) => {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState([]);

  const [quesId, setQuesId] = useState('');
  const [showModal2, setShowModal2] = useState(false);

  const [ansrId, setAnsrId] = useState('');
  const [rateModal, setRateModal] = useState(false);

  const handleClose2 = () => {
    setShowModal2(false);
    setQuesId('');
  }
  const handleShow2 = (queId) => {
    setQuesId(queId);
    setShowModal2(true);
  };

  const rateClose = () => {
    setRateModal(false);
    setAnsrId('');
  }
  const rateShow = (answerId) => {
    setAnsrId(answerId);
    setRateModal(true);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const answer = await CallAPI('get', `http://localhost:8080/answer?ansId=${ansId}`, null, `Bearer ${token}`);
        setAnswer(answer.data);
      } catch (error) {
        alert(error);
      }
    };
    if (ansId !== '' || ansId !== null) {
      fetchData();
    }

  }, [navigate, token]);

  return (
    <div>
      {showModal && (
        <div className="modal col-lg-6" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h5 className="modal-title fs-5">Answer #{ansId}</h5>
                <button type="button" className="btn-close" onClick={handleClose}>
                </button>
              </div>
              <div className="modal-body">
                <p>{answer.answer}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
                {type === 'pending' && (
                  <button type="button" className="btn btn-primary" onClick={() => handleShow2(answer.quesId)}>
                    {'<- Question'}
                  </button>
                )}
                {type === 'rate' && (
                  <button type="button" className="btn btn-primary" onClick={() => rateShow(answer.answerId)}>
                    {'Rate Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {quesId !== '' ? <QuestionModal showModal={showModal2} handleClose={handleClose2} type='pending' quesId={quesId} token={token} /> : ''}
      {ansrId !== '' ? <RateModal showModal={rateShow} handleClose={rateClose} ansId={ansrId} token={token} /> : ''}
    </div>
  );
}
