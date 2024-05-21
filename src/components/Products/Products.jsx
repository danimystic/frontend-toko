import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import styles from "./Products.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { Pagination, Text } from '@mantine/core';

function chunk(array, size) {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
}

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGender, setSelectedGender] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [productsPerPage] = useState(4); // State for products per page, set to 6

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/products', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const gender = params.get('gender');
        const category = params.get('category');
        if (gender) setSelectedGender(gender);
        if (category) setSelectedCategory(category);
    }, [location.search]);

    const handleGenderClick = (e) => {
        const selectedValue = e.target.value;
        setSelectedGender(selectedValue);
        setSearchTerm('');
        setCurrentPage(1); // Reset to first page
        navigate(`/products?gender=${selectedValue}&category=${selectedCategory}`);
    };

    const handleCategoryClick = (e) => {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        setSearchTerm('');
        setCurrentPage(1); // Reset to first page
        navigate(`/products?gender=${selectedGender}&category=${selectedValue}`);
    };

    const filteredProducts = products
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((product) => selectedGender === 'All' || product.gender === selectedGender)
        .filter((product) => selectedCategory === 'All' || product.category === selectedCategory);

    // Split products into chunks
    const paginatedProducts = chunk(filteredProducts, productsPerPage);
    const currentProducts = paginatedProducts[currentPage - 1] || [];

    return (
        <>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.list}>
                    <div className={styles.listItem}>
                        <label>Gender:</label>
                        <select
                            value={selectedGender}
                            onChange={handleGenderClick}
                        >
                            <option value="All">All</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </div>
                    <div className={styles.listItem}>
                        <label>Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryClick}
                        >
                            <option value="All">All</option>
                            <option value="Varsity">Varsity</option>
                            <option value="Hoodie">Hoodie</option>
                            <option value="Sweater">Sweater</option>
                            <option value="Coach">Coach</option>
                            <option value="Canvas">Canvas</option>
                        </select>
                    </div>
                </div>
                <div className={styles.listProduct}>
                    {loading ? (
                        <div className={styles.loading}>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        currentProducts.length === 0 ? (
                            <div className={styles.notProduct}>
                                <p>No products available</p>
                            </div>
                        ) : (
                            <ProductList products={currentProducts} />
                        )
                    )}
                </div>
                <div className={styles.containerPagination}>
                    <Pagination
                        total={paginatedProducts.length}
                        value={currentPage}
                        onChange={setCurrentPage}
                        mt="sm"
                        color="#f22e52"
                    />
                </div>
            </div>
        </>
    );
};

export default Products;
