import React, { useState } from "react";
import def from './assets/images/illustration-empty.svg'
import calc from './assets/images/icon-calculator.svg';

function App() {
  
  const [mortgageMounth, setMortgageMounth] = useState(0)
  const [mortgagePaid, setMortgagePaid] = useState(0)
  const [mortgageOverPayment, setMortgageOverPayment] = useState(0)
  const [mortgageAmount, setMortgageAmount] = useState(0)
  const [mortgageTerm, setMortgageTerm] = useState(0)
  const [mortgageRate, setMortgageRate] = useState(0)
  const [checked, setChecked] = useState(true);

  function setRepayment(){
    setChecked('Rep')
  }
  
  function setInterest(){
    setChecked('int')
  }

  function calculateMortgage() {
    // Переводим процентную ставку в месячный формат
    const monthlyRate = (mortgageRate / 100) / 12;
    // Общее количество платежей (месяцев)
    const totalPayments = mortgageTerm * 12;
    // Рассчитываем ежемесячный платеж по формуле аннуитетного платежа
    const monthlyPayment = mortgageAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    // Общая сумма всех выплат
    const totalAmountPaid = monthlyPayment * totalPayments;
    const overpayment = totalAmountPaid - mortgageAmount;
    setMortgageMounth(monthlyPayment.toFixed(2))
    setMortgagePaid(totalAmountPaid.toFixed(2))
    setMortgageOverPayment(overpayment.toFixed(2))
    console.log(monthlyPayment)
  }

  return (
    <div className="app">
      <div className="calculator">
        <div className="header">
          <p>Mortgage Calculator</p>
          <p>Clear All</p>
        </div>
        <div className="amount">
          <p>Mortgage Amount</p>
          <div className="inputs">
            <div className="vallet">£</div>
            <input type="number" onChange={(event) => setMortgageAmount(parseFloat(event.target.value))}></input>
          </div>
        </div>
        <div className="other">
          <div className="term">
            <p>Mortgage Term</p>
            <div className="other-inputs">
              <input type="number" onChange={(event) => setMortgageTerm(parseFloat(event.target.value))}></input>
              <div className="right-thing">years</div>
            </div>
          </div>
          <div className="rate">
          <p>Mortgage Rate</p>
          <div className="other-inputs">
              <input type="number" onChange={(event) => setMortgageRate(parseFloat(event.target.value))}></input>
              <div className="right-thing">%</div>
            </div>
          </div>
        </div>
        <form>
          <label>
            <div className="check" onClick={setRepayment}>
              <input type="radio" name="option" value="1" />
              <p>Repayment</p>
            </div>
          </label>
          <label>
            <div className="check" onClick={setInterest}>
            <input type="radio" name="option" value="2" />
            <p>Interest Only</p>
            </div>
         </label>
        </form>
        <div className="button" onClick={calculateMortgage}>
        <img src={calc} />
        <p>Calculate Repayments</p>
        </div>
      </div>
      <div className="results">
      {mortgageMounth === 0 ? (
        <div className="empty">
        <img src={def} />
        </div>
      ) : (
        <div className="result">
          <div className="green-line" />
          <div className="mounth-payment">
            <p>Your monthly repayments</p>
            <p>{mortgageMounth}</p>
          </div>
          <div className="line" />
          <div className="full-repay">
            <p>Total you`ll repay over the term</p>
            <p>{mortgagePaid}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;