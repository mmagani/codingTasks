import React, { useState } from 'react';

const withdraw = ({ withdraw }) => {

  const [amountWithdraw, setAmountWithdraw] = useState(0);

  return (
    <div>
      <div>
        <input 
          type="number" 
          value={amountWithdraw} 
          onChange={(e) => setAmountWithdraw(Number(e.target.value))} 
          placeholder="Amount" 
        />
        <button onClick={() => withdraw(amountWithdraw)}>Withdraw</button>
      </div>
    </div>
  );
};

export default withdraw;