"use client";
import React from "react";
import Image from "next/image";
import downArrow from "../../../public/images/downArrow.svg";
import plusSign from "../../../public/images/plusSign.svg";

export default function Meal(props) {
  const {
    mealTitle,
    ingredients,
    setListIngredients,
    fetchedRecipeUrl,
    fetchedRecipeSource,
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  const addToIngredeintsList = (setterFunction, newIngredients) =>{
    setterFunction(prevState=>[...prevState, ...newIngredients.filter((el, index) => prevState[index] !== el) ])
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between w-4/5 h-10 m-auto bg-slate-400">
        <div className="flex justify-around w-3/5 text-center">
          <Image
            priority
            src={plusSign}
            alt="plus sign"
            className="cursor-pointer select-none"
            onClick={() => addToIngredeintsList(setListIngredients, ingredients)
              // setListIngredients((prevState) => [...prevState, ...ingredients])
            }
          />
          <h1
            className="cursor-pointer select-none"
            onClick={() => setExpanded((prevState) => !prevState)}
          >
            {mealTitle}
          </h1>
        </div>
        <div className="flex flex-row-reverse justify-around w-2/5 pr-5 ">
          <Image
            priority
            src={downArrow}
            alt="down arrow"
            className={`transition-all cursor-pointer select-none ${
              expanded || "hover:translate-y-0.5"
            } ${expanded && "rotate-180 hover:-translate-y-0.5"}`}
            onClick={() => setExpanded((prevState) => !prevState)}
          />
        </div>
      </div>
      {expanded && (
        <>
          <ul className="w-4/5 p-2 pl-5 m-auto bg-slate-300">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex justify-between">
                {ingredient}
              </li>
            ))}
            {/* 
            If a recipe URL prop was passed to the component (as it is when adding a meal from there recipe search)
            then we display a link to the recipe so the user can follow the steps
            */}
            <div className="text-center">{!!fetchedRecipeUrl && <a href={fetchedRecipeUrl} rel="noreferrer" target="_blank" className="text-blue-500 underline ">{fetchedRecipeSource}</a>}</div>
          </ul>
        </>
      )}
    </div>
  );
}
