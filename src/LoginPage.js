import "./LoginPage.css";
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Canvas from "./Canvas.jsx"
const nerdamer = require("nerdamer/all.min")



function LoginPage(){
  
  const [datta,setDatta] = useState([])
  const [sensors,setSensors] = useState([])
  const [ready,setReady] = useState(false)
  const settt = async () => {
    setSensors(await fetch("http://localhost:3000/getswandatas").then(response => response.json()))
    console.log(sensors)
  }
  let anomalyList = []
  // if (sensors != []){
  // sensors.map(async item => {
  //   let swanData = await fetch(`http://localhost/getcoorddata/${item}`).then(response => response.json())
  // })}
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
  if (sensors.length == 0){
settt()
}
  const gett = async() => {
    if (sensors.length!=0 && datta.length==0){
  sensors.map(async item => {
      await fetch(`http://localhost:3000/getcoorddata/${item.swan_id}`).then(response => response.json()).then(data => anomalyList.push(data))
      setDatta(anomalyList)
    })
 
  }}
gett()
if(datta.length){
  datta.map(item => {
    let maximums = item[1].map(entry => parseFloat(entry.rate))
    let prev = 0
    maximums = maximums.sort()
    let previous = maximums[maximums.length-2]
    maximums = maximums[maximums.length-1]


  })
}
// let anomalyList = [[{x: 9, y:9 , rate: 0.1626}, {x: 33, y:9 , rate: 0.2667}, {x: 9, y:23 , rate: 0.262}]]
// let msg = {"message":[{"coords":[9,9],"id":1,"swans":[{"id":"5b6eb38b","rate":0.1626},{"id":"c00b92ba","rate":0.249},{"id":"931ede7b","rate":1.4634},{"id":"661c2e66","rate":0.1859},{"id":"c2958c11","rate":0.2006},{"id":"08d55d4f","rate":0.2602}]},{"coords":[33,9],"id":2,"swans":[{"id":"5b6eb38b","rate":0.2667},{"id":"c00b92ba","rate":0.6186},{"id":"931ede7b","rate":0.1412},{"id":"661c2e66","rate":0.2262},{"id":"c2958c11","rate":1.1475},{"id":"08d55d4f","rate":0.1918}]},{"coords":[9,23],"id":3,"swans":[{"id":"5b6eb38b","rate":0.262},{"id":"c00b92ba","rate":0.1846},{"id":"931ede7b","rate":0.1592},{"id":"661c2e66","rate":0.2703},{"id":"c2958c11","rate":0.1022},{"id":"08d55d4f","rate":0.6931}]},{"coords":[32,22],"id":4,"swans":[{"id":"5b6eb38b","rate":0.9231},{"id":"c00b92ba","rate":0.4138},{"id":"661c2e66","rate":0.4587},{"id":"c2958c11","rate":0.2006},{"id":"08d55d4f","rate":0.4142}]}]}
// let centers = anomalyList.map(item => {
//   // let coordArr = fetch("http://localhost/getcoorddata").then(response => response.json())
//   let coordArr = item
//   // let sol = nerdamer.solveEquations([`(x^2+y^2)*(${(coordArr[0].rate - coordArr[1].rate).toFixed(2)})-2*x*(${(coordArr[0].rate*coordArr[0].x-coordArr[1].rate*coordArr[1].x).toFixed(2)})-2*y*(${(coordArr[0].rate*coordArr[0].y-coordArr[1].rate*coordArr[1].y).toFixed(2)})+(${(coordArr[0].rate*(coordArr[0].x**2+coordArr[0].y**2)-coordArr[1].rate*(coordArr[1].x**2+coordArr[1].y**2)).toFixed(2)})=0`,
//   //  `(x^2+y^2)*(${(coordArr[0].rate - coordArr[2].rate).toFixed(2)})-2*x*(${(coordArr[0].rate*coordArr[0].x-coordArr[2].rate*coordArr[2].x).toFixed(2)})-2*y*(${(coordArr[0].rate*coordArr[0].y-coordArr[2].rate*coordArr[2].y).toFixed(2)})+(${(coordArr[0].rate*(coordArr[0].x**2+coordArr[0].y**2)-coordArr[2].rate*(coordArr[2].x**2+coordArr[2].y**2)).toFixed(2)})=0`,
//   //   `(x^2+y^2)*(${(coordArr[1].rate - coordArr[2].rate).toFixed(2)})-2*x*(${(coordArr[1].rate*coordArr[1].x-coordArr[2].rate*coordArr[2].x).toFixed(2)})-2*y*(${(coordArr[1].rate*coordArr[1].y-coordArr[2].rate*coordArr[2].y).toFixed(2)})+(${(coordArr[1].rate*(coordArr[1].x**2+coordArr[1].y**2)-coordArr[2].rate*(coordArr[2].x**2+coordArr[2].y**2)).toFixed(2)})=0`
//   // ])
//   // console.log(sol)
//   return 1
// })


  return (
    <div className="LoginPage">
      <div className="canvas">
        <Canvas props={msg}/>
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
