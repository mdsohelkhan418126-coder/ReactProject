import { useState } from "react"
import { MyButton } from "./Mybutton"


export const Displayevent = () => {
  const[count,setCount]=useState(0)
  const handleClick = () => {
  const all=setCount(count+1)
  console.log(all);
  
  }
  return (
    <div>
    
    <MyButton onClick={handleClick} count={count} ></MyButton>
    <MyButton onClick={handleClick} count={count} ></MyButton>
    </div>
  )
}
