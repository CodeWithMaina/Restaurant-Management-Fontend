import { Footer } from "../components/Footer";
import MealMenu from "../components/meals/MealMenu";
import NavBar from "../components/NavBar";

export const Meal = () => {
  return (
    <div>
      <NavBar />
      <MealMenu/>
      <Footer />
    </div>
  );
};
