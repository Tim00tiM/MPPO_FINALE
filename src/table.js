import {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


  export default function BasicTable(props) {
    // const [iterations, setIterations] = useState(1)
    // subentries(data.data[0])
    let arrMainHead =[]
    let arrHead = []
    let arrSubBody = []
    let arrBody = []
    let flag = 0
    let key = 0

    function Subentries(subentry) {
        arrBody = Object.values(subentry)
        arrBody.shift()
        arrSubBody.splice(0, 0, arrBody)
        for (const [key] of Object.entries(subentry)) {
        if (flag == 0)
            arrHead.push(key)
        // console.log(arrHead)
        // console.log(arrBody)
    }
    flag = 1
    }
    function getKey(propererer){
        key = propererer + 1
        return key
    }

    props.data.map(entry => Subentries(entry)) 
    arrHead.shift()
    arrSubBody.reverse()
        return(
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                {arrHead.map(item => <TableCell align='right'>{item}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {arrSubBody.map((item) => (<TableRow>
                {item.map(sub => <TableCell key={getKey(key)}>{sub}</TableCell>)}
              </TableRow>))}
              
              
            {/* {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    );
}