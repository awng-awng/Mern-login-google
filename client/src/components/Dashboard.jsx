import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  // const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:8080/login/sucess", { withCredentials: true });

        console.log("response",response)
    } catch (error) {
      navigate("*")
      console.error("Error fetching user data", error);
    }
}


useEffect(() => {
  getUser()
})
  return (
    <div style={{textAlign:"center"}}>
        <h1>Dashboard Website!</h1>
      </div>
  )
}

export default Dashboard