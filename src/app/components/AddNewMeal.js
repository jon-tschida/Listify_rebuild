"use client";
import React from "react";
import Image from "next/image";
import plusSign from "../../../public/images/plusSign.svg";
import deleteIcon from "../../../public/images/delete.svg";
import closeIcon from "../../../public/images/closeButton.svg";
import { capitalize } from "../scripts/capitalize";

export default function AddNewMeal(props) {
  const { setMealDetails } = props;
  //   State
  const [addingMeal, setAddingMeal] = React.useState({
    addingTitle: false,
    addingIngredients: false,
  });
  const [addIngredient, setAddIngredient] = React.useState("");

  const [newMealDetails, setNewMealDetails] = React.useState({
    mealTitle: "",
    mealIngredients: [],
  });

  // ---Functions---

  // Handle when the user clicks `Add Meal` button

  const handleAddMeal = () => {
    // Add the new meal details to the primary meal details, set in the main.js. The primary meal details are what we render on the site. 
    setMealDetails((prevState) => {
      return({
        titles: [...prevState.titles, newMealDetails.mealTitle],
        ingredients: [...prevState.ingredients, newMealDetails.mealIngredients]
      })
    });

    // change all our state back to defaults
    setAddingMeal({
      addingTitle: false,
      addingIngredients: false,
    });
    setNewMealDetails({
      mealTitle: "",
      mealIngredients: [],
    });
  };

  // Handling when a user deletes an ingredeint from their new meal
  const handleDeleteNewIngredients = (index) =>
    setNewMealDetails((prevState) => {
      return {
        ...prevState,
        mealIngredients: [...prevState.mealIngredients].filter(
          (_, i) => i !== index
        ),
      };
    });

  // Function to see if the user is trying to add a new meal. We use this on our plus sign button to conditionally render our ingredient form, and our close button
  const handleSetTitle = (close) => {
    setAddingMeal((prevState) => {
      return {
        ...prevState,
        addingTitle: !prevState.addingTitle,
      };
    });

    if (close) {
      setAddingMeal({
        addingTitle: false,
        addingIngredients: false,
      });
      setNewMealDetails({
        mealTitle: "",
        mealIngredients: [],
      });
    }
  };

  // Form change functions for the new meal title, and new meal ingredients
  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewMealDetails((prevFormData) => {
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
    if (addIngredient.length > 0) {
      setNewMealDetails((prevState) => {
        return {
          ...prevState,
          mealIngredients: [
            ...prevState.mealIngredients,
            capitalize(addIngredient),
          ],
        };
      });
      setAddIngredient("");
    }
  };
  return (
    <>
      <div
        className={`flex flex-row justify-center items-center w-4/5 h-12 m-auto mt-2 rounded-md bg-mealsBg text-white`}
      >
        {addingMeal.addingTitle ? (
          <>
            <form onSubmit={(event) => handleTitleSubmit(event)} autoComplete="off">
              <input
                type="text"
                name="mealTitle"
                value={newMealDetails.mealTitle}
                placeholder="Meal title"
                onChange={handleChange}
                className="text-center text-slate-900"
              ></input>
            </form>
            <Image
              alt="close button"
              priority
              src={closeIcon}
              onClick={() => handleSetTitle(true)}
              className="ml-3 cursor-pointer select-none"
            />
          </>
        ) : (
          <>
            <p
              className="m-2 cursor-pointer select-none"
              onClick={() => handleSetTitle(false)}
            >
              Add a meal
            </p>
            <Image
              priority
              src={plusSign}
              alt="add meal image"
              className="m-2 cursor-pointer select-none"
              onClick={() => handleSetTitle(false)}
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
          {newMealDetails.mealIngredients &&
            newMealDetails.mealIngredients.map((item, index) => (
              <>
                <div key={index} className="flex justify-between">
                  <p>{item}</p>
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
            className="px-2 py-1 m-auto mt-5 text-center text-white transition-all bg-green-600 rounded-md cursor-pointer select-none w-fit drop-shadow-md hover:bg-green-800"
            onClick={handleAddMeal}
          >
            Add Meal
          </div>
        </div>
      )}
    </>
  );
}
