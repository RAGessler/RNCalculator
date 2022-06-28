import { useState } from "react";

function App() {
  const [calc, setCalc]=useState('');
  const [result, setResult]=useState('');

  const operators = ['/', '*', '-', '+', '.'];

  const reCalc = value => {
    if(
      (operators.includes(value) && calc ==='')||
      (operators.includes(value) && operators.includes(calc.slice(-1)))
    ){
      return;
    }
    setCalc(calc + value);

    if (!operators.includes(value)){
      setResult(eval(calc + value).toString());
    }

  }

  const listDigits = ()=> {
    const digits = [];

    for (let i =1; i < 10; i++){
      digits.push(
        <button onClick={()=> reCalc(i.toString())} key={i}>{i}</button>
      )
    }
    return digits;
  }

  const calculate = ()=>{
    setCalc(eval(calc).toString());
  }

  const clear = ()=>{
    if(calc ==''){
      return;
    }
    const value = calc.slice(0, -1);

    setCalc(value)
  }

  return(
    <div className="App">
      <div className="Calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''} {' '}
          {calc || '0'}
        </div>

        <div className='operators'>
          <button onClick={()=>reCalc('/')} >/</button>
          <button onClick={()=>reCalc('*')}>*</button>
          <button onClick={()=>reCalc('+')}>+</button>
          <button onClick={()=>reCalc('-')}>-</button>

          <button onClick={clear}>DEL</button>
        </div>

        <div className="digits">
          { listDigits() }
          <button onClick={()=>reCalc('0')} >0</button>
          <button onClick={()=>reCalc('.')} >.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
