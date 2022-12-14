import React, { useState, useEffect } from 'react'
import Dice from './components/Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Footer from './components/Footer'

function App() {
  const [allDice, setAllDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [isDots, setIsDots] = useState(false)
  const [currentScore, setCurrentScore] = useState(0);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function increaseScore() {
    if (!tenzies) {
      setCurrentScore((oldScore) => oldScore + 1);
    } else {
      setCurrentScore((oldScore) => 0);
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    }
    return newDice
  }

  const diceElements = allDice.map(
    dice => <Dice
      value={dice.value}
      key={dice.id}
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)} isDots={isDots} />)

  function rollDice() {
    if (!tenzies) {
      setAllDice(oldDice => oldDice.map(dice => {
        return dice.isHeld ?
          dice :
          generateNewDice()
      }))
      increaseScore();
    } else {
      setTenzies(false)
      increaseScore();
      setAllDice(allNewDice())
    }

  }

  function holdDice(id) {
    setAllDice(oldDice => oldDice.map(dice => {
      return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
    }))
  }

  useEffect(() => {
    const allHeld = allDice.every(dice => dice.isHeld)
    const firstValue = allDice[0].value
    const allSameValue = allDice.every(dice => dice.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [allDice])

  function diceLookChange() {
    setIsDots(prevLook => !prevLook)
    console.log(isDots)
  }

  return (
    <div className="App">
      {tenzies && <Confetti />}
      <main>
        <div className='app-top'>
          <div className='score'>
            <p><span>Score:</span> {currentScore}</p>
          </div>
          <div className='isdots-input'>
            <img alt='dice-face' src='./images/dice-6.png' />
            <input
              type="checkbox"
              id="isDots"
              checked={isDots}
              onChange={diceLookChange}
            />
          </div>
        </div>

        <div className='app-about'>
          <h1>Tenzies</h1>
          {tenzies ?
            <p>Congratulations, you won! Click "New game button" or refresh the page to play again.</p>
            :
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          }
        </div>
        <div className='app-bottom'>
          <div className='dices-section'>
            {diceElements}
          </div>
        </div>
        <button className='roll-btn' onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
      </main>
      <Footer />
    </div>
  );
}

export default App;
