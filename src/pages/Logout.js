import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate()
    localStorage.removeItem('token')
    localStorage.clear()
    navigate('/login')

    return ( 
       null
     );
}

export default Logout;