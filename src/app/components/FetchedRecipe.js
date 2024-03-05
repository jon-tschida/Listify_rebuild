import React from "react";

export default function FetchedRecipe(props) {
  // Grabbing two things in props, the recipe title, and recipe ingredeints.
  //
  const { fetchedTitle, fetchedIngredients } = props;
  // console.log(fetchedIngredients)
  return (
    <>
      <h1 className="font-bold text-center">{fetchedTitle}</h1>
      <ul className="text-center"> 
        {fetchedIngredients.map((ingredient, index) => {
          return (
            <li key={index}>
              {ingredient.quantity} {ingredient.measure} {ingredient.food}
            </li>
          );
        })}
      </ul>
    </>
  );
}
