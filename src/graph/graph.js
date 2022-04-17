import { Link, useLocation } from 'react-router-dom'
import './graph.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import React, { useState } from 'react';
import BasicTable from '../table.js'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';



function Graph(){
        
    const [mode, setMode] = useState(0);
    const [fetchData, setData] = useState("");
    const [count, setCount] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [parsedData, setParsedData] = useState([])
    const [graphMode, setGraphMode] = useState(0)
    const [chosenDay, setChosenDay] = useState("")
    const [chosenWeek, setChosenWeek] = useState("")
        const pageWidth = document.documentElement.scrollWidth
        const pageHeight = document.documentElement.scrollHeight

        const handleClick = (curr_state) => {
            setMode(curr_state) 
            setClicked(false)
            setChosenDay("")
            setChosenWeek("")
        }   

        const deleteRepeating = (argu) => {
            let i = 0
            let newArr = []
            let retArr = []
            while (argu.length>i){
                if (newArr.indexOf(argu[i])===-1){
                newArr.push(argu[i])
                retArr.push(argu[i])
                }
                i++
            }
            return retArr
        }

        
        const {state} = useLocation()

        async function getData(login, password, id){
            await fetch(`http://localhost/getsensors/${id}`, {headers:{'login': login, 'pw':password}})
            .then(response => response.json())
            .then(data => {
            setData(data)
            setCount(true)
            })
            
        }
        const dailyChart = (dateArray, unupdated) =>{
            if (unupdated==1){
            let allowed = dateArray.map((entry) => {
                if (entry.off_reactive_a !== "NaN")
                    return addEff(entry)
            }).filter( item => item )
            setParsedData(allowed)
            setClicked(true)
        }
        else{
            
            let allowed = dateArray.map((entry) => addEff(entry)).filter( item => item )
            setClicked(true)
            console.log(allowed)
            setParsedData(allowed)
        }
        }

        const getPlotData = () =>{
            if (mode == 1){
            let preReturn = parsedData.map(unit => ({
                name: unit.start_date.split(" ")[1],
                uv: ((Number(unit.off_active_a) + Number(unit.off_active_b) + Number(unit.off_active_c))-(Number(unit.on_active_a) + Number(unit.on_active_b) + Number(unit.on_active_c)))/(Number(unit.off_active_a) + Number(unit.off_active_b) + Number(unit.off_active_c))
            }))
            return preReturn}
            else {
                let preReturn = parsedData.map(unit => ({
                    name: unit.start_date.split(" ")[0].slice(0,5)+" "+unit.start_date.split(" ")[1],
                    uv: ((Number(unit.off_active_a) + Number(unit.off_active_b) + Number(unit.off_active_c))-(Number(unit.on_active_a) + Number(unit.on_active_b) + Number(unit.on_active_c)))/(Number(unit.off_active_a) + Number(unit.off_active_b) + Number(unit.off_active_c))
                }))
                return preReturn
            }
        }

        const addEff = (temp) =>{
            if (temp.off_reactive_a !== "NaN"){
                let calculated = ((Number(temp.off_active_a) + Number(temp.off_active_b) + Number(temp.off_active_c))-(Number(temp.on_active_a) + Number(temp.on_active_b) + Number(temp.on_active_c)))/(Number(temp.off_active_a) + Number(temp.off_active_b) + Number(temp.off_active_c))
                return Object.defineProperty(temp, 'eff', {
                  value: (calculated*100).toFixed(2)+"%",
                  enumerable: true,
                  configurable: true,
                  writable: true
              })}
            else{
                return Object.defineProperty(temp, 'eff', {
                    value: "-",
                    enumerable: true,
                    configurable: true,
                    writable: true
              }
                )
            }
        }

        const exists = (props) =>{
            if (props.length > 1 && graphMode == 1){
                return true
            }
            else if (props.length > 0 && graphMode == 0){
                return true
            }
        }

        const handleChange = e =>{
            setChosenDay(e.target.value)
            dailyChart(datePicker(e.target.value), graphMode)
        }

        const handleWeekChange = e =>{
            setChosenWeek(e.target.value)
            dailyChart(dateWeekPicker(e.target.value), graphMode)
        }

        const handleModeChange = e =>{
            setGraphMode(e.target.value)
            if (mode == 1){
                dailyChart(datePicker(chosenDay), e.target.value)
            }
            else {
                dailyChart(dateWeekPicker(chosenWeek), e.target.value)
            }
        }
        const dateWeekPicker = (date) =>{
            let pickedItem = new Date(date)
            pickedItem = pickedItem.getTime() - 3*60*60*1000
            let allTimes = dailyDateList.map(num => new Date(num.split('.').reverse().join('.')).getTime())
            let allowed = allTimes.map(time => {
                if (time - pickedItem < 7*24*60*60*1000 && time-pickedItem>=0)
                    return time
            }).filter( item => item )
            allowed = allowed.map(item => {
                let temp = new Date(item)
                return temp.getDate()+"."+(new Number(temp.getMonth())+1)+"."+temp.getFullYear()
            })
            let tempArr = fetchData
            let newArr = []
            while (allowed.length > 0){
                for (let i=0; i<tempArr.length;i++){
                    if (allowed[0]==tempArr[i].start_date.split(" ")[0]){
                        newArr.push(tempArr[i])
                        }
                }
                allowed.shift()
                
            }
            return newArr
        }

        const getTableData = (table) =>{
            return table.map(item => {
                let i = 0
                let newObj = {}
                let tempValues = Object.values(item)
                let eff = tempValues.pop()
                for (const[key] of Object.entries(item)){
                    Object.defineProperty(newObj, key, {
                    value: tempValues[i],
                    enumerable: true,
                    configurable: true,
                    writable: true
              }
                )
                i++
                if (i>15){
                    break
                }
            }
            Object.defineProperty(newObj, "eff", {
                value: eff,
                enumerable: true,
                configurable: true,
                writable: true
            })
            console.log(newObj)
            return newObj
        })

    }

        const datePicker = (date) =>{
            let newArr = fetchData.map((item) => {
                if (item.start_date.split(' ')[0] == date)
                    return item
            })
            return newArr.filter( item => item )
        }

        let dailyDateList = 0
        if (state != null) {
            if (!count){
                getData(state.login, state.password, state.id)
            }
            if (count){
                dailyDateList = fetchData.map(v => v.start_date.split(' ')[0])
                dailyDateList = deleteRepeating(dailyDateList)
            return(
                <div className='Graph'>
                <div className="Utility">
                <Link to={`/UserPage`}
                        state = {{ login: state.login, password: state.password, accessed: state.accessed }}>Вернуться на главную</Link>
                <div className='Buttons'>
                <button onClick={() => handleClick(1) }>Отобразить за день</button>
                <button onClick={() => handleClick(7) } style={{'marginTop': '2%'}}>Отобразить за неделю</button>
                {mode == 1 ? <div className="DateButtons">
                <Select
                label="Day"
                variant="standard"
                value={chosenDay}
                onChange={handleChange}
                >
                    {dailyDateList.map(row => <MenuItem value={row}>{row}</MenuItem >)}
                    {/* {dailyDateList.map((row) => <button onClick={() => dailyChart(datePicker(row))}>{row}</button>)} */}
                </Select>
                </div>
                : 
                mode == 7 ? <div>
                    <div></div>
                    <input type="date" value={chosenWeek} onChange={handleWeekChange} className="DatePicker"></input>
                    </div> 
                : null
                }
                
                </div>
                </div>
                {mode == 1 ? 
                <div className = "Changeble">
                    { clicked ? 
                            <div>
                                <Select
                                variant="standard"
                                sx = {{ top:10, left: 10 }}
                                onChange={handleModeChange}
                                value={graphMode}
                                >
                                <MenuItem value={1}>График</MenuItem >
                                <MenuItem value={0}>Таблица</MenuItem >
                                </Select>
                                <div className="Container">
                            {exists(parsedData) && graphMode == 1 ?
                        <LineChart width={pageWidth*0.65} data={getPlotData()} height={pageHeight*0.6} margin={{ top: 10, right: 60, bottom: 10, left: 0 }} className='Plot' baseValue={1}>
                        <Line type="monotone" dataKey="uv" stroke="#000000" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" interval={0}/>
                        <YAxis domain={[0,1]} />
                        </LineChart> 
                        : exists(parsedData) && graphMode == 0 ? 
                        <BasicTable data={getTableData(parsedData)} className="Container"/>
                        :
                        <div>Недостаточно данных</div>}
                        </div>
                        </div>
                : <div>Выберите день</div>}
                </div> 
                : 
                mode == 7 ? 
                <div className = "Changeble">
                    { clicked ? 
                            <div>
                                <Select
                                variant="standard"
                                sx = {{ top:10, left: 10 }}
                                onChange={handleModeChange}
                                value={graphMode}
                                >
                                <MenuItem value={1}>График</MenuItem >
                                <MenuItem value={0}>Таблица</MenuItem >
                                </Select>
                                <div className="Container">
                            {exists(parsedData) && graphMode == 1 ?
                        <LineChart width={pageWidth*0.65} data={getPlotData()} height={pageHeight*0.6} margin={{ top: 10, right: 60, bottom: 10, left: 0 }} className='Plot' baseValue={1}>
                        <Line type="monotone" dataKey="uv" stroke="#000000" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" interval={0}/>
                        <YAxis domain={[0,1]} />
                        </LineChart> 
                        : exists(parsedData) && graphMode == 0 ? 
                        <BasicTable data={getTableData(parsedData)} className="Container"/>
                        :
                        <div>Недостаточно данных</div>}
                        </div>
                        </div>
                : <div>Укажите первый день недели, за которую хотите просмотреть данные</div>}
                </div> 
                :
                <div>
                    Выберите режим отображения
                </div>}
                </div>
            )
            }
            else{
                return <>
                <div>Wait for it</div>
                </>
              }
        }
        else {
            return <div className='Graph'>
                <div>no access</div>
                <Link to={`/`}>Вернуться к авторизации</Link>
            </div>
        }
        
}

export default Graph