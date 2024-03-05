import React from "react";
import Image from "next/image";

export default function FetchedRecipe(props) {
  // Grabbing two things in props, the recipe title, and recipe ingredeints.
  //
  const { fetchedTitle, fetchedIngredients, imageURL, imageHeightWidth } = props;
  // console.log(fetchedIngredients)
  return (
    <>
      <h1 className="font-bold text-center">{fetchedTitle}</h1>
      <Image alt={`${fetchedTitle} image`} src={imageURL} width={imageHeightWidth} height={imageHeightWidth}/>
      <ul className="text-center"> 
        {fetchedIngredients.map((ingredient, index) => {
          return (
            <li key={index}>
              {ingredient.quantity !== 0 && ingredient.quantity} {ingredient.measure !== "<unit>" && ingredient.measure} {ingredient.food}
            </li>
          );
        })}
      </ul>
    </>
  );
}
