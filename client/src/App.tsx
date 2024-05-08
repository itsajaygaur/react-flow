import { Route, Routes } from 'react-router-dom'
import './App.css'
import ReactFlowPage from './pages/ReactFlow'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoutes from './hoc/PrivateRoutes'
import AuthRoutes from './hoc/AuthRoutes'

export default function App(){



  return(

      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path='/' element={<ReactFlowPage />} />
        </Route>

        <Route element={<AuthRoutes /> } >
          <Route path='/login' element={<Login />} />
        </Route>

        <Route path='/register' element={<Register />} />
      </Routes>

  )
}