import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

export default function ResultsPage() {

  const { state: searchTerms } = useLocation();
  const products = useSelector(state => state.product.products)

  return (
    <div>
      <h1>Results Page</h1>
    </div>
  )
}
