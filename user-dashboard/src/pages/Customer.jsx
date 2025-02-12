import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/productSlice';
import { Link } from 'react-router-dom';

function Customer() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(state => state.product);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const filteredData = data.filter((ele) =>
    ele.title.toLowerCase().includes(search.toLowerCase())
  );

  const filterAndSort = () => {
    let sortedData = [...filteredData];

    if (sort === 'asc') {
      sortedData.sort((a, b) => a.rate - b.rate);
    } else if (sort === 'desc') {
      sortedData.sort((a, b) => b.rate - a.rate);
    }

    return sortedData;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Shop the Latest Products
      </h2>

      {/* Search Input */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="border-2 border-gray-400 w-full sm:w-1/2 p-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 transition"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

     
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => setSort('asc')}
        >
          Low to High
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => setSort('desc')}
        >
          High to Low
        </button>
      </div>

      {/* Loading & Error Handling */}
      {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
      {/* {isError && <p className="text-red-500 text-center">Error fetching products.</p>} */}

      {/* Product List */}
      {filterAndSort().length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterAndSort().map((product) => (
            <div key={product._id} className="border border-gray-200 bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
              <Link to={`/productDetails/${product._id}`}>

                {/* Product Image */}
                <div className="w-full aspect-[4/3] bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title} 
                    className="w-full h-full object-cover" 
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  />
                </div>

                {/* Product Info */}
                <h3 className="text-lg font-semibold text-gray-800 mt-3 truncate">{product.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.desc}</p>

                {/* Price & Category */}
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xl font-bold text-red-500">${product.rate}</p>
                  <p className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{product.category}</p>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full mt-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md transition">
                  Add to Cart
                </button>

              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}
    </div>
  );
}

export default Customer;
