const obj = {
   id: "62428e95185aa05af8fda81d",
   date: "2022-03-06",
   "description": "tuuyi",
   type: "Expenses",
   amount: 5,
   trueAmount: ()=>{
      (this.type === "Commissions") ? this.type = 1 : this.type = -1
    this.type * this.amount 
   }

    }
  
  

 
 
 console.log(trueAmount(obj))
 
 