"use client";
import React from "react";
import Image from "next/image";
import deleteIcon from "../../../public/images/delete.svg";
import { capitalize } from "../scripts/capitalize";
import { deleteItem } from "../scripts/deleteItem";

export default function GroceryList(props) {
  const { listIngredients, setListIngredients } = props;
  const [copied, setCopied] = React.useState(false);

  const copyText = (text) =>
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(()=>{
        setCopied(false)
      }, 3000)
    });
  return (
    <>
      <div
        id="mealAndList"
        className="w-4/5 p-3 m-auto overflow-y-auto 0 h-4/5"
      >
        {typeof window !== "undefined" && listIngredients.map((el, index) => (
          <div className="flex justify-between list-none transition-all hover:scale-105" suppressHydrationWarning={true}>
            <li key={index} className="text-lg">
              {capitalize(el)}
            </li>
            <Image
              priority
              alt="delete button"
              src={deleteIcon}
              className="transition-all cursor-pointer w-[30px]"
              onClick={() => deleteItem(setListIngredients, index)}
            />
          </div>
        ))}
      </div>
      <div
        className="absolute bottom-0 p-2 mb-2 translate-x-1/2 rounded-md cursor-pointer select-none right-1/2 bg-mealsBg text-zinc-100"
        onClick={() => listIngredients.length > 0 && copyText(listIngredients)}
      >
        {copied ? "Copied!" : "Copy Ingredients"}
      </div>
    </>
  );
}
