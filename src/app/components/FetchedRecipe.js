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
    fetchedRecipeSource,
    fetchedRecipeUrl,
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
        fetchedRecipeSource={fetchedRecipeSource}
        fetchedRecipeUrl={fetchedRecipeUrl}
      />,
    ]);
  };

  // Some response for quantities looked funny - 0 salt, 0 pepper should just show salt and pepper - or 0.333333333 cups should just be 0.33 cups
  // We use this function to fix those
  const testIngredientQuantity = (ingredientQuantity) => {
    if (
      ingredientQuantity == 0.6666666666666666 ||
      ingredientQuantity == 0.3333333333333333
    )
      return ingredientQuantity.toFixed(2);
    else if (ingredientQuantity !== 0) return ingredientQuantity;
  };
  return (
    <>
      <Image
        alt={`${fetchedTitle} image`}
        src={imageURL}
        width={imageHeightWidth}
        height={imageHeightWidth}
        className="flex-2"
      />
      <div className="flex flex-col justify-around flex-1 ml-5 text-sm">
        <p
          className="absolute top-0 right-0 px-3 py-2 text-white transition-all rounded cursor-pointer select-none bg-searchBtnBlue h-fit hover:bg-blue-800"
          onClick={addMealToList}
        >
          Add
        </p>
        <div className="flex flex-col">
          <h1 className="mr-1 font-bold">{fetchedTitle}</h1>
          <a
            href={fetchedRecipeUrl}
            rel="noreferrer"
            target="_blank"
            className="p-1 underline text-searchBtnBlue w-fit"
          >
            {fetchedRecipeSource}
          </a>
        </div>
        <div className="flex flex-wrap overflow-auto max-h-4/5 w-5/5">
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
