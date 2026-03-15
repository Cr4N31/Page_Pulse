import Header from "./components/Layout/Header"
import Home from "./components/home/Home"
import Footer from "./components/Layout/Footer"
function App () {
  return (
    <div className="bg-white text-white h-screen w-screen flex flex-col">
      <Header />
      <Home/>
      <Footer />
    </div>
  )
}

export default App