import DisplayScreen from './DisplayScreen';
import Button from './Button';
import { calculatorButtons } from '../globals/calculator-button-data';
import { useState } from 'react';

function Calculator() {
  const [screen, setScreen] = useState("")
  const [operator, setOperator] = useState("")
  const [firstInt, setFirstInt] = useState("")
  const [secondInt, setSecondInt] = useState("")
  const [firstNumberDone, setFirstNumberDone] = useState(false)
  const [storedInt, setStoredInt] = useState("")

  const appendNumber = (value, type) => { 
    if (!firstNumberDone) { 
      setFirstInt((oldValue) => {
        const firstInt = oldValue + value
        return firstInt
      })
    } else { 
      setSecondInt((oldValue) => {
        const secondInt = oldValue + value
        return secondInt
      })
    }
    setScreen((oldScreen) => {
      if (firstNumberDone && !secondInt) {
        const newScreen = "" + value
        return newScreen
      } else {
        const newScreen = oldScreen + value
        return newScreen
      }
    })
   }

   const results = () => {
      if (firstInt && secondInt) {
        let result;
        const firstIntNumber = Number(firstInt)
        const secondIntNumber =  Number(secondInt)
        switch (operator) {
          case "Multiply":
            result = firstIntNumber * secondIntNumber
          break;
          case "Subtract":
            result = firstIntNumber - secondIntNumber
            break;
          case "Add":
            result = firstIntNumber + secondIntNumber
          break;
          case "Divide":
            result = firstIntNumber / secondIntNumber
          break;   
          case "Square Root":
            result = firstIntNumber / firstIntNumber
          break;   
          default:
            break;
        }
        setScreen(result.toString())
        setFirstInt(result.toString())
        setSecondInt('')
        setOperator('')
        setFirstNumberDone(false)

      }
  }

  const clearAll = (value) => {
    setFirstInt('')
    setSecondInt('')
    setOperator('')
    setFirstNumberDone(false)
    setStoredInt('')
    setScreen('')
  }

  const clearInt = (value) => { 

    if (firstNumberDone === false && secondInt === "")  {
      setFirstInt('')
      setScreen('')
    } else {

      setSecondInt('')
      setScreen('')
    }
  }

  const memorySave = () => { 
      setStoredInt(storedInt)
    if (!firstNumberDone) {
      const storedInt = firstInt
      setStoredInt(storedInt)
    }else{ 
      const storedInt = secondInt
      setStoredInt(storedInt)
    }
    return storedInt
  }

  const memoryClear = () => {    
    const storedInt = ""
    setStoredInt(storedInt)
    return storedInt
  }

  const memoryRecall = () => {
    if (storedInt === '') {
      return
    }else if (!firstNumberDone){ 
      setFirstInt(storedInt)
    }else{
      setSecondInt(storedInt)

    }
    setScreen(storedInt);
  }

  const memoryPlus = () => {

    if (!firstNumberDone) {
    
      setStoredInt((oldStoredInt) => {
        const storedInt = Number(oldStoredInt) + Number(firstInt)
        return storedInt.toString()
      })

      }else{
        setStoredInt((oldStoredInt) => {
          const storedInt = Number(oldStoredInt) + Number(secondInt)
          return storedInt.toString()
      })
    }
  }

  const memoryMinus = () => {
    if (!firstNumberDone) {
      setStoredInt((oldStoredInt) => {
        const storedInt = Number(oldStoredInt) - Number(firstInt)
        return storedInt.toString()
      })

      }else{
        setStoredInt((oldStoredInt) => {
          const storedInt = Number(oldStoredInt) - Number(secondInt)
          return storedInt.toString()
      })
    }
}

const squareRoot = () => {
  let newNumber;
  if (!firstNumberDone) {
    setFirstInt((oldNumber) => {
     newNumber = Math.sqrt(oldNumber).toString()
     setScreen(newNumber)
     return newNumber 
    })
  } else {
    setSecondInt((oldNumber) => {
      newNumber = Math.sqrt(oldNumber).toString()
      setScreen(newNumber)
      return newNumber 
     })
  }
}

const percent = () => {
  if (!firstNumberDone) {
    
    setFirstInt((oldNumber) => {
      const newNumber = (Number(oldNumber) / 100).toString()
      setScreen(newNumber)
      return newNumber
    })

    }else{
      setSecondInt((oldNumber) => {
        const newNumber = (Number(oldNumber) / 100).toString()
        setScreen(newNumber)
        return newNumber
    })
  }
}

const sign = () => {
  if (!firstNumberDone) {
    
    setFirstInt((oldNumber) => {
      const newNumber = (Number(oldNumber) * -1).toString()
      setScreen(newNumber)
      return newNumber
    })

    }else{
      setSecondInt((oldNumber) => {
        const newNumber = (Number(oldNumber) * -1).toString()
        setScreen(newNumber)
        return newNumber
    })
  }
}

const decimal = () => {
  if (!firstNumberDone) {
    if (firstInt.includes('.')) {
      return;
    }
    setFirstInt((oldNumber) => {
      const newNumber = oldNumber + "."
      setScreen(newNumber)
      return newNumber
    })

    }else{
    if (secondInt.includes('.')) {
      return;
    }
      setSecondInt((oldNumber) => {
        const newNumber = oldNumber + "."
        setScreen(newNumber)
        return newNumber
    })
  }
}

  const handleClick = (value, type) => { 
      // console.log(`Button is clicked: ${value} ${type}`);
      switch (type) {
        case "number":
        appendNumber(value, type);
          break;
        case "operator":
          switch (value) {
            case "Square Root":
              squareRoot()
              break;
            case "Percent":
              percent()
              break;
            default:
              setOperator(value)
              setFirstNumberDone(true)
              break;
          }
          break;
        case "equal":
          results()
          break;
        case "clearAll":
          clearAll()
          break;
        case "clear":
          clearInt()
          break;
        case "memorySave":
          memorySave()
          break;

        case "memoryClear":
          memoryClear()
          break;

        case "memoryRecall":
          memoryRecall()
          break;

        case "memoryPlus":
          memoryPlus()
          break;

        case "memoryMinus":
          memoryMinus()
          break;

        case "sign":
          sign()
          break;
          
        case "decimal":
          decimal()
          break;

        default:
          break;
      }
  }

  console.log(`${firstInt} ${operator} ${secondInt} ${storedInt}`)

  return (
    <>
    <div className="container">
      <div className="calculator">
        <DisplayScreen screen={screen} />
        {calculatorButtons.map((object, index) => <Button key={index} handleClick={handleClick} buttonData={object} />)}
      </div>
    </div>
    </>
  );
  
}

export default Calculator;