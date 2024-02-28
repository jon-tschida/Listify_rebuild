"use client";
import React from "react";
import Image from "next/image";
import downArrow from "../../../public/images/downArrow.svg";
import { capitalize } from "../scripts/capitalize";

export default function Meal(props) {
  const { mealTitle } = props;
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <div className="flex flex-row items-center justify-around w-full h-10 bg-slate-400">
        <div className="w-3/5 text-center">
          <h1>{capitalize(mealTitle)}</h1>
        </div>
        <div className="flex flex-row-reverse w-2/5 pr-5">
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
        <ul className="p-2 bg-slate-300">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
    </div>
  );
}
