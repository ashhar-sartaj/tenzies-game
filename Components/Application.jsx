import { nanoid } from "nanoid"
import React, { useEffect, useState } from "react"
import DiceComponent from "./DiceComponent"


const Application = () => {
    //Generate an array of 10 random numbers.
    const [startGame, setStartGame] = useState(false)
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(5)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [score, setScore] = useState(0)

    console.log(dice)
    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die=> die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    console.log(dice)
    // function to generate a new object that will contain the random number of dice
    function generateNewDie() {
        return {
            value: Math.floor( Math.random() * 6) + 1 ,
            isHeld: false,
            id: nanoid(), 
            score: 0
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0 ; i < 10; i++) {
            newDice.push(
                generateNewDie()
            )
        }
        return newDice
    }
    

    const rollDice = () => {
        if (!tenzies) { //we only want to oll dice if tenzies if false.
            //this function will generate new die that will be objects. But we will roll only those dice whose isHeld property if false else the dice will remian the same...
                setDice(oldDice => oldDice.map(eachDie => {
                return eachDie.isHeld ? eachDie : generateNewDie()
                }))
        //oldDice is the array of objects that contains eachDie. eachDie is the object itself.
        //above we have move through the old dice array, and the eachDice object that contains the eachDie.isHeld property as false, we generate the random number for it using generateNewDie(). 
            console.log("you clicked me!")
        } else { //if they have won the game. If someone had already won the game, tenzies will be set to true and for a new game we will again set tenzies to false and roll the entire array of dice again. 
            setTenzies(false)
            setDice(allNewDice())
        }
        
    }

    const handleStartGame = () => {
        setStartGame(true)
        setTimeRemaining(5)
        setIsTimeRunning(true)
    }
    const endGame = () => {
        setIsTimeRunning(false)
    }
    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
          setTimeout(() => {
            setTimeRemaining(prevTime => prevTime - 1)
          }, 1000)
        } else if (timeRemaining <= 0) {
          endGame()
        }
      }, [timeRemaining, isTimeRunning])
    //generating a function.

    const holdDice = (id) => {
        // console.log(id)
        setDice(oldDice => oldDice.map(eachDie => {
            return eachDie.id === id ? {...eachDie, isHeld: !eachDie.isHeld} : eachDie
        }))
        // setScore(oldDice => oldDice.map( eachDie => {
        //     return eachDie.id === id ? {...eachDie, score: setScore(prevScore => prevScore + 1)} : eachDie
        // }))
        //Above what we have done is that... we have set the whole new dice array by setDice() where oldDice is the old array of objects as a particular dice. Thus, eachDie is particular object. 
    }
    // const addScore = (id) => {
    //     setDice(oldDice => oldDice.map(eachDie => {
    //         return eachDie.id === id ? {...eachDie, score: eachDie.isHeld ? setScore(prevScore => prevScore+1): eachDie} : eachDie
    //     }))
        
    // }

    const randomDice = dice.map((el, index) => (
        <DiceComponent number={el.value} key={el.id} isHeld={el.isHeld} holdDice={() => holdDice(el.id)} />
        
    ))

    return (
        <>
        <div className="container">
            <div className="game-container">
                <div className="dice-components">
                {randomDice}
                </div>

                <div>
                    <button type="button" className="button" onClick={rollDice} >{tenzies ? "New Game" : "Roll"}</button>
                    <button type="button" className="button" onClick = {handleStartGame} style={{display: startGame? "none": "block"}}>Start Game</button>
                </div>

                
                <div className="instructions">
                    **Roll until all the dice are the same. Click each die to freeze it at it's current value between rolls. 
                </div>
            </div>
            
        </div>
        </>
    )
}
export default Application