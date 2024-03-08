import React from "react";
import Image from "next/image";
import deleteIcon from "../../../public/images/delete.svg";
import { capitalize } from "../scripts/capitalize";
import { deleteItem } from "../scripts/deleteItem";

export default function GroceryList(props) {
  const { listIngredients, setListIngredients } = props;

  return (
    <div id="mealAndList" className="w-4/5 p-3 m-auto overflow-y-auto 0 h-4/5">
      {listIngredients.map((el, index) => (
        <div className="flex justify-between list-none transition-all hover:scale-105">
          <li key={index}>{capitalize(el)}</li>
          <Image
            priority
            src={deleteIcon}
            className="transition-all cursor-pointer hover:-translate-x-1 w-[25px]"
            onClick={() => deleteItem(setListIngredients, index)}
          />
        </div>
      ))}
    </div>
  );
}
