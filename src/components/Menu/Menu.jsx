import { useEffect, useState } from "react";
import Card from "../Card/Card";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function getMenu() {
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.log("error");
      }
    }

    getMenu();
  }, []);

  return (
    <div id="meals">
      {menu.map((meal) => (
        <Card key={meal.id} meal={meal} />
      ))}
    </div>
  );
};

export default Menu;
