import { Route, Routes } from "react-router-dom"
import CommonRouter from "./Router/CommonRouter"
import UserRouter from "./Router/UserRouter"

function App() {
  return (
    <Routes>
      <Route path="/register/*" element={<CommonRouter/>}></Route>
      <Route path="/*" element={<UserRouter/>}></Route>
    </Routes>
  )
}

export default App