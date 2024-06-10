import React, { useEffect, useState } from "react";
import styles from "./AddToCart.module.css";

const AddToCart = ({ isLoggedIn, productId, updatePostStatus }) => {
    const [stock, setStock] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State untuk loading

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/products/stock/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                })

                if (response.status === 200) {
                    const data = await response.json();
                    setStock(data);
                } else {
                    console.error("Error at fetching");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchStock();
    }, [productId]);

    useEffect(() => {
        if (selectedSize === "S") {
            setSelectedStock(stock[0].stock);
        } else if (selectedSize === "M") {
            setSelectedStock(stock[1].stock);
        } else if (selectedSize === "L") {
            setSelectedStock(stock[2].stock);
        } else if (selectedSize === "XL") {
            setSelectedStock(stock[3].stock);
        } else if (selectedSize === "XXL") {
            setSelectedStock(stock[4].stock);
        } else if (selectedSize === "XXXL") {
            setSelectedStock(stock[5].stock);
        }
    }, [selectedSize, stock]);

    const clickSize = (size) => {
        setSelectedSize(size);
    }

    const addToCart = async () => {
        setIsLoading(true); // Set loading state to true
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId: productId,
                    size: selectedSize
                })
            });

            if (response.status === 201) {
                updatePostStatus(201);
            } else if (response.status === 409) {
                updatePostStatus(409);
            } else {
                updatePostStatus(500);
            }
        } catch (error) {
            console.error(error);
            updatePostStatus(500);
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };

    if (!stock) {
        return <div></div>
    }

    return (
        <div className={styles.addToCart}>
            Select Size:
            <div className={styles.sizes}>
                {stock.map((item) => (
                    <button
                        key={item.size}
                        className={`${selectedSize === item.size ? styles.activeSize : ''}`}
                        disabled={item.stock === 0}
                        onClick={() => clickSize(item.size)}
                    >
                        {item.size}
                    </button>
                ))}
            </div>
            <div className={styles.displayStock}>
                Stock: {selectedStock}
            </div>
            <button disabled={isLoggedIn === false || selectedSize === null || isLoading} className={styles.cart} onClick={addToCart}>
                {isLoading ? 'Adding...' : 'Add To Cart'}
            </button>
        </div>
    );
};

export default AddToCart;
