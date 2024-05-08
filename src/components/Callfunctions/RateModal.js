import React, { useState } from 'react'
import CallAPI from './CallAPI';
import { useNavigate } from 'react-router-dom';

export const RateModal = ({ showModal, handleClose, ansId, token }) => {
    const navigate = useNavigate();
    const [ratefields, setRatefields] = useState({
        rating: '',
        ratemessage: ''
    })

    const { rating, ratemessage } = ratefields;

    const onInputChange = (e) => {
        setRatefields({ ...ratefields, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("rating", ratefields.rating.toString());
        formdata.append("ratemessage", ratefields.ratemessage.toString());
        try {
            const apiResponse = await CallAPI('post', `http://localhost:8080/rate?ansId=${ansId}`, formdata, `Bearer ${token}`);
            window.location.reload();
        } catch (error) {
            console.error("Error rating answer:", error);
            alert("Failed to rate answer. Please try again later.");
        }

        navigate("/l/pendings");
    };

    return (
        <div>
            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Rate Answer#{ansId}</h1>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label for="rate" className="col-form-label">Rate:</label>
                                        <input type="number" className="form-control" name='rating' max={5} min={0} value={rating} onChange={(e) => onInputChange(e)} />
                                    </div>
                                    <div className="mb-3">
                                        <label for="message" className="col-form-label">Message:</label>
                                        <textarea className="form-control" name='ratemessage' placeholder='Describe the reason for this rating' value={ratemessage} onChange={(e) => onInputChange(e)}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" classNameName="btn btn-secondary" onClick={handleClose}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={(e) => onSubmit(e)}>Post Rating</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
