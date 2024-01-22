import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color , setColor] = useState("orange")

  return (
    <div className="h-screen w-full" style={{backgroundColor: color}} >
        <div className="flex flex-wrap fixed inset-x-0 bottom-0 border-slate-200 p-5 rounded-xl">
            <button className="rounded-full p-3 text-white border mx-4"
             onClick={() => setColor("red")}>
              red
            </button>
            <button className="rounded-full p-3 text-white border mx-4"
            onClick={() => setColor("yellow")}>
              yellow
            </button>
            <button className="rounded-full p-3 text-white border mx-4"
            onClick={() => setColor("green")}>
              green
              </button>
        </div>
    </div>
  )
}

export default App
