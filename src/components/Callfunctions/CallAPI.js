import axios from 'axios'

const CallAPI = async(method,url,data=null,token) => {

    try{
        const response = await axios({
            method,
            url,
            data,
            headers: {
                Authorization: token,
            }
        });

        return response;
    }
    catch(error) {
        throw error;
    }
}

export default CallAPI
