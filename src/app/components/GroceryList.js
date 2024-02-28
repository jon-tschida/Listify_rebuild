import React from "react";
import Image from "next/image";
import deleteIcon from "../../../public/images/delete.svg";

export default function GroceryList(props) {
  const { listIngredients, setListIngredients } = props;
  return (
    <div className="border border-black">
      {listIngredients.map((el, index) => (
        <div className="flex justify-around border border-black">
          <p key={index}>{el}</p>
          <Image
            priority
            src={deleteIcon}
            className="transition-all cursor-pointer hover:-translate-x-1"
            onClick={() => setListIngredients(prevList => prevList.filter((_, i) => i !== index))}
          />
        </div>
      ))}
    </div>
  );
}
