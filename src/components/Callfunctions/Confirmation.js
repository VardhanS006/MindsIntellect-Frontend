import React from 'react'
import { useNavigate } from 'react-router-dom';
import CallAPI from './CallAPI';

export const Confirmation = ({ showModal, handleClose, subId, username, token }) => {

    const navigate = useNavigate();
    
    const upgradeplan = async() => {
        
        try {
            const api = await CallAPI('post', `http://localhost:8080/upgradesub?username=${username}&subId=${subId}`, null, `Bearer ${token}`);
            // handleClose();
            window.location.reload();
            // navigate("/subscription");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            {showModal && (
                <div className="modal" tabIndex="-1" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Confirm</h1>
                                <button type="button" className="btn-close" onClick={handleClose}></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to pay this amount?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={()=>upgradeplan()}>Pay</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}