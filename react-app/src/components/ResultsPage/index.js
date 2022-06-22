import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

export default function ResultsPage() {

  const { state: searchTerms } = useLocation();
  const products = useSelector(state => state.product.products)

  const [filteredProducts, setFilteredProducts] = useState([])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFilteredProducts(products.filter(product => {
      if (product.name.toLowerCase().includes(searchTerms.toLowerCase())) {
        return product;
      }
    }))

    setLoaded(true);
  }, [products])

  if (!loaded) return null;

  console.log('filtered products ======>', filteredProducts)

  return (
    <div>
      {filteredProducts.length !== 0 ? filteredProducts.map(product => {
        return (
          <div className='filtered-product-container' key={product.id}>
            <div className='img-container14478'>
              <img src={product.image_url} />
            </div>
            <div className='product-info1982'>
              <p>{product.name}</p>

            </div>
          </div>
        )
      }) : <h1>No Products</h1>}
    </div>
  )
}
