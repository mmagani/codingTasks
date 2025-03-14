import React, { useState } from 'react';

const Controls = ({ addInterest}) => {

  const [rate, setRate] = useState(0);

  return (
    <div>
      <div>
        <input 
          type="number" 
          value={rate} 
          onChange={(e) => setRate(Number(e.target.value))} 
          placeholder="Interest Rate (%)" 
        />
        <button onClick={() => addInterest(rate)}>Add Interest</button>
      </div>
    </div>
  );
};

export default Controls;