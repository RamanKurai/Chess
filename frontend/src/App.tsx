import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Game from "./pages/Game"

const App = () => {
  return (
    <>
    <div className="h-screen bg-[#302e2b]">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/game" element={<Game/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
