import Meal from "./components/Meal";

export default function Home() {
  console.log("main page re-rendered")
  return (
    <main>
      <div className="w-1/5 p-1 border border-b rounded-md h-3/5 drop-shadow-md">
        <h1 className="text-center">Meals</h1>
        <hr className="w-3/5 m-auto"/>
        <Meal mealTitle={"Pasta"}/> 
        <Meal mealTitle={"nachos"} />
      </div>
    </main>
  );
}
