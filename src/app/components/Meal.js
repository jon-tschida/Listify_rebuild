"use client";
import React from "react";
import Image from "next/image";
import downArrow from "../../../public/images/downArrow.svg";

export default function Meal(props) {
  const { mealTitle } = props;
  const [expanded, setExpanded] = React.useState(false);

  const capitalize = (string) => {
    let cap = string.split("")
    return cap
  }
  console.log(capitalize("test"))
  return (
    <div>
      <div className="flex flex-row items-center justify-around w-full h-10 bg-slate-400">
        <h1>{mealTitle}</h1>
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
