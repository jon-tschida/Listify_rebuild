import React from "react";
import Image from "next/image";
import closeIcon from "../../../public/images/closeButton.svg";

export default function HelpComponent(props) {
  const { setOpenHelp } = props;
  return (
    <div
      className="w-screen h-screen bg-black/80"
    >
      <div className="absolute flex flex-col p-2 -translate-x-1/2 -translate-y-1/2 rounded-lg laptop:w-2/5 sm-phone:w-full bg-mealsAndListBg drop-shadow-lg h-fit left-1/2 top-1/2">
        <Image
          priority
          alt="close"
          src={closeIcon}
          className="absolute cursor-pointer select-none top-2 right-2 hover:scale-105"
          onClick={() => setOpenHelp((prevState) => !prevState)}
        />
        <h2 className="text-xl text-center">What is Listify?</h2>
        <div className="p-4 overflow-auto text-lg">
          <br />
          <p>
            Listify is here to make creating grocery lists easier. Listify does
            this by adding the ingredients from your meals directly into the
            grocery list! Both the meals list and the grocery list will save between visits. 
          </p>
          <br />
          <p>
            To get started, create a meal by clicking `Add a meal`.
            From here, you can fill out your favorite weekly meals by giving it
            a title and some ingredients.
          </p>
          <br />
          <p>
            Need some inspiration? You can search from a whole database of
            recipes and automatically add any of those meals to your meals list by clicking `Search for recipes`.
          </p>
        </div>
      </div>
    </div>
  );
}
