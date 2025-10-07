import { useState } from 'react'
import { HashRouter as Rot,Routes,Route } from 'react-router-dom'
import Background from './componenets/back'
import Page3 from './componenets/page3'
import Page2 from './componenets/Page2'
import Page4 from './componenets/Page4'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Rot>
      <Routes>
        <Route path="/" element={<Background/>}/>
        <Route path="/page2" element={<Page2/>}/>
        <Route path="/page3" element={<Page3/>}/>
        <Route path="/page4" element={<Page4/>}/>
      </Routes>
    </Rot>
    </>
  )
}

export default App
