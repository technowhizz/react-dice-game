import React from "react"
import Dice from "./components/Dice"
import Confetti from 'react-confetti'


export default function App(){

    const [diceNums, setDiceNums] = React.useState(RandomNumbers())
    const [won, setWon] = React.useState(false)

    React.useEffect(()=>{
        const allHeld = diceNums.every(dice => dice.isHeld)
        const allSame = diceNums.every(dice => dice.value == diceNums[0].value)
        if (allHeld && allSame){
            setWon(true)
        }
    }, [diceNums])

    function RandomNumbers(){

        const diceNumbers = []

        for (let i =0 ; i < 10 ; i++){
            diceNumbers.push({
                id: i,
                value: Math.floor(Math.random()*6+1),
                isHeld: false
            })
        }
        
        return diceNumbers
    
    }
    
    function updateDice(){
        if (won){
            setWon(false)
        }
        setDiceNums(oldValues => {
            const newNumbers =[]
            const newNums = RandomNumbers()
            for (let i = 0; i < 10; i++){
                if (oldValues[i].isHeld && !won){
                    newNumbers.push(oldValues[i])
                }else{
                    newNumbers.push(newNums[i])
                }
            }
            return newNumbers
        })
    }

    function holdDie(id){
        setDiceNums(oldValues => {
            let newValues = []
            for (let i = 0; i < 10; i++){
                if (oldValues[i].id === id){
                    newValues.push({
                        id: id,
                        value: oldValues[i].value,
                        isHeld: !oldValues[i].isHeld
                    })
                }else{
                    newValues.push(oldValues[i])
                }
            }
            return newValues
        })

    }

    const dice = diceNums.map(x => (

        <Dice 
            value={x.value} 
            state={x.isHeld ? "dice-held" : ""}
            key={x.id}
            id={x.id}
            hold={holdDie}
        />
    
    ))

    return(
        <main className="app">
            {won && <Confetti />}
            <div className="app--background">
                <h1 className="app--title">Ten in a row!</h1>
                <p className="app--desc">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="app--dice-container">
                   {dice}
                </div>
                <button className="app--button-roll" onClick={updateDice}>{won? "Reset" : "Roll"}</button>
            </div>
        </main>
    )
}