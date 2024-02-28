"use client";
import React from "react";
import Image from "next/image";
import downArrow from "../../../public/images/downArrow.svg";
import plusSign from "../../../public/images/plusSign.svg";
import { capitalize } from "../scripts/capitalize";

export default function Meal(props) {
  const { mealTitle, ingredients } = props;
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <div className="flex flex-row items-center justify-around w-4/5 h-10 m-auto bg-slate-400">
        <div className="flex justify-around w-3/5 text-center">
          <Image priority src={plusSign} alt="plus sign" />
          <h1 className="cursor-pointer select-none" onClick={() => setExpanded((prevState) => !prevState)}>{capitalize(mealTitle)}</h1>
        </div>
        <div className="flex flex-row-reverse justify-around w-2/5 pr-5 ">
          <Image
            priority
            src={downArrow}
            alt="down arrow"
            className={`transition-all cursor-pointer select-none ${
              expanded || "hover:translate-y-0.5"
            } ${expanded && "rotate-180 hover:-translate-y-0.5"}`}
            onClick={() => setExpanded((prevState) => !prevState)}
          />
        </div>
      </div>
      {expanded && (
        <ul className="w-4/5 p-2 pl-5 m-auto bg-slate-300">
            {ingredients.map(element => <li>{capitalize(element)}</li>)}
        </ul>
      )}
    </div>
  );
}
