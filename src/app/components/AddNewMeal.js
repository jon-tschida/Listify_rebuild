"use client";
import React from "react";
import plusSign from "../../../public/images/plusSign.svg";
import Image from "next/image";
import deleteIcon from "../../../public/images/delete.svg";
import { capitalize } from "../scripts/capitalize";
import Meal from "./Meal";

export default function AddNewMeal(props) {
  const { setMealsList, setListIngredients } = props;

  //   State
  const [addingMeal, setAddingMeal] = React.useState({
    addingTitle: false,
    addingIngredients: false,
  });
  const [addIngredient, setAddIngredient] = React.useState("");
  const [mealDetails, setMealDetails] = React.useState({
    mealTitle: "",
    mealIngredients: [],
  });

  // ---Functions---

  // Handle when the user clicks `Add Meal` button

  const handleAddMeal = () => {
    // Add the users new meal to the meal list (set in Main.js)
    setMealsList((prevState) => [
      ...prevState,
      <Meal
        mealTitle={mealDetails.mealTitle}
        ingredients={mealDetails.mealIngredients}
        setListIngredients={setListIngredients}
      />,
    ]);

    // change all our state back to defaults
    setAddingMeal({
      addingTitle: false,
      addingIngredients: false,
    });
    setMealDetails({
      mealTitle: "",
      mealIngredients: [],
    });
  };

  // Handling when a user deletes an ingredeint from their new meal
  const handleDeleteNewIngredients = (index) =>
    setMealDetails((prevState) => {
      return {
        ...prevState,
        mealIngredients: [...prevState.mealIngredients].filter(
          (_, i) => i !== index
        ),
      };
    });

  // Function to see if the user is trying to add a new meal. We use this on our plus sign button to conditionally render our ingredient form
  const handleSetTitle = () => {
    setAddingMeal((prevState) => {
      return {
        ...prevState,
        addingTitle: true,
      };
    });
  };

  // Form change functions for the new meal title, and new meal ingredients
  const handleChange = (event) => {
    const { name, value } = event.target;

    setMealDetails((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleIngredientChange = (e) => {
    setAddIngredient(e.target.value);
  };

  // Submit functions
  const handleTitleSubmit = (event) => {
    event.preventDefault();

    setAddingMeal((prevState) => {
      return {
        ...prevState,
        addingIngredients: true,
      };
    });
  };

  const handleIngredientSubmit = (event) => {
    event.preventDefault();

    setMealDetails((prevState) => {
      return {
        ...prevState,
        mealIngredients: [
          ...prevState.mealIngredients,
          capitalize(addIngredient),
        ],
      };
    });
    setAddIngredient("");
  };

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
      {/* Conditionaly rendering our ingredient form  once the user set a meal title. */}
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
          {/* If the mealdetails.mealingredients has anything added to it, then we render the ingredients list */}
          {mealDetails.mealIngredients &&
            mealDetails.mealIngredients.map((item, index) => (
              <>
                <div className="flex justify-between">
                  <p key={index}>{item}</p>
                  <Image
                    priority
                    alt="delete ingredient icon"
                    src={deleteIcon}
                    className="transition-all cursor-pointer hover:-translate-x-1"
                    onClick={() => handleDeleteNewIngredients(index)}
                  />
                </div>
              </>
            ))}
          <div
            className="w-1/5 m-auto mt-5 text-center text-white transition-all bg-green-600 rounded-md cursor-pointer select-none drop-shadow-md hover:bg-green-800"
            onClick={handleAddMeal}
          >
            Add Meal
          </div>
        </div>
      )}
    </>
  );
}
