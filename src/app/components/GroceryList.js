import React from "react";
import Image from "next/image";
import deleteIcon from "../../../public/images/delete.svg";
import { capitalize } from "../scripts/capitalize";
import { deleteItem } from "../scripts/deleteItem";

export default function GroceryList(props) {
  const { listIngredients, setListIngredients } = props;

  return (
    <div className="w-4/5 m-auto">
      {listIngredients.map((el, index) => (
        <div className="flex justify-between">
          <p key={index}>{capitalize(el)}</p>
          <Image
            priority
            src={deleteIcon}
            className="transition-all cursor-pointer hover:-translate-x-1"
            onClick={() => deleteItem(setListIngredients, index)}
          />
        </div>
      ))}
    </div>
  );
}
