"use client";
import React from "react";
import Image from "next/image";
import Meal from "./Meal";
import GroceryList from "./GroceryList";
import AddNewMeal from "./AddNewMeal";
import { deleteItem } from "../scripts/deleteItem";
import SearchRecipes from "./SearchRecipes";
import closeButton from "../../../public/images/closeButton.svg";

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
          setListIngredients={setListIngredients}
        />
      )}
      <div className="flex items-center justify-around w-4/5 h-[600px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20">
        <div className="w-2/5 p-1 rounded-md h-4/5 drop-shadow-md bg-slate-100">
          <h1 className="text-center">Meals</h1>
          <hr className="w-3/5 m-auto mb-5" />
          <div id="mealAndList" className="overflow-auto h-4/5">
            {mealsList.map((meal, index) => (
              <>
                <div className="relative flex items-center justify-around m-auto rounded-sm w-5/5">
                  <div key={index} className="w-4/5">
                    {meal}
                  </div>
                <div className="absolute top-0 right-0">
                  <Image
                    priority
                    src={closeButton}
                    className="w-[20px] cursor-pointer select-none"
                    onClick={() => deleteItem(setMealsList, index)}
                  />
                </div>
                </div>
              </>
            ))}
            <AddNewMeal
              setFormInput={setFormInput}
              setMealsList={setMealsList}
              setListIngredients={setListIngredients}
            />
          </div>
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
