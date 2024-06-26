import React, { useEffect, useState } from "react";
import styles from './Carts.module.css';
import Navbar from "../Navbar/Navbar";
import PriceComponent from "../PriceComponent/PriceComponent";
import Footer from "../Footer/Footer";
import { Modal, Button, TextInput, LoadingOverlay, Box } from '@mantine/core';

const Carts = () => {
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/session-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.status === 200) {
                    const data = await response.json();
                    if (data.role === "client") {
                        setIsClient(true);
                    } else {
                        setIsClient(false);
                    }
                } else {
                    setIsClient(false);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchSessionInfo();
    }, []);

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const fetchCarts = async () => {
            setLoading(true);
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/carts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setCarts(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCarts();
    }, []);

    const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);

    const updateQuantity = async (cartId, quantity, index) => {
        try {
            setIsUpdatingQuantity(true);

            const newCarts = [...carts];
            newCarts[index].quantity = parseInt(quantity);
            setCarts(newCarts);
            let total = 0;
            for (const i in newCarts) {
                total += newCarts[i].quantity * newCarts[i].price;
            }
            const newOrders = { ...orders };
            newOrders.total = total;
            setOrders(newOrders);

            const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/carts/${cartId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ quantity: parseInt(quantity) })
            });

            if (response.status === 200) {
                setIsUpdatingQuantity(false);
            }
        } catch (error) {
            console.error(error);
            setIsUpdatingQuantity(false);
        }
    };

    const deleteCart = async (cartId) => {
        try {
            const newCarts = carts.filter((cart) => cart.cartId !== cartId);
            setCarts(newCarts);
            let total = 0;
            for (const i in newCarts) {
                total += newCarts[i].quantity * newCarts[i].price;
            }
            const newOrders = { ...orders };
            newOrders.total = total;
            setOrders(newOrders);

            await fetch(process.env.REACT_APP_BACKEND_URL + `/carts/${cartId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, []);

    const [showOrderForm, setShowOrderForm] = useState(false);

    const toggleOrderForm = () => {
        setShowOrderForm(!showOrderForm);
    };

    const createOrder = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/orders', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    recipientName: document.getElementById('recipientName').value,
                    address: document.getElementById('address').value,
                }),
            });

            if (response.status === 200) {
                console.log('Order created successfully!');
                setShowOrderForm(false);
                const data = await response.json();
                window.location.href = data.redirecTo;
            } else {
                console.error('Failed to create order');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [recipientName, setRecipientName] = useState("");
    const [address, setAddress] = useState("");

    const handleRecipientNameChange = (event) => {
        setRecipientName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const isOrderButtonDisabled = !recipientName || !address;

    const handleKeyDown = (event) => {
        const charCode = event.keyCode;
        if (charCode < 48 || charCode > 57) {
            if (charCode !== 8 && charCode !== 46) { // Allow backspace and delete
                event.preventDefault();
            }
        }
    };

    return (
        <>
            {isClient && (
                <>
                    <Navbar />
                    <Box pos="relative" className={styles.cartsAndOrder}>

                        <LoadingOverlay
                            visible={loading}
                            zIndex={1000}
                            overlayProps={{ radius: 'sm', blur: 2, color: 'rgba(0, 0, 0, .5)' }}
                            loaderProps={{ color: '#f22e52', type: 'bars', }}
                        />
                        {!loading && (
                            <>
                                <div className={styles.left}>
                                    <h2 className={styles.title}>Carts</h2>
                                    <div className={styles.cartList}>
                                        {carts.length === 0 ? (
                                            <div className={styles.cartsEmpty}>
                                                <p>Your shopping cart is empty</p>
                                                <button className={styles.shop} onClick={() => window.location.href = '/products'}>
                                                    Shop Now </button>
                                            </div>
                                        ) : (
                                            <div className={styles.cartList}>
                                                {carts.map((item, index) => (
                                                    <div key={index} className={styles.cartDetails}>
                                                        <div className={styles.Cart}>
                                                            <div className={styles.leftCart}>
                                                                <img src={item.imageUrl} alt={item.name} />
                                                                <div className={styles.centerCenterCart}>
                                                                    <h4 className={styles.productName}>{item.name}</h4>
                                                                    <p style={{ marginTop: "0", marginBottom: "0" }}>{item.gender}'s {item.category}</p>
                                                                    <div style={{ fontSize: "13px" }}>Size: {item.size}</div>
                                                                    {isUpdatingQuantity === true ? (
                                                                        <input className={styles.inputQuantity}
                                                                            type="text"
                                                                            value={item.quantity}
                                                                            disabled="true"
                                                                        />
                                                                    ) : (
                                                                        <input className={styles.inputQuantity}
                                                                            type="number"
                                                                            min="1"
                                                                            value={item.quantity}
                                                                            onChange={(e) => updateQuantity(item.cartId, e.target.value, index)}
                                                                            onKeyDown={handleKeyDown}
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className={styles.rightCart}>
                                                                <div className={styles.itemRightCart}>
                                                                    Price: <PriceComponent price={item.price * item.quantity} />
                                                                    <button className={styles.removeCart} onClick={() => deleteCart(item.cartId)}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {carts.length !== 0 && (
                                    <div className={styles.summary}>
                                        <div className={styles.title}>
                                            <p>Summary :</p>
                                        </div>
                                        <div className={styles.price}><PriceComponent price={orders ? orders.total : 0} /></div>
                                        <button className={styles.order} onClick={toggleOrderForm}>
                                            Order
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </Box>
                    {showOrderForm && (
                        <div className={styles.orderFormOverlay}>
                            <div className={styles.orderForm}>
                                <h2 style={{ marginTop: "0" }}>Order Form</h2>
                                <label className={styles.labels} htmlFor="recipientName">Recipient Name:</label>
                                <input className={styles.inputModal} type="text" id="recipientName" name="recipientName" onChange={handleRecipientNameChange} />

                                <label className={styles.labels} htmlFor="address">Address:</label>
                                <textarea className={styles.inputModal} id="address" name="address" onChange={handleAddressChange}></textarea>

                                <div className={styles.buttonContainer}>
                                    <button className={styles.createOrder} onClick={createOrder} disabled={isOrderButtonDisabled}>
                                        Create Order
                                    </button>

                                    <button className={styles.cancelOrder} onClick={toggleOrderForm}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <Footer />
                </>
            )}
        </>
    );
};

export default Carts;
