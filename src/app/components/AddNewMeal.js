"use client";
import React from "react";
import plusSign from "../../../public/images/plusSign.svg";
import Image from "next/image";

export default function AddNewMeal(props) {
  const { setMealsList } = props;

//   State
  const [addingMeal, setAddingMeal] = React.useState({
    addingTitle: false,
    addingIngredients: false
  });
  
  const [mealDetails, setMealDetails] = React.useState({
    mealTitle: "",
    mealIngredients: [],
  })


  const handleChange = (event) => {
    const { name, value } = event.target;

    setMealDetails((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleTitle = () => {
    setAddingMeal(prevState => {
        return{
            ...prevState,
            addingTitle: true
        }
    }) 
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    setAddingMeal(prevState=>{
        return{
            ...prevState,
            addingIngredients: true
        }
    })
  }

  return (
    <div
      className={`flex flex-row justify-center items-center w-4/5 h-10 m-auto mt-2 bg-slate-400`}
    >
      {addingMeal.addingTitle ? (
        <form onSubmit={(event)=> handleSubmit(event)}>
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
            onClick={handleTitle}
          />
        </>
      )}
      {addingMeal.addingIngredients && <h2>TEST</h2>}
    </div>
  );
}
