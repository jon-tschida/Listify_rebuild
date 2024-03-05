import React from "react";
import Image from "next/image";

export default function FetchedRecipe(props) {
  // Grabbing two things in props, the recipe title, and recipe ingredeints.
  //
  const { fetchedTitle, fetchedIngredients, imageURL, imageHeightWidth } =
    props;
  return (
    <>
      <Image
        alt={`${fetchedTitle} image`}
        src={imageURL}
        width={imageHeightWidth}
        height={imageHeightWidth}
      />
      <div className="flex flex-col justify-around ml-5">
      <p className="absolute top-0 right-0 p-1 bg-green-300 rounded cursor-pointer select-none h-fit">Add</p>
        <h1 className="font-bold">{fetchedTitle}</h1>
        <div className="flex flex-wrap">
          {fetchedIngredients.map((ingredient, index) => {
            return (
              <p key={index} className="mr-1"> 
                  {" "}{ingredient.quantity !== 0 && ingredient.quantity}{" "}
                  {ingredient.measure !== "<unit>" && ingredient.measure}{" "}
                  {ingredient.food} {index === fetchedIngredients.length - 1 || "•"}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
