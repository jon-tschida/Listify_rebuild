import React from "react";
import Image from "next/image";
import Meal from "./Meal";

export default function FetchedRecipe(props) {
  const {
    fetchedTitle,
    fetchedIngredients,
    imageURL,
    imageHeightWidth,
    setMealsList,
    setListIngredients,
  } = props;

  const addMealToList = () => {

    // Fixing our ingredient lists by creating an array of just the ingredients
    let fixedIngredientListforProps = fetchedIngredients.map(
      (item) => item.food
    );

    // Using our fixed ingredients list from above to pass into a meal component
    setMealsList((prevState) => [
      ...prevState,
      <Meal
        ingredients={fixedIngredientListforProps}
        mealTitle={fetchedTitle}
        setListIngredients={setListIngredients}
      />,
    ]);
  };

  const testIngredientQuantity = (ingredientQuantity) => {
    if(ingredientQuantity == 0.6666666666666666 || ingredientQuantity == 0.3333333333333333) return ingredientQuantity.toFixed(2)
    else if (ingredientQuantity !== 0) return ingredientQuantity
  }
  return (
    <>
      <Image
        alt={`${fetchedTitle} image`}
        src={imageURL}
        width={imageHeightWidth}
        height={imageHeightWidth}
      />
      <div className="flex flex-col justify-around ml-5">
        <p
          className="absolute top-0 right-0 p-1 bg-green-300 rounded cursor-pointer select-none h-fit"
          onClick={addMealToList}
        >
          Add
        </p>
        <h1 className="font-bold">{fetchedTitle}</h1>
        <div className="flex flex-wrap">
          {fetchedIngredients.map((ingredient, index) => {
            return (
              <p key={index} className="mr-1">
                {" "}
                {testIngredientQuantity(ingredient.quantity)}{" "}
                {ingredient.measure !== "<unit>" && ingredient.measure}{" "}
                {ingredient.food}{" "}
                {index === fetchedIngredients.length - 1 || "•"}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
