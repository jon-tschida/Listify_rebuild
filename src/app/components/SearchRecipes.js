"use client";
import React from "react";
import closeIcon from "../../../public/images/closeButton.svg";
import Image from "next/image";
import axios from "axios";
import FetchedRecipe from "./FetchedRecipe";
import Meal from "./Meal";
import Loader from "./Loader";
let testData = require("../scripts/response.json");

// https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=c0d5554f&app_key=4bea9282ec264827a857e5af4390d2ea&imageSize=THUMBNAIL&field=label&field=ingredients
const apiUrl =
  "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=c0d5554f&app_key=4bea9282ec264827a857e5af4390d2ea&imageSize=SMALL&field=label&field=image&field=images&field=ingredientLines&field=ingredients";

export default function SearchRecipes(props) {
  const {
    openCloseSearchRecipes,
    setSearchingRecipes,
    setMealsList,
    setListIngredients,
  } = props;

  // API request state
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  // end API request state
  const [recipeComponents, setRecipeComponents] = React.useState([]);

  const fetchRecipes = (apiUrl) => {
    setLoading(true);
    // Make the GET request using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response data
        setData(response.data);
      })
      .catch((error) => {
        // Handle errors
        setError(error);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    setLoading(false)
    if (data) {
      data.hits.map((recipeEntry) =>
        setRecipeComponents((prevState) => [
          ...prevState,
          <FetchedRecipe
            fetchedTitle={recipeEntry.recipe.label}
            fetchedIngredients={recipeEntry.recipe.ingredients}
            imageURL={recipeEntry.recipe.images.SMALL.url}
            imageHeightWidth={recipeEntry.recipe.images.SMALL.width}
            setMealsList={setMealsList}
            setListIngredients={setListIngredients}
          />,
        ])
      );
    }
  }, [data]);

  // const displayData = (dummyData) => {
  //   dummyData.hits.map((recipeEntry) =>
  //     setRecipeComponents((prevState) => [
  //       ...prevState,
  //       <FetchedRecipe
  //         fetchedTitle={recipeEntry.recipe.label}
  //         fetchedIngredients={recipeEntry.recipe.ingredients}
  //         imageURL={recipeEntry.recipe.images.SMALL.url}
  //         imageHeightWidth={recipeEntry.recipe.images.SMALL.width}
  //         setMealsList={setMealsList}
  //         setListIngredients={setListIngredients}
  //       />,
  //     ])
  //   );
  // };

  return (
    <div className="w-screen h-screen bg-white/30 backdrop-blur-sm">
      <div className="absolute flex flex-col w-3/5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg drop-shadow-lg h-3/5 left-1/2 top-1/2">
        <Image
          priority
          alt="close"
          src={closeIcon}
          className="absolute cursor-pointer select-none top-2 right-2"
          onClick={() => openCloseSearchRecipes(setSearchingRecipes)}
        />
        <p
          className="p-2 rounded-md cursor-pointer select-none bg-slate-300 w-fit"
          onClick={() => fetchRecipes(apiUrl)}
        >
          Search
        </p>
        {loading && <> <p>Loading recipes..</p> <Loader /> </>}
        <div className="flex flex-col items-center max-h-full overflow-scroll">
          {recipeComponents.map((recipeComponent, index) => (
            <div
              key={index}
              className="flex w-3/5 p-2 m-2 rounded-md bg-stone-100 drop-shadow-lg"
            >
              {recipeComponent}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
