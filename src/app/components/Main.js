"use client";
import React, { Suspense } from "react";
import ContextProvider from "./ContextProvider";

import Image from "next/image";
import Meal from "./Meal";
import GroceryList from "./GroceryList";
import AddNewMeal from "./AddNewMeal";
import { deleteItem } from "../scripts/deleteItem";
import SearchRecipes from "./SearchRecipes";
import closeButton from "../../../public/images/closeButton.svg";
import Loader from "./Loader";

export default function Main() {
  const [formInput, setFormInput] = React.useState("");

  const [listIngredients, setListIngredients] = React.useState([]);
  const [mealsList, setMealsList] = React.useState(
    /*() => {
    if (typeof window !== "undefined") {
      return !!JSON.parse(localStorage.getItem("meals"))
        ? JSON.parse(localStorage.getItem("meals"))
        : [];
    }
  }*/ []
  );
  const [searchingRecipes, setSearchingRecipes] = React.useState(false);

  const openCloseSearchRecipes = (setFunction) =>
    setFunction((prevState) => !prevState);


    // This runs on first load
    // if nothing is saved in local storage yet (users on first visit) then we create a local storage entry with a blank array
    // If the user has added meals those are saved in local storage, we use the setMealsList to set our state to what is saved in local storage.
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // If nothing is stored in local storage, then we create a blank array in local storage
      if (!!localStorage.getItem("meals") == false) {
        localStorage.setItem("meals", JSON.stringify([]));
      }
      console.log("savedMeals useEffect ran")
      let savedMeals = JSON.parse(localStorage.getItem("meals"));
      setMealsList(savedMeals);
    }
  }, []);
  return (
    <ContextProvider>
      <main>
        {searchingRecipes && (
          <SearchRecipes
            setSearchingRecipes={setSearchingRecipes}
            openCloseSearchRecipes={openCloseSearchRecipes}
            setMealsList={setMealsList}
            setListIngredients={setListIngredients}
          />
        )}
        <div className="flex tablet:flex-row items-center justify-around tablet:w-4/5 tablet:h-[600px] phone:h-[700px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 phone:flex-col phone:w-full">
          <div className="p-1 rounded-md tablet:w-2/5 h-4/5 drop-shadow-md bg-mealsAndListBg phone:w-4/5 phone:mb-2 tablet:mb-0">
            <h1>Meals</h1>
            <hr className="w-3/5 m-auto mb-5" />
            <div id="mealAndList" className="overflow-auto h-4/5">
              {/* Our mealsList state is an array of Meal components
              These Meal components are built with the add meal component, or from the searchrecipes componet*/}
              { //typeof window !== "undefined" &&
                mealsList.map((component, index) => {
                  const Component = Meal;
                  return (
                    <>
                      <div className="relative flex items-center justify-around m-auto rounded-sm w-5/5">
                        <div key={index} className="w-4/5">
                          <Component key={index} {...component.props} />
                        </div>
                        <div className="absolute top-0 right-0">
                          <Image
                            priority
                            alt="delete meal button"
                            src={closeButton}
                            className="w-[20px] cursor-pointer select-none"
                            onClick={() => deleteItem(setMealsList, index)}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              <AddNewMeal
                mealsList={mealsList}
                setFormInput={setFormInput}
                setMealsList={setMealsList}
                setListIngredients={setListIngredients}
              />
            </div>
            <div
              className="absolute bottom-0 p-2 mb-2 translate-x-1/2 rounded-md cursor-pointer select-none right-1/2 bg-mealsBg text-zinc-100"
              onClick={() => openCloseSearchRecipes(setSearchingRecipes)}
            >
              Search for recipes
            </div>
          </div>
          <div className="p-1 border border-b rounded-md tablet:w-2/5 drop-shadow-md h-4/5 bg-mealsAndListBg phone:w-4/5 phone:mt-2 tablet:mt-0">
            <h1>Grocery List</h1>
            <hr className="w-3/5 m-auto mb-5" />
            <GroceryList
              listIngredients={listIngredients}
              setListIngredients={setListIngredients}
            />
          </div>
        </div>
      </main>
    </ContextProvider>
  );
}
