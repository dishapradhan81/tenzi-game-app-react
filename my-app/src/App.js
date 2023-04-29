import {useState, useEffect} from "react";
import './App.css';
import './Styles/Style.css';
import Die from "./Components/Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

function App() {

  const [dice, setDice] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)  //it represent whether the user has won yet or not

  //runs everytime the dice state array changes
  //we are using Effect here becoz we need to keep the 2 states in sync
  useEffect(() => {
    //console.log("Dice state changed")
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You won")
    }

  }, [dice])



 
  //get an array of 10 random numbers with value from 1 to 6
  function allNewDice(){
    const newDice = []
    for(let i=0 ; i<10 ; i++){
      // newDice.push(Math.ceil(Math.random() * 6))
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
        })
    }
    return newDice

  }
  //console.log(allNewDice())


  function rollDice(){
    //setDice(allNewDice())
    if(!tenzies){
    //not just call all new dice, but instead look through the existing dice and not roll any die that are being held or "green box"
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {value: Math.ceil(Math.random() * 6),  isHeld: false,  id: nanoid()}
    }))
  }else{
    setTenzies(false)
    setDice(allNewDice())
  }

  }

  function holdDice(id){
    //console.log(id)
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))

  }

  //get the randomly generated die elements and render those in place of our manually-written 10 die elements
  // const diceElements = dice.map(die => <Die value={die} />)
  const diceElements = dice.map(die => <Die key={die.id} 
                                          value={die.value}
                                          isHeld={die.isHeld}
                                          holdDice={() => holdDice(die.id)} />)


  



  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll ultil all the dice are the same .Click each die to freeze it at its current 
      value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      {/* <Die value="1"/>
      <Die value="2"/>
      <Die value="3"/>
      <Die value="6"/>
      <Die value="5"/>
      <Die value="2"/>
      <Die value="1"/>
      <Die value="6"/>
      <Die value="4"/>
      <Die value="3"/> */}
      </div>
      <button onClick={rollDice} className="roll-dice-btn">{tenzies ? "New Game" : "Roll"}</button>
      

    </main>
  );
}

export default App;
