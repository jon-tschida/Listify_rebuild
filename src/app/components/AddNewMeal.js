"use client";
import React from "react";
import plusSign from "../../../public/images/plusSign.svg";
import Image from "next/image";
import { capitalize } from "../scripts/capitalize";

export default function AddNewMeal(props) {
  const { setMealsList } = props;

  //   State
  const [addingMeal, setAddingMeal] = React.useState({
    addingTitle: false,
    addingIngredients: false,
  });

  const [addIngredient, setAddIngredient] = React.useState("")

  const [mealDetails, setMealDetails] = React.useState({
    mealTitle: "",
    mealIngredients: [""],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setMealDetails((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleIngredientChange = (e) =>{
    setAddIngredient(e.target.value)
  }

  const handleSetTitle = () => {
    setAddingMeal((prevState) => {
      return {
        ...prevState,
        addingTitle: true,
      };
    });
  };

  const handleTitleSubmit = (event) => {
    event.preventDefault();

    setAddingMeal((prevState) => {
      return {
        ...prevState,
        addingIngredients: true,
      };
    });
  };

  const handleIngredientSubmit = (event) =>{
    event.preventDefault()

    setMealDetails(prevState => {
        return{
            ...prevState,
            mealIngredients: [...prevState.mealIngredients, capitalize(addIngredient)]
        }
    })
    setAddIngredient("")
  }
  return (
    <>
      <div
        className={`flex flex-row justify-center items-center w-4/5 h-10 m-auto mt-2 bg-slate-400`}
      >
        {addingMeal.addingTitle ? (
          <form onSubmit={(event) => handleTitleSubmit(event)}>
            <input
              type="text"
              name="mealTitle"
              value={mealDetails.mealTitle}
              placeholder="Meal title"
              onChange={handleChange}
              className="text-center"
            ></input>
          </form>
        ) : (
          <>
            <h1 className="m-2">Add a meal</h1>
            <Image
              priority
              src={plusSign}
              alt="add meal image"
              className="m-2 cursor-pointer select-none"
              onClick={handleSetTitle}
            />
          </>
        )}
      </div>
      {addingMeal.addingIngredients && (
        <div className="w-4/5 p-2 pl-5 m-auto bg-slate-300">
          <form onSubmit={handleIngredientSubmit}>
            <input
              type="text"
              placeholder="Add meal ingredient"
              value={addIngredient}
              onChange={handleIngredientChange}
              className="text-center"
            ></input>
          </form>
          {mealDetails.mealIngredients && mealDetails.mealIngredients.map(item => <p>{item}</p>)}
        </div>
      )}
    </>
  );
}
