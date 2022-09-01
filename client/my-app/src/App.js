import './App.css';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
var dollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency :'USD'
})

function App() {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [entryObj, setEntryObj] = useState('')
  const [dependency, setDependency] = useState(74)
  
  const [tableData, setTableData] = useState('')
  const [orgData, setOrgData] = useState([])
  
  const [total, setTotal] = useState(null)

  const [payrollArr, setPayrollArr] = useState([])
  const [expensesArr, setExpensesArr] = useState([])
  const [income, setIncomeArr] = useState([])


  function createRow(){
    try {
       (amount <= 0)? alert(" Enter a valid amount")
      :(date === "")? alert(" Enter a valid date")
      :(type === '')? alert(" Enter a valid type")

      : axios.post('http://localhost:5000/entries', {
      date: date,
      description : description,
      type: type,
      amount: amount,

    })


    } catch (error) {
      console.log(error)
    }

    setDependency( Math.random())
    setDate('')
    setDescription('')
    setType('')
    setAmount('')

  }
  function formatRow(x){
   const site = 'http://localhost:5000/entries/' + x['_id']
    function deleteRow(){
     axios.delete(site , x).then(() =>  setDependency( Math.random() )).catch(e=> console.log(e))
     //console.log(site )
     setDependency( Math.random() )
     console.log(dependency)
    }

   return <tr key={x['_id']}  >
      <td> {x.date}  </td><td> {x.description} </td><td> {x.type}  </td>
      <td> {dollar.format(x.amount)} </td>
      <td> <button onClick={deleteRow}>X</button>  </td>
    </tr>
  }
  const realAmount = (x)=>{
   return (x.type === "Commissions" ) ? x.amount 
    :(x.type === "Income"  )? x.amount
    : x.amount * -1
       

  }

  useEffect(() => {
    axios.get('http://localhost:5000/entries')
    //.then(res=> setCommishArr(res))
          .then(res =>  { setTableData(res.data.sort((a,b) => new Date (a.date) - new Date (b.date )).map(formatRow))
                          setOrgData(res.data)   
                        })
         // .then(res=> setCommishArr(res))
          .catch(err => console.log(err))
          console.log(dependency)

  }, [dependency])
  useEffect(() => {
    setTimeout(() => {
      setTotal(dollar.format(orgData.map(realAmount).reduce((a,b)=> a+b)))
      setIncomeArr(orgData.filter(x => x.type === "Commissions" || x.type === "Income" ).map(x=> x.amount).reduce((a,b)=> a+b)  )
      setPayrollArr(orgData.filter(x => x.type === "Payroll" ).map(x=> x.amount).reduce((a,b)=> a+b)  )
      setExpensesArr(orgData.filter(x => x.type === "Expenses" ).map(x=> x.amount).reduce((a,b)=> a+b)  )
    }, 100);
  }, [orgData])
  

  return (
    <div className="App">
      <div className= 'header'>
        <h1>
          Expense Tracker
        </h1>
      </div>
        <div id="input-box" >  
          <input type="date" placeholder="Date" className="input-item" value={date}
          onChange={(e) => setDate( e.target.value)}
          /> 
          <input type="text" placeholder="Description" className="input-item" value={description}
          onChange={(e) => setDescription(e.target.value) } style={{width: "400px"}}
          />
          <select id="TypeList" className="input-item"  onChange={(e) => setType(e.target.value)} > Type
            <option value={type} >  Select Type  </option>
            <option value= "Commissions"   > Commissions </option>
            <option value= "Expenses"    > Expenses  </option>
            <option value= "Payroll"   > Payroll </option>
            <option value= "Income"   > Income  </option>
          </select>
          <input type="number"  placeholder="Amount" className="input-item" value={amount}
          onChange={(e) => setAmount(e.target.value)}
          /> 
          <button onClick={createRow} > Clear </button>
        </div>
        <hr/>
<div id="total-box">
Total:<br/><span>{total}</span>
</div>
<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Type</th>
      <th>Amount</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {tableData}
  </tbody>
</table> 



<table>
<thead>
  <tr>
    <th>Income</th>
    <th>Payroll</th>
    <th>Expenses</th>   
  </tr>
  </thead>
  <tbody>
    <td> {dollar.format(income)}</td>
    <td> {dollar.format(payrollArr)} </td>
    <td> {dollar.format(expensesArr)} </td>
  </tbody>
</table>


    </div>
  );
}

export default App;
