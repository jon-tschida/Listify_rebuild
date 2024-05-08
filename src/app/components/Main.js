"use client";
import React from "react";
import ContextProvider from "./ContextProvider";
import Image from "next/image";
import Meal from "./Meal";
import GroceryList from "./GroceryList";
import AddNewMeal from "./AddNewMeal";
import SearchRecipes from "./SearchRecipes";
import closeButton from "../../../public/images/closeButton.svg";
import HelpComponent from "./HelpComponent";
import helpIcon from "../../../public/images/question-mark.svg";

export default function Main() {
  const [openHelp, setOpenHelp] = React.useState(false);
  const [listIngredients, setListIngredients] = React.useState([]);
  const [searchingRecipes, setSearchingRecipes] = React.useState(false);
  const [mealDetails, setMealDetails] = React.useState(() => {
    return {
      titles: [],
      ingredients: [],
    };
  });
  const openCloseSearchRecipes = (setFunction) =>
    setFunction((prevState) => !prevState);

  const deleteMeal = (index) => {
    setMealDetails((prevState) => {
      return {
        titles: [...prevState.titles.filter((_, i) => i !== index)],
        ingredients: [...prevState.ingredients.filter((_, i) => i !== index)],
      };
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("list", JSON.stringify(listIngredients));
    }, 250);
  }, [listIngredients]);

  React.useEffect(() => {
    let data = JSON.parse(localStorage.getItem("list"));
    !!data && setListIngredients(JSON.parse(localStorage.getItem("list")));
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("meals", JSON.stringify(mealDetails));
    }, 250);
  }, [mealDetails]);

  React.useEffect(() => {
    let mealsData = JSON.parse(localStorage.getItem("meals"));
    if (!!mealsData && mealsData.titles.length > 0)
      setMealDetails(JSON.parse(localStorage.getItem("meals")));
  }, []);
  return (
    <ContextProvider>
      <main>
        {searchingRecipes && (
          <SearchRecipes
            setSearchingRecipes={setSearchingRecipes}
            openCloseSearchRecipes={openCloseSearchRecipes}
            setMealDetails={setMealDetails}
          />
        )}
        {openHelp && <HelpComponent setOpenHelp={setOpenHelp} />}
        <Image
          priority
          alt="help icon"
          src={helpIcon}
          className="absolute cursor-pointer top-2 left-2"
          onClick={() => setOpenHelp((prevState) => !prevState)}
        />
        <div className="flex tablet:flex-row items-center justify-around tablet:w-4/5 tablet:h-[600px] phone:h-[700px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 phone:flex-col phone:w-full">
          <div className="p-1 rounded-md tablet:w-2/5 h-4/5 drop-shadow-md bg-mealsAndListBg phone:w-4/5 phone:mb-2 tablet:mb-0">
            <h1>Meals</h1>
            <hr className="w-3/5 m-auto mb-5" />
            <div id="mealAndList" className="overflow-auto h-4/5">
              <>
                <div className="relative flex items-center justify-around m-auto rounded-sm w-5/5">
                  <div className="w-4/5">
                    {mealDetails.titles.length > 0 &&
                      mealDetails.titles.map((item, index) => {
                        return (
                          <>
                            <Image
                              alt="delete meal icon"
                              src={closeButton}
                              className="absolute right-0 transition-all cursor-pointer hover:scale-105"
                              onClick={() => deleteMeal(index)}
                            />
                            <Meal
                              mealTitle={item}
                              ingredients={mealDetails.ingredients[index]}
                              setListIngredients={setListIngredients}
                              listIngredients={listIngredients}
                            />
                          </>
                        );
                      })}
                  </div>
                </div>
              </>
              <AddNewMeal setMealDetails={setMealDetails} />
            </div>
            <div
              className="absolute bottom-0 p-2 mb-2 translate-x-1/2 rounded-md cursor-pointer select-none right-1/2 bg-mealsBg text-zinc-100 laptop:text-base sm-phone:text-sm"
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
        <p className="absolute left-0 bottom-0 right-0 ml-auto mr-auto w-[200px] text-zinc-500">
          Created by{" "}
          <a
            href="https://github.com/jon-tschida"
            target="_blank"
            rel="noreferrer"
          >
            <i>Jon Tschida</i>
          </a>
        </p>
      </main>
    </ContextProvider>
  );
}
