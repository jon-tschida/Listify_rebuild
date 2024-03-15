"use client";
import React from "react";
import closeIcon from "../../../public/images/closeButton.svg";
import Image from "next/image";
import axios from "axios";
import FetchedRecipe from "./FetchedRecipe";
import Meal from "./Meal";
import Loader from "./Loader";
import SearchForm from "./SearchForm";

// https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=c0d5554f&app_key=4bea9282ec264827a857e5af4390d2ea&imageSize=SMALL&field=label&field=image&field=images&field=ingredientLines&field=ingredients;
// const apiUrl =
//   "https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=c0d5554f&app_key=4bea9282ec264827a857e5af4390d2ea&imageSize=SMALL&field=label&field=image&field=images&field=ingredientLines&field=ingredients";

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
  const [formData, setFormData] = React.useState("");
  const [apiUrl, setApiUrl] = React.useState("");

  const fetchRecipes = (apiUrl, e) => {
    setRecipeComponents([]);
    e.preventDefault();
    setLoading(true);

    if (formData.length > 0) {
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
    }
  };

  React.useEffect(() => {
    setLoading(false);
    if (data) {
      data.hits.map((recipeEntry) =>
        setRecipeComponents((prevState) => [
          ...prevState,
          <FetchedRecipe
            fetchedRecipeSource={recipeEntry.recipe.source}
            fetchedRecipeUrl={recipeEntry.recipe.url}
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

  React.useEffect(() => {
    setApiUrl(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${formData}&app_id=c0d5554f&app_key=4bea9282ec264827a857e5af4390d2ea&imageSize=SMALL&field=label&field=image&field=images&field=ingredientLines&field=ingredients&field=source&field=url`
    );
  }, [formData]);

  return (
    <div className="w-screen h-screen bg-black/80">
      <div className="absolute flex flex-col w-3/5 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-mealsAndListBg drop-shadow-lg h-4/5 left-1/2 top-1/2">
        <Image
          priority
          alt="close"
          src={closeIcon}
          className="absolute cursor-pointer select-none top-2 right-2 hover:scale-105"
          onClick={() => openCloseSearchRecipes(setSearchingRecipes)}
        />
        <div className="flex justify-center my-5">
          <SearchForm
            fetchRecipes={fetchRecipes}
            apiUrl={apiUrl}
            setFormData={setFormData}
          />
        </div>
        {loading && (
          <div className="flex items-center m-auto">
            <Loader />
          </div>
        )}
        <div className="flex flex-col items-center max-h-full overflow-auto">
          {recipeComponents.map((recipeComponent, index) => (
            <div
              key={index}
              className="flex w-3/5 min-h-[200px] p-2 m-2 rounded-md bg-stone-100 drop-shadow-lg laptop:w-5/6"
            >
              {recipeComponent}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
