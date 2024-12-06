import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [categories, setCategories] = useState([]);
    const [kits, setKits] = useState([]);
    const [types, setTypes] = useState([]);
    const [weightClasses, setWeightClasses] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedQuantity, setQuantities] = useState({}); // Object to track quantity by product ID
    const [customerName, setCustomerName] = useState(""); // Store customer name
    const [cartId, setCartId] = useState(null); // Store the generated cart ID
    const [showNamePrompt, setShowNamePrompt] = useState(true); // Always ask for name

    // Store the user-selected filters
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedKit, setSelectedKit] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedWeightClass, setSelectedWeightClass] = useState("");

    // Fetch filter options on component mount
    useEffect(() => {
        axios.get("http://localhost:5000/api/categories").then((res) => setCategories(res.data));
        axios.get("http://localhost:5000/api/kits").then((res) => setKits(res.data));
        axios.get("http://localhost:5000/api/types").then((res) => setTypes(res.data));
        axios.get("http://localhost:5000/api/weightclasses").then((res) => setWeightClasses(res.data));
    }, []);

    // Fetch products based on selected filters
    const fetchFilteredProducts = () => {
        const params = {
            categoryid: selectedCategory,
            kitid: selectedKit,
            typeid: selectedType,
            weightid: selectedWeightClass,
        };

        axios
            .get("http://localhost:5000/api/products/filter", { params })
            .then((res) => setProducts(res.data))
            .catch((error) => console.error("Error fetching filtered products:", error));
    };

    // Update the state variables based on the user's selection
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
    const handleKitChange = (e) => setSelectedKit(e.target.value);
    const handleTypeChange = (e) => setSelectedType(e.target.value);
    const handleWeightClassChange = (e) => setSelectedWeightClass(e.target.value);

    // Handle name submission and cart creation
    const handleNameSubmit = () => {
      if (!customerName.trim()) {
          alert("Please enter a valid name");
          return;
      }

      // Create a new cart with the entered name
      axios
          .post("http://localhost:5000/api/shoppinglist/add", { customerName })
          .then((res) => {
              setCartId(res.data.cartid); // Save cart ID in the frontend's state
              setShowNamePrompt(false); // Hide the name prompt
          })
          .catch((err) => {
              console.error("Error creating cart:", err);
              alert("Failed to create your cart. Please try again.");
          });
    };

    // Handle adding products to cart
    const handleAddToCart = (productid) => {
      if (!cartId) {
        alert("You need to create a cart first. Please enter your name.");
        return;
      }

      const quantity = selectedQuantity[productid] || 1; // Default quantity is 1
  
      axios
          .post("http://localhost:5000/api/cart/add", { productid, quantity, cartid: cartId })
          .then((res) => {alert("Product added to cart successfully!");})
          .catch((err) => {
              console.error("Error adding product to cart:", err);
              alert("Failed to add product to cart");
          });
    };  
    
    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to our Retail Store for Robotics Parts!</h1>

            {/* Filter Section */}
            <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
                <label>
                    <span>Category:</span>
                    <select onChange={handleCategoryChange} value={selectedCategory}>
                        <option value="">All</option>
                        {categories.map((category) => (
                            <option key={category.categoryid} value={category.categoryid}>
                                {category.categoryname}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Kit:</span>
                    <select onChange={handleKitChange} value={selectedKit}>
                        <option value="">All</option>
                        {kits.map((kit) => (
                            <option key={kit.kitid} value={kit.kitid}>
                                {kit.kitname}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Type:</span>
                    <select onChange={handleTypeChange} value={selectedType}>
                        <option value="">All</option>
                        {types.map((type) => (
                            <option key={type.typeid} value={type.typeid}>
                                {type.typename}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Weight Class:</span>
                    <select onChange={handleWeightClassChange} value={selectedWeightClass}>
                        <option value="">All</option>
                        {weightClasses.map((weightclass) => (
                            <option key={weightclass.weightid} value={weightclass.weightid}>
                                {weightclass.weightname}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    onClick={fetchFilteredProducts}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Apply Filters
                </button>

                {showNamePrompt ? (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <h1>Welcome!</h1>
                        <p>Please enter your name to get started:</p>
                        <input
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            placeholder="Enter your name"
                            style={{ padding: "10px", margin: "10px" }}
                        />
                        <button
                            onClick={handleNameSubmit}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <h1>Welcome, {customerName}!</h1>
                        <p>Your current cart ID is: {cartId}</p>
                    </>
                )}
            </div>

            {/* Product Table */}
            <div>
                {products.length > 0 ? (
                    <table border="1" style={{ width: "100%", textAlign: "left" }}>
                        <thead>
                            <tr>
                              <th> Add to Cart</th>
                              <th>Product ID</th>
                              <th>Product Name</th>
                              <th>Description</th>
                              <th>Price ($)</th>
                              <th>Is on Sale</th>
                              <th>Rating (5.0)</th>
                              <th>Number of Reviews</th>
                              <th>Weight (g)</th>
                              <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productid}>
                                    <td>
                                        {/* Quantity input */}
                                        <input
                                            type="number"
                                            min="1"
                                            value={selectedQuantity[product.productid] || 1}
                                            style={{ width: "50px", textAlign: "center", marginLeft: "8px", marginBottom: "8px"}}
                                            onChange={(e) => setQuantities({ ...selectedQuantity, [product.productid]: e.target.value })}
                                        />
                                        {/* Add to Cart Button */}
                                        <button
                                            onClick={() => handleAddToCart(product.productid)}
                                            style={{
                                                padding: "10px 15px",
                                                backgroundColor: "#007bff",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "3px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Add
                                        </button>
                                    </td>
                                    <td>{product.productid}</td>
                                    <td>{product.productname}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.issale ? "Yes" : "No"}</td>
                                    <td>{product.rating}</td>
                                    <td>{product.numberofreview}</td>
                                    <td>{product.weight || "N/A"}</td>
                                    <td>{product.instock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
}

export default App;
