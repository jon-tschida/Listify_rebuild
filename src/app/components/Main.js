"use client";
import React from "react";
import Meal from "./Meal";
import GroceryList from "./GroceryList";
import AddNewMeal from "./AddNewMeal";

export default function Main() {
  const [formInput, setFormInput] = React.useState("");
  const [listIngredients, setListIngredients] = React.useState([]);
  const [mealsList, setMealsList] = React.useState([
    <Meal
      mealTitle={"pasta"}
      ingredients={["noodles", "sauce"]}
      setListIngredients={setListIngredients}
    />,
  ]);
  return (
    <main>
      <div className="flex items-center justify-around w-4/5 h-[600px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-2/5 p-1 border border-b rounded-md h-4/5 drop-shadow-md bg-slate-100">
          <h1 className="text-center">Meals</h1>
          <hr className="w-3/5 m-auto mb-5" />
          {mealsList}
          <AddNewMeal setFormInput={setFormInput} setMealsList={setMealsList} />
        </div>
        <div className="w-2/5 p-1 border border-b rounded-md drop-shadow-md h-4/5 bg-slate-100">
          <h1 className="text-center">Grocery List</h1>
          <hr className="w-3/5 m-auto mb-5" />
          <GroceryList
            listIngredients={listIngredients}
            setListIngredients={setListIngredients}
          />
        </div>
      </div>
    </main>
  );
}
