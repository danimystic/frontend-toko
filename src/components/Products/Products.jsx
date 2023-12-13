import React, {useState, useEffect} from "react";
import ProductList from "./ProductList";
import styles from "./Products.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
    
                if(response.status === 200){
                    const data = await response.json();
                    setProducts(data);
                }
            } 
            catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const filteredProducts = products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((product) => selectedGender === 'All' || product.gender === selectedGender)
        .filter((product) => selectedCategory === 'All' || product.category === selectedCategory);
    
    return (
        <>
            <Navbar />
            <div style={{padding: "100px"}}>
                <div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    </div>
                    <div>
                    <label>
                        Gender:
                        <select
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </label>
                    <label>
                        Category:
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Varsity">Varsity</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Sweater">Sweater</option>
                            <option value="Coach">Coach</option>
                            <option value="Canvas">Canvas</option>
                        </select>
                    </label>
                </div>
                <ProductList products={filteredProducts} />
            </div>
        <Footer />
        </>
    );
};

export default Products;