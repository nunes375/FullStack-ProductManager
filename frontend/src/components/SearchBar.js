import React, { useState } from 'react'

function SearchBar({ products, setProducts, allProducts }) {
    // State variable to store the search input
    const [searchInput, setSearchInput] = useState('')

    const handleChange = (event) => {
        setSearchInput(event.target.value)
        filterProducts(event.target.value)
    }

    // Function to filter products based on the search input
    const filterProducts = (input) => {
        const filteredProducts = input
            ? allProducts.filter(
                  (product) =>
                      product.title.includes(input) ||
                      product.category.includes(input)
              )
            : allProducts
        setProducts(filteredProducts)
    }

    return (
        <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput}
        />
    )
}

export default SearchBar
