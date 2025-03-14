import React, { useState } from 'react';

const Controls = ({ chargeFees }) => {

  const [amountFees, setAmountFees] = useState(0);


  return (
    <div>
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