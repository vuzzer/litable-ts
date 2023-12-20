import './App.css'
import "./src/presentation/styles/pages/common.css"
import Header from './src/presentation/components/Header'
import { Route, Routes } from 'react-router-dom'
import { home, newLitable, updateOneLitable } from './src/core/route'
import LitablePage from './src/presentation/pages/LitablePage'
import AddLitablePage from './src/presentation/pages/AddLitablePage'
import UpdateLitablePage from './src/presentation/pages/UpdateLitablePage'

function App() {

   return (
    <>
      <Header/>
        <Routes>
          <Route  path={home} element={ <LitablePage/>} />
          <Route  path={newLitable} element={<AddLitablePage/>} />
          <Route  path={updateOneLitable} element={<UpdateLitablePage/>} />
        </Routes>
    </>
  )
}

export default App
