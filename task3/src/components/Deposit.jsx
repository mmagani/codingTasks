import React, { useState } from 'react';

const Deposit = ({ deposit}) => {
  const [amountDeposit, setAmountDeposit] = useState(0);

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
    </div>
  );
};

export default Deposit;