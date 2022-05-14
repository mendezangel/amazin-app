import React, { useState, useEffect } from 'react'

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const arr = [];
    for (const key in localStorage) {
      const item = localStorage[key];
      arr.push(JSON.parse(item))
    }
    setCartItems(arr)
  })

  if (!isLoaded) return null;

  return (
    <div>

    </div>
  )
}
