import { useNavigate } from 'react-router-dom';
import CallAPI from './CallAPI';
import { useEffect } from 'react';

const Tokenchck = () => {
    const navigate = useNavigate();

    // useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token');

            if (token === 'undefined' || !token) {
                return 'invalid';
            }
            else {
                try {
                    const apiresponse = await CallAPI('get', 'http://localhost:8080/check-token', null, `Bearer ${token}`);

                    if (apiresponse === 'error') {
                        return 'error';
                    } else {
                        // alert(apiresponse);
                        return 'valid';
                    }
                } catch (error) {
                    console.error('API Error:', error);
                    return 'error';
                }
            }
        };

        checkToken();
    // }, [navigate]);

};

export default Tokenchck;
