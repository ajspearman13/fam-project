import './App.css';
import React, {useState, useEffect, useContext} from 'react';

function App() {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [amount, setAmount] = useState('')
  const [entryObj, setEntryObj] = useState('')
  
  const [commish, setCommishArr] = useState('')
  const [payroll, setPayrollArr] = useState('')
  const [expense, setExpenseArr] = useState('')
  
  function createRow(){
    setEntryObj({
      date: date,
      description : description,
      type: type,
      amount: amount
    })

  }

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
          <option value="Expenses"  > Gastos   </option>
          <option value="Commissions"   > Income  </option>
        </select>
        <input type="number"  placeholder="Amount" className="input-item" value={amount}
        onChange={(e) => setAmount(e.target.value)}
        /> 
        <button onClick={createRow} > Clear </button>
        <hr/>
        {JSON.stringify(entryObj)}
      

    </div>
  );
}

export default App;
