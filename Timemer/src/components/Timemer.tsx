// import { useEffect, useState } from "react"


// export const Timemer = () => {
//   const [count, setCount] = useState(0)
//   const [isRunning, setIsRunning] = useState(false)
//   useEffect(() => {
//     let timer: ReturnType<typeof setInterval> | undefined
//     if (isRunning) {
//       timer = setInterval(()=> {
//         setCount((prve)=>prve+1)
//       },1000)
//     }
//     return ()=> clearInterval(timer)
//   }, [isRunning])
  
//   return (
//     <div className=" bg-gray-100 py-28  mt-8 flex justify-center items-center">
      
//       <div className="">
//       <h2 className=" text-2xl font-bold text-center mb-6">Timemer:{count}s</h2>
      
//         <div className=" flex space-x-4">
//         <button onClick={() => setIsRunning(true)} className=" px-6 py-2 bg-green-500 rounded-md shadow-2xl text-white hover:bg-green-600 cursor-pointer">Start</button>
//         <button onClick={() => setIsRunning(false)} className=" px-6 py-2 bg-red-500 rounded-md shadow-2xl text-white hover:bg-red-600 cursor-pointer">Stop</button>
//         <button onClick={() => setCount(0)} className=" px-6 py-2 bg-blue-500 rounded-md shadow-2xl text-white hover:bg-blue-600 cursor-pointer">Reset</button>
        
//         </div>
      
//       </div>
      
//     </div>
//   )
// }
