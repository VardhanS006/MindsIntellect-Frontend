import React, { useEffect, useState } from "react";
import bgdash from "../assets/Dashboardbg.jpg";
import "../styles/askndpost.css";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import CallAPI from './Callfunctions/CallAPI';

export default function AddQuestion() {

  const navigate = useNavigate();

  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  const [quest, setQuest] = useState({
    question: "",
    field: "",
    amount: 0,
    file: null,
  });

  const { question, field, amount, file } = quest;

  useEffect(() => {

    setToken(localStorage.getItem('token') !== null ? localStorage.getItem('token') : '');
    setRole(localStorage.getItem('role') !== null ? localStorage.getItem('role') : '');
    setUsername(localStorage.getItem('username') !== null ? localStorage.getItem('username') : '');

    if (token === '' && !localStorage.getItem('token')) {
      alert("Session Expired");
      navigate('/login');
    }

    if (role === 'ROLE_MENTOR') {
      navigate('/m/dashboard');
    }

    const fetchData = async () => {
      try {
        const qacount = await CallAPI('get', `http://localhost:8080/qacount?username=${username}`, null, `Bearer ${token}`);
        if (qacount === 'MAX') {
          alert("You Have Asked Maximum Questions today. Please wait for tomorrow to ask a new Question.");
          navigate("/qnaportal");
        }
      } catch (error) {
        alert(error);
      }
    };
    if(username!=="" && username!==null){
      fetchData();
}
  }, [token, role, username, navigate]);

  const onInputChange = (e) => {
    setQuest({ ...quest, [e.target.name]: e.target.value });
  };
  const fileupload = (file) => {

    setQuest({ ...quest, "file": file })
  };
  const onreset = () => {
    setQuest({
      question: "",
      field: "",
      amount: 0,
      file: null
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("question", quest.question.toString());
    formdata.append("field", quest.field.toString());
    formdata.append("amount", quest.amount.toString());
    if (file !== "" || file !== null) {
      formdata.append("file", quest.file);
    }

    try {
      const apiResponse = await CallAPI('post', `http://localhost:8080/askquestion?username=${username}`, formdata, `Bearer ${token}`);
      console.log(apiResponse.data);
      navigate("/pendings");
    } catch (error) {
      alert(error);
    }

    navigate("/qnaportal");
  };

  return (
    <div className="questionform row p-5 pt-4" style={{ backgroundImage: `url(${bgdash})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", color: "white", minHeight: "123.71vh" }}>

      <div className="row leftform col-lg-6 pt-4 mx-5" style={{ backgroundColor: "#343a40" }}>

        <div className="col-lg-12">

          <div className="border rounded p-4 m-2 shadow hover-effect">

            <h1 className="text-center m-3" style={{ fontSize: "300%" }}>Ask A Question</h1>

            <form onSubmit={(e) => onSubmit(e)}>

              <div className="row mt-5">

                <div className="col-lg-6">
                  <label htmlFor="Field" className="form-label">Field:</label>
                </div>

                <div className="col-lg-6">
                  <input type="text" className="col-lg-6 form-control" placeholder="Enter Field" name="field" style={{ backgroundColor: "#dee2e6" }} value={field} onChange={(e) => onInputChange(e)} required />
                </div>

                <label htmlFor="Question" className="form-label mt-3">Question:</label>
                <textarea className="form-control" placeholder="Ask Your Question" name="question" value={question} onChange={(e) => onInputChange(e)} required />

                <div className="col-lg-6 mt-5">
                  <label htmlFor="Amount" className="col-lg-6 form-label">Amount:</label>
                </div>

                <div className="col-lg-6 mt-5">
                  <input type="number" className="col-lg-6 form-control" placeholder="Enter Amount" name="amount" style={{ backgroundColor: "#dee2e6" }} value={amount} onChange={(e) => onInputChange(e)} required />
                </div>

              </div>

              <button type="submit" className="btn btn-outline-primary mt-5">Submit</button>

              <button onClick={onreset} type="button" className="btn btn-outline-danger mx-2 mt-5">Reset</button>

            </form>
          </div>
        </div>
      </div>

      <div className="col-lg-1"></div>
      <div className="row col-lg-5 pt-4" style={{ backgroundColor: "#343a40", marginLeft: "-8%" }}>
        <div className="col-lg-12">

          <div className="border rounded p-4 m-2 shadow hover-effect">
            <FileUploader fileOrFiles={quest.file} handleChange={fileupload} value={file} name="file" types={["JPG", "JPEG", "PNG", "PDF"]} />
          </div>
        </div>
      </div>
    </div>
  );
}
