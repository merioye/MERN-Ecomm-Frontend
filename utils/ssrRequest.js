import axios from 'axios';


const SET_COOKIE_HEADER = 'set-cookie';




const getError = (error)=>{
    if(error.isAxiosError && error.response) return error.response.data;
    return 'Unexpected error';
}


const refreshTokens = async (req, res)=>{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/refreshToken`, {
        headers: { cookie: req.headers.cookie }
    });
    const cookies = response.headers[SET_COOKIE_HEADER];

    req.headers.cookie = cookies;
    res.setHeader(SET_COOKIE_HEADER, cookies);
}


const handleRequest = async (req, res, request)=>{
    try{
        return await request();
    }catch(error){
        if(error && error.response && error.response.status===401){
            try{
                await refreshTokens(req, res);
                return await request();
            }catch(e){
                console.log('e', e)
                throw getError(e);
            }
        }
        throw getError(error);
        
    }
}


const ssrRequest = async (req, res, url)=>{
    try{
        const request = ()=> axios.get(url, { headers: { cookie: req.headers.cookie || '' } }); // here added || ''
        const { data } = await handleRequest(req, res, request);
        return [null, data];
    }catch(error){
        return [error, null];
    }
}



export default ssrRequest;