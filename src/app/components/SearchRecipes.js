"use client";
import React from "react";
import closeIcon from "../../../public/images/closeButton.svg";
import Image from "next/image";
import axios from "axios";
import FetchedRecipe from "./FetchedRecipe";
let testData = require("../scripts/response.json");

// https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=c0d5554f&app_key=4bea9282ec264827a857e5af4390d2ea&imageSize=THUMBNAIL&field=label&field=ingredients
const apiUrl =
  "https://api.edamam.com/api/recipes/v2?type=public&beta=false&q=chicken&app_id=c0d5554f&app_key=4bea9282ec264827a857e5af4390d2ea&imageSize=THUMBNAIL&field=label&field=ingredients";

export default function SearchRecipes(props) {
  const { openCloseSearchRecipes, setSearchingRecipes } = props;

  // API request state
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  // end API request state
  const [recipeComponents, setRecipeComponents] = React.useState([]);

  /*
  const fetchRecipes = (apiUrl) => {
    setLoading(true)
    // Make the GET request using Axios
    axios.get(apiUrl)
      .then(response => {
        // Handle the response data
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        // Handle errors
        setError(error);
        setLoading(false);
      });
  };

  React.useEffect(()=>{
    console.log(data)
  }, [data])
 */

  const displayTestData = (dummyData) => {
    dummyData.hits.map((recipeEntry) =>
      setRecipeComponents((prevState) => [
        ...prevState,
        <FetchedRecipe
          fetchedTitle={recipeEntry.recipe.label}
          fetchedIngredients={recipeEntry.recipe.ingredients}
          imageURL={recipeEntry.recipe.images.THUMBNAIL.url}
          imageHeightWidth={recipeEntry.recipe.images.THUMBNAIL.width}
        />,
      ])
    );
  };

  return (
    <div className="w-screen h-screen bg-white/30 backdrop-blur-sm">
      <div className="absolute flex flex-col w-3/5 -translate-x-1/2 -translate-y-1/2 bg-white border border-black rounded-lg drop-shadow-lg h-3/5 left-1/2 top-1/2">
        <Image
          priority
          alt="close"
          src={closeIcon}
          className="absolute cursor-pointer select-none top-2 right-2"
          onClick={() => openCloseSearchRecipes(setSearchingRecipes)}
        />
        <p
          className="p-2 rounded-md cursor-pointer select-none bg-slate-300 w-fit"
          onClick={() => displayTestData(testData)}
        >
          Search
        </p>
        {loading && <p>Loading recipes</p>}
        <div className="flex flex-col max-h-full overflow-scroll border border-black">
          {recipeComponents.map((recipeComponent, index) => (
            <div
              key={index}
              className="flex flex-col p-2 m-2 border border-black w-fit"
            >
              {recipeComponent}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
