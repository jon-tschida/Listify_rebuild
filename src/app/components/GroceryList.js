"use client";
import React from "react";
import Image from "next/image";
import deleteIcon from "../../../public/images/delete.svg";
import { capitalize } from "../scripts/capitalize";
import { deleteItem } from "../scripts/deleteItem";
import plusSign from "../../../public/images/plusSign.svg";
import closeButton from "../../../public/images/closeButton.svg";

export default function GroceryList(props) {
  const { listIngredients, setListIngredients } = props;
  const [copied, setCopied] = React.useState(false);
  const [addingItem, setAddingItem] = React.useState(false);
  const [addingItemInput, setAddingItemInput] = React.useState("");

  const copyText = (text) =>
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });

  const addNewIngredientToList = (e) => {
    if (addingItemInput.length > 0) {
      e.preventDefault();
      setListIngredients((prevState) => [...prevState, addingItemInput]);
      setAddingItem(false);
    }
    else {
      e.preventDefault()
      setAddingItem(false)
    }
  };

  const handleChange = (e) => {
    setAddingItemInput(e.target.value);
  };

  return (
    <>
      <div
        id="mealAndList"
        className="w-4/5 p-3 m-auto overflow-y-auto 0 h-4/5"
      >
        {addingItem ? (
          <form className="flex items-center justify-center m-auto text-center " onSubmit={addNewIngredientToList}>
            <Image src={closeButton} alt="close add item form" className="mr-1 cursor-pointer" onClick={() => setAddingItem(false)}/>
            <input
              type="text"
              className="rounded-sm bg-zinc-100"
              onChange={handleChange}
            ></input>
            <button type="submit">
              <Image
                src={plusSign}
                className="w-5 ml-1 cursor-pointer"
                alt="add ingredient"
              />
            </button>
          </form>
        ) : (
          <div
            className="text-center cursor-pointer"
            onClick={() => setAddingItem((prevState) => !prevState)}
          >
            Add an Item
          </div>
        )}
        {typeof window !== "undefined" &&
          listIngredients.map((el, index) => (
            <div
              className="flex justify-between list-none"
              suppressHydrationWarning={true}
              key={index}
            >
              <li key={index} className="text-lg">
                {capitalize(el)}
              </li>
              <Image
                priority
                alt="delete button"
                src={deleteIcon}
                className="transition-all cursor-pointer w-[30px] hover:-translate-x-[3px]"
                onClick={() => deleteItem(setListIngredients, index)}
              />
            </div>
          ))}
      </div>
      <div
        className="absolute bottom-0 p-2 mb-2 translate-x-1/2 rounded-md cursor-pointer select-none right-1/2 bg-mealsBg text-zinc-100 laptop:text-base sm-phone:text-sm"
        onClick={() => listIngredients.length > 0 && copyText(listIngredients)}
      >
        {copied ? "Copied!" : "Copy Ingredients"}
      </div>
    </>
  );
}
