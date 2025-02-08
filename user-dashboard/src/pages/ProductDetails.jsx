import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/productSlice';

function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const product = data.find((item) => item._id === productId);

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-4">Product Details</h2>

        {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
        {isError && <p className="text-red-500 text-center">Error fetching product.</p>}

        {product ? (
          <>
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-full object-cover" 
                onError={(e) => e.target.src = "https://via.placeholder.com/100"}
              />
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mt-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{product.desc}</p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-lg font-bold text-red-500">${product.rate}</p>
              <p className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{product.category}</p>
            </div>

            <button className="w-full mt-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition">
             Buy
            </button>
          </>
        ) : (
          <p className="text-gray-500 text-center">Product not found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
