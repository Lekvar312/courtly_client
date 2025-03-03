import Header from "./components/Header"
import { Outlet } from "react-router-dom"
function App() {

  return (
    <>
      <Header/>
      <main className="pt-16">
        <Outlet/>
      </main>
    </>
  )
}

export default App
