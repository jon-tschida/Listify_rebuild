"use client";
import React from "react";
import plusSign from "../../../public/images/plusSign.svg";
import Image from "next/image";

export default function AddNewMeal(props) {
  const { setFormInput, setMealsList } = props;
  const [addingMeal, setAddingMeal] = React.useState(false);
  const handleInput = (event) => {
    setFormInput(event.target.value.toLowerCase());
  };

  return (
    <div
      className={`flex flex-row justify-center items-center w-4/5 h-10 m-auto mt-2 bg-slate-400`}
    >
      <Image
        priority
        src={plusSign}
        alt="add meal image"
        className="m-2 cursor-pointer select-none"
      />
      <h1 className="m-2">Add a meal</h1>
      {addingMeal && (
        <form>
          <input
            type="text"
            placeholder="add new meal"
            onChange={handleInput}
            className="text-center"
          ></input>
        </form>
      )}
    </div>
  );
}
