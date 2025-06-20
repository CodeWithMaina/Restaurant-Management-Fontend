import { Footer } from "../components/Footer"
import Hero from "../components/home/Hero"
import NavBar from "../components/NavBar"
import CulinaryServices  from "../components/home/Services"

export const Home = () => {
  return (
    <div>
        <NavBar/>
        <Hero/>
        <CulinaryServices/>
        <Footer/>
    </div>
  )
}
