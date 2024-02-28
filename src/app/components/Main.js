"use client";
import React from "react";
import Meal from "./Meal";
import GroceryList from "./GroceryList";

export default function Main() {
    const [mealsList, setMealsList] = React.useState([])
    
    const [listIngredients, setListIngredients] = React.useState([])
    
  return (
    <main>
      <div className="flex items-center justify-around w-4/5 m-auto border border-black">
        <div className="w-2/5 p-1 border border-b rounded-md h-3/5 drop-shadow-md">
          <h1 className="text-center">Meals</h1>
          <hr className="w-3/5 m-auto" />
          <Meal mealTitle={"pasta"} ingredients={["noodles","sauce"]} setListIngredients={setListIngredients}/>
        </div>
        <div className="w-2/5 p-1 border border-b rounded-md h-3/5 drop-shadow-md">
          <h1 className="text-center">Grocery List</h1>
          <hr className="w-3/5 m-auto" />
          <GroceryList listIngredients={listIngredients} setListIngredients={setListIngredients}/>
        </div>
      </div>
    </main>
  );
}
