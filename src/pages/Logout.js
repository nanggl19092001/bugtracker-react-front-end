import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    
    localStorage.removeItem('token')
    localStorage.clear()
    useEffect(() => {
        const navigate = useNavigate()
        navigate('/login')
        }, []);

    return ( 
       null
     );
}

export default Logout;