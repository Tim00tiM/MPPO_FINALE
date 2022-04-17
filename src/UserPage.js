import "./UserPage.css";
import Accessed from "./components/accessed"
import { useLocation } from "react-router-dom";
function UserPage(){
  const {state} = useLocation()
  const {login, password, accessed} = state
  return (
    <div className="UserPage">
    <div className="welcomeText">Добро пожаловать, {login}</div>
    <div className="numbers">
      <div className="numText">Доступные вам АКЭС </div>
      <Accessed key="-1" numbers={state}/>
    </div>
   </div>
   
  );
}

export default UserPage
