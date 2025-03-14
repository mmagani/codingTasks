import React from "react";

// Import the Child components
 import AddInterest from "./AddInterest";
 import Deposit from "./Deposit";
 import ChargeFees from "./ChargeFees";
 import Withdrawal from "./Withdrawal";
 import './styles.css';

 // Import useState
 import { useState } from "react";


function Bank() {

  const [balance, setBalance] = useState(0)

  // Create the name state variable
  const deposit = (amount) => setBalance(balance + amount);
  const withdraw = (amount) => setBalance(balance - amount);
  const addInterest = (rate) => setBalance(balance + (balance * rate / 100));
  const chargeFees = (amount) => setBalance(balance - amount);
  
  if (balance < 0) {
    alert("Your balance cannot be less than 0");
    return;
  }

  return (
    <div>
      <h1>Bank Balance: ${balance.toFixed(2)}</h1>
            <Deposit 
               deposit={deposit} 
            />
            <Withdrawal 
               withdraw={withdraw} 
            />
            <ChargeFees 
               chargeFees={chargeFees} 
            />
              <AddInterest 
                 addInterest={addInterest} 
            />

    </div>
    );
 };


export default Bank;