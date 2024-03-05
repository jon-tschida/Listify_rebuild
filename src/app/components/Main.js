"use client";
import React from "react";
import Image from "next/image";
import Meal from "./Meal";
import GroceryList from "./GroceryList";
import AddNewMeal from "./AddNewMeal";
import { deleteItem } from "../scripts/deleteItem";
import SearchRecipes from "./SearchRecipes";

export default function Main() {
  const [formInput, setFormInput] = React.useState("");
  const [listIngredients, setListIngredients] = React.useState([]);
  const [mealsList, setMealsList] = React.useState([]);
  const [searchingRecipes, setSearchingRecipes] = React.useState(false);

  const openCloseSearchRecipes = (setFunction) =>
    setFunction((prevState) => !prevState);

  return (
    <main>
      {searchingRecipes && (
        <SearchRecipes
          setSearchingRecipes={setSearchingRecipes}
          openCloseSearchRecipes={openCloseSearchRecipes}
          setMealsList={setMealsList}
        />
      )}
      <div className="flex items-center justify-around w-4/5 h-[600px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20">
        <div className="w-2/5 p-1 border border-b rounded-md h-4/5 drop-shadow-md bg-slate-100">
          <h1 className="text-center">Meals</h1>
          <hr className="w-3/5 m-auto mb-5" />
          {mealsList.map((meal, index) => (
            <div className="flex flex-row-reverse justify-around">
              <p key={index} className="flex-grow">
                {meal}
              </p>
            </div>
          ))}
          <AddNewMeal
            setFormInput={setFormInput}
            setMealsList={setMealsList}
            setListIngredients={setListIngredients}
          />
          <div
            className="absolute bottom-0 p-2 mb-2 translate-x-1/2 rounded-md cursor-pointer select-none right-1/2 bg-slate-800 text-zinc-100"
            onClick={() => openCloseSearchRecipes(setSearchingRecipes)}
          >
            Search for recipes
          </div>
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
