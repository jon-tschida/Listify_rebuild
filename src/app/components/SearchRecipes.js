"use client";
import React from "react";
import closeIcon from "../../../public/images/closeButton.svg";
import Image from "next/image";

export default function SearchRecipes(props) {
  const { openCloseSearchRecipes, setSearchingRecipes } = props;
  return (
    <div className="w-screen h-screen bg-white/30 backdrop-blur-sm">
      <div className="absolute w-3/5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg drop-shadow-lg h-3/5 left-1/2 top-1/2">
        <Image
          priority
          alt="close"
          src={closeIcon}
          className="absolute cursor-pointer select-none top-2 right-2"
          onClick={() => openCloseSearchRecipes(setSearchingRecipes)}
        />
        Search
      </div>
    </div>
  );
}
