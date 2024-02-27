"use client";
import React from "react";
import Image from "next/image";
import downArrow from "../../../public/images/downArrow.svg";

export default function Meal(props) {
  const { mealTitle } = props;
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div>
      <div className="flex flex-row items-center justify-around w-full h-10 bg-slate-400">
        <h1>{mealTitle}</h1>
        <Image
          priority
          src={downArrow}
          alt="down arrow"
          className="transition-all cursor-pointer hover:translate-y-1"
          onClick={() => setExpanded((prevState) => !prevState)}
        />
      </div>
      {expanded && (
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      )}
    </div>
  );
}
