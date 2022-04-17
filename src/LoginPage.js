import "./LoginPage.css";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Canvas from "./Canvas.jsx"


function LoginPage(){
  // const [data,setData] = useState({
  //   username:"",
  //   password:""
  // })
  
  // const {username,password} = data;
  
  // const changeHandler = e => {
  //   setData({...data,[e.target.name]:[e.target.value]});
  // }

  // let navigate = useNavigate()

  // const submitHandler = async e => {
  //   e.preventDefault();
  //   let d = await fetch('http://localhost/getaccessed', {headers:{'Content-Type': 'application/json','login':data.username[0],'pw':data.password[0]}}).then(
  //     response => response.json()
  //   )
  //   console.log(data.password[0])
  //   navigate("/UserPage", {state: {login: data.username[0], password: data.password[0], accessed:d}})
  // }
  return (
    <div className="LoginPage">
      <div className="canvas">
        <Canvas />
        </div>

      {/* <form onSubmit={submitHandler} className='LoginContainer'> */}
        {/* <div className="Login">
          <input className="TextFieldLogin" name="username" placeholder="Login" value={username} onChange={changeHandler}></input>
        </div>
        <div className="Password">
          <input type="password" name="password" className="TextFieldPassword" placeholder="Password" value={password} onChange={changeHandler}></input>
        </div> */}
        {/* <button type="submit" className="Button">Войти</button>  */}
        {/* </form> */}
        
        <img src="/map.png" className="imgur"/>

        
    </div>
  );
}

export default LoginPage
