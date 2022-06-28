import { useState } from "react";

function App() {
  const [calc, setCalc]=useState('');
  const [result, setResult]=useState('');
  const [roman, setRoman]=useState(false);

  const switchMode = ()=>{
    if(roman === false){
      setRoman(true)
    }
    else{
      setRoman(false)
    }
    console.log(roman)
  }

  const intToRoman = (num) => {
    const map = {
      M:  1000,
      CM: 900,
      D:  500,
      CD: 400,
      C:  100,
      XC: 90,
      L:  50,
      XL: 40,
      X:  10,
      IX: 9,
      V:  5,
      IV: 4,
      I:  1,
    };  
    let result = '';
    
    for (let key in map) {
      result += key.repeat(Math.floor(num / map[key]));
      num %= map[key];
    }
    return result
  };

  const romanConverter=(num)=>{
    if (roman == true){
      let romanNum = intToRoman(parseInt(num))
      return romanNum
    }
    else{
      return num.toString()
    }
  }

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
      setResult(romanConverter(eval(calc + value)));
    }

  }

  const listDigits = ()=> {
    const digits = [];

    for (let i =1; i < 11; i++){
      digits.push(
        <button onClick={()=> reCalc(i)} key={i}>{romanConverter(i)}</button>
      )
    }
    return digits;
  }

  const calculate = ()=>{
    setCalc(romanConverter(eval(calc)));
  }

  const clear = ()=>{
    if(calc ==''){
      return;
    }
    const value = calc.slice(0, -1);

    setCalc('')
  }

  return(
    <div className="App">
      <div className="mode">
        <button onClick={switchMode}>Toggle Mode</button>
      </div>
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
