import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { loadAllReviews } from '../../store/review';
import ReactStars from 'react-stars';
import './ResultsPage.css';

export default function ResultsPage() {
  const dispatch = useDispatch();
  const { state: searchTerms } = useLocation();
  const products = useSelector(state => state.product.products)
  const reviews = useSelector(state => state.review.reviews)

  const [filteredProducts, setFilteredProducts] = useState([])
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllReviews());
    setFilteredProducts(products.filter(product => {
      if (product.name.toLowerCase().includes(searchTerms.toLowerCase())) {
        return product;
      }
    }))

    setLoaded(true);
  }, [products])

  const averageRating = (id) => {
    const filteredReviews = [];
    let average = 0;
    reviews.forEach(review => {
      if (review.product_id === id) filteredReviews.push(review);
    })

    filteredReviews.forEach(review => {
      average += review.rating;
    })
    return Math.round(average / filteredReviews.length)
  }

  const totalReviews = (id) => {
    const filteredReviews = [];
    reviews.forEach(review => {
      if (review.product_id === id) filteredReviews.push(review);
    })
    return filteredReviews.length;
  }

  if (!loaded) return null;

  return (
    <div className='results-wrapper'>
      {filteredProducts.length !== 0 ? filteredProducts.map(product => {
        return (
          <div className='filtered-product-container' key={product.id}>
            <div className='img-container14478'>
              <img src={product.image_url} />
            </div>
            <div className='product-info1982'>
              <h2 className='name'>{product.name}</h2>
              <div className='stars-and-ratings'>
                <ReactStars
                  count={5}
                  value={averageRating(product.id)}
                  edit={false}
                  size={20}
                  color2={'#FFA41C'}
                />
                <p className='num-reviews'>{totalReviews(product.id)}</p>
              </div>
              <p className='price'>${product.price}.99</p>
              <p className='shipping' style={{ 'font-size': '14px' }}>FREE shipping by Amazin</p>
            </div>
          </div>
        )
      }) : <h1>No Products</h1>}
    </div>
  )
}
