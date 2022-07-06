import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        "https://react-http-6ae41-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Request Failed");
      }

      const data = await response.json();
      if (!data) {
        throw new Error();
      }

      const loadMeals = [];

      for (const meal in data) {
        loadMeals.push(data[meal]);
      }
      setMeals(loadMeals);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message || "Something went wrong!");
      setError(error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content = !error && isLoading ? <p>Loading Meals...</p> : mealsList;
  if (error) {
    content = <p>Error Loading Meals</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
