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
  const [incomeArr, setIncomeArr] = useState([])


  function createRow(){
  
    axios.post('http://localhost:5000/entries', {
      date: date,
      description : description,
      type: type,
      amount: amount,
      
      
    })
    setDependency( Math.random())
    setDate('')
    setDescription('')
    setType('')
    setAmount('')

  }
  function formatRow(x){
   return <tr key={x['_id']}  >
      <td> {x.date}  </td><td> {x.description} </td><td> {x.type}  </td>
      <td> {dollar.format(x.amount)} </td>
    </tr>
  }
  const realAmount = (x)=>{
   return (x.type === "Commissions" ) ? x.amount 
    :(x.type === "Income"  )? x.amount
    : x.amount * -1
       

  }
  function makePayroll(x){
    orgData.filter(x => x.type > 0)
  }



  useEffect(() => {
    axios.get('http://localhost:5000/entries')
    //.then(res=> setCommishArr(res))
          .then(res =>  { setTableData(res.data.map(formatRow))
                          setOrgData(res.data)   
                        })
         // .then(res=> setCommishArr(res))
          .catch(err => console.log(err))

  }, [dependency])
  useEffect(() => {
    setTimeout(() => {
      setTotal(dollar.format(orgData.map(realAmount).reduce((a,b)=> a+b)))
      setIncomeArr(orgData.filter(x => x.type === "Commissions" || "Income").map(x=> x.amount).reduce((a,b)=> a+b)  )
      setPayrollArr(orgData.filter(x => x.type === "Payroll" ).map(x=> x.amount).reduce((a,b)=> a+b)  )
      setExpensesArr(orgData.filter(x => x.type === "Expenses" ).map(x=> x.amount).reduce((a,b)=> a+b)  )
    }, 100);
  }, [orgData])
  

  return (
    <div className="App">

        <input type="date" placeholder="Date" className="input-item" value={date}
        onChange={(e) => setDate(e.target.value)}
        /> 
        <input type="text" placeholder="Description" className="input-item" value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <select id="TypeList" className="input-item"  onChange={(e) => setType(e.target.value)} > Type
          <option value={type} >  Select Type  </option>
          <option value="Commissions"   > Commissions </option>
          <option value="Expenses"    > Expenses  </option>
          <option value="Payroll"   > Payroll </option>
          <option value="Income"   > Income  </option>
        </select>
        <input type="number"  placeholder="Amount" className="input-item" value={amount}
        onChange={(e) => setAmount(e.target.value)}
        /> 
        <button onClick={createRow} > Clear </button>
        <hr/>
<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Type</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    {tableData}
  </tbody>
</table> Total {total}

<table>
<thead>
  <tr>
    <th>Income</th>
    <th>Payroll</th>
    <th>Expenses</th>   
  </tr>
  </thead>
  <tbody>
    <td> {dollar.format(incomeArr)}</td>
    <td> {dollar.format(payrollArr)} </td>
    <td> {dollar.format(expensesArr)} </td>
  </tbody>
</table>

<button onClick={()=> console.log(orgData)}> heyyyyyy</button>
    </div>
  );
}

export default App;
