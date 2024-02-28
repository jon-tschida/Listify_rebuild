import React from 'react'

export default function GroceryList(props) {

    const {listIngredients} = props
  return (
    <div>
    {listIngredients.map((el, index) => <p key={index}>{el}</p>)}
    </div>
  )
}
