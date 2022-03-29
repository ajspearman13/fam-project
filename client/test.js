<div className="App">
     <div>
      <input type="text" placeholder="Description" style={{width : 300}} 
                    value={this.state.description}
                    onChange={this.userDescriptionChanged}
                    className="input-item"
      />
      <input type="number" style={{}} placeholder="Amount" 
                  value={this.state.amount}
                  onChange={this.userAmountChanged}
                  className="input-item"
      /> 
      <input type="date" 
                  value={this.state.date}
                  onChange={this.userDateChanged} 
                  placeholder="Date"
                  className="input-item"
      /> 
      <select id="TypeList" className="input-item" value={this.state.type} onChange={this.userTypeChanged} > Type
                  <option value="" >  Select Type  </option>
                  <option value="Commissions"> Commissions </option>
                  <option value="Expenses" > Expenses  </option>
                  <option value="Payroll"> Payroll </option>
                  <option value="Expenses" > Gastos   </option>
                  <option value="Commissions" > Income  </option>
        </select>
     </div>
    </div>