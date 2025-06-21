import { Footer } from "../components/Footer";
import MealMenu from "../components/restaurant/MealMenu";
import NavBar from "../components/NavBar";

export const Restaurant = () => {
  return (
    <div>
      <NavBar />
      <MealMenu/>
      <Footer />
    </div>
  );
};
