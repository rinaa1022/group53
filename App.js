import React, { useState } from "react";
import axios from "axios";

function App() {
    const [products, setProducts] = useState([]); // State to store product data
    const [showProducts, setShowProducts] = useState(false); // State to toggle product visibility

    // Function to fetch products when the button is clicked
    const fetchProducts = () => {
        axios.get("http://localhost:5000/api/products")
            .then((response) => {
                setProducts(response.data); // Save fetched data to state
                setShowProducts(true); // Set showProducts to true to display the table
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <div>
            <h1>Product Table</h1>
            {/* Button to fetch and show products */}
            <button onClick={fetchProducts}>Show All Products</button>

            {/* Conditionally render the table if showProducts is true */}
            {showProducts && (
                <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Is on Sale</th>
                            <th>Rating</th>
                            <th>Number of Reviews</th>
                            <th>Weight</th>
                            <th>Stock</th>
                            <th>Category ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productid}>
                                <td>{product.productid}</td>
                                <td>{product.productname}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.issale ? "Yes" : "No"}</td>
                                <td>{product.rating}</td>
                                <td>{product.numberofreview}</td>
                                <td>{product.weight || "N/A"}</td>
                                <td>{product.instock}</td>
                                <td>{product.categoryid}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default App;
