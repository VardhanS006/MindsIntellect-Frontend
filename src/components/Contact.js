import React from "react";
import contact from "../assets/wpthree.jpg";
import "../styles/contact.css"; 

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
    alert("Your message has been sent!"); 
    window.location.reload();
  };

  return (
    <div
      className="contact-container"
      style={{
        backgroundImage: `url(${contact})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
        minHeight: "123.71vh",
      }}
    >
      <div className="contact-form">
        <div className="midfrom">
          <h1>Contact Form</h1>
          <form
            id="contact_form"
            name="contact_form"
            method="post"
            onSubmit={handleSubmit} 
          >
            <div className="mb-4 row">
              <div className="col">
                <label>First Name</label>
                <input
                  type="text"
                  required
                  maxLength="50"
                  className="form-control input-field"
                  id="first_name"
                  name="first_name"
                />
              </div>
              <div className="col">
                <label>Last Name</label>
                <input
                  type="text"
                  required
                  maxLength="50"
                  className="form-control input-field"
                  id="last_name"
                  name="last_name"
                />
              </div>
            </div>
            <div className="mb-4 row">
              <div className="col">
                <label htmlFor="email_addr">Email address</label>
                <input
                  type="email"
                  required
                  maxLength="50"
                  className="form-control input-field"
                  id="email_addr"
                  name="email"
                  placeholder="name@example.com"
                />
              </div>
              <div className="col">
                <label htmlFor="phone_input">Phone</label>
                <input
                  type="tel"
                  required
                  maxLength="50"
                  className="form-control input-field"
                  id="phone_input"
                  name="Phone"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="message">Message</label>
              <textarea
                className="form-control input-field"
                id="message"
                name="message"
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary px-4 btn-lg">
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
