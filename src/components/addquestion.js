import React, { useState } from "react";
import bgdash from "../assets/Dashboardbg.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddQuestion() {
  let navigate = useNavigate();

  const [quest, setQuest] = useState({
    question: "",
    field: "",
    amount: "",
    image: "",
  });

  const { question, field, amount, image } = quest;

  const onInputChange = (e) => {
    setQuest({ ...quest, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/question", quest);
    navigate("/Askme");
  };

  return (
    <div
      className="p-5 pt-4"
      style={{
        backgroundImage: `url(${bgdash})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
        minHeight: "123.71vh",
        textAlign: "center",
      }}
    >
      <div className="row" style={{ backgroundColor: "#343a40" }}>
        <div className="col-lg-12">
          <div className="border rounded p-4 m-2 shadow hover-effect">
            <h1 className="text-center m-4">Add Question</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="Question" className="form-label">
                  Question
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Question"
                  name="question"
                  style={{ width: "100%", backgroundColor: "#dee2e6" }}
                  value={question}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="Field" className="form-label">
                  Field
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Field"
                  name="field"
                  style={{ width: "100%", backgroundColor: "#dee2e6" }}
                  value={field}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Amount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Amount"
                  name="amount"
                  style={{ width: "100%", backgroundColor: "#dee2e6" }}
                  value={amount}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload here"
                  name="image"
                  style={{ width: "100%", backgroundColor: "#dee2e6" }}
                  value={image}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <button type="submit" className="btn btn-outline-danger mx-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
