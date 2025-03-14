import React, { useState } from 'react';

const Controls = ({ deposit, withdraw, addInterest, chargeFees }) => {
  const [amountDeposit, setAmountDeposit] = useState(0);
  const [amountWithdraw, setAmountWithdraw] = useState(0);
  const [amountFees, setAmountFees] = useState(0);
  const [rate, setRate] = useState(0);

  return (
    <div>
      <div>
        <input 
          type="number" 
          value={amountDeposit} 
          onChange={(e) => setAmountDeposit(Number(e.target.value))} 
          placeholder="Amount" 
        />
        <button onClick={() => deposit(amountDeposit)}>Deposit</button>
      </div>
      <div>
        <input 
          type="number" 
          value={amountWithdraw} 
          onChange={(e) => setAmountWithdraw(Number(e.target.value))} 
          placeholder="Amount" 
        />
        <button onClick={() => withdraw(amountWithdraw)}>Withdraw</button>
      </div>
      <div>
        <input 
          type="number" 
          value={rate} 
          onChange={(e) => setRate(Number(e.target.value))} 
          placeholder="Interest Rate (%)" 
        />
        <button onClick={() => addInterest(rate)}>Add Interest</button>
      </div>
      <div>
        <input 
          type="number" 
          value={amountFees} 
          onChange={(e) => setAmountFees(Number(e.target.value))} 
          placeholder="Fee Amount" 
        />
        <button onClick={() => chargeFees(amountFees)}>Charge Fees</button>
      </div>
    </div>
  );
};

export default Controls;