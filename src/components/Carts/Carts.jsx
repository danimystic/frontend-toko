import React, {useEffect, useState} from "react";
import styles from './Carts.module.css';
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import PriceComponent from "../PriceComponent/PriceComponent";

const Carts = () => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/session-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if(response.status === 200){
                    const data = await response.json();
                    if(data.role === "client"){
                        setIsClient(true);
                    }
                    else{
                        setIsClient(false);
                    }
                }
                else{
                    setIsClient(false);
                }
            } 
            catch (error) {
                console.error(error);
            }
        };
        fetchSessionInfo();
    }, []); 

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/carts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if(response.status === 200){
                    const data = await response.json();
                    setCarts(data);
                }
            } 
            catch (error) {
                console.error(error);
            }
        };
        fetchCarts();
    }, []);

    const updateQuantity = async (cartId, quantity, index) => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/carts/${cartId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ quantity: parseInt(quantity) })
            });

            if(response.status === 200){
                const newCarts = [...carts];
                newCarts[index].quantity = parseInt(quantity);
                setCarts(newCarts);

                let total = 0;
                for(const i in carts){
                    total += carts[i].quantity * carts[i].price;
                }

                const newOrders = {...orders};
                newOrders.total = total;
                setOrders(newOrders);

            }
        } 
        catch (error) {
            console.error(error);
        }

    };

    const deleteCart = async (cartId) => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/carts/${cartId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if(response.status === 200){
                const newCarts = carts.filter((cart) => cart.cartId !== cartId);
                setCarts(newCarts);

                let total = 0;
                for(const i in carts){
                    total += carts[i].quantity * carts[i].price;
                }

                const newOrders = {...orders};
                newOrders.total = total;
                setOrders(newOrders);
            }
        } 
        catch (error) {
            console.error(error);
        }
    }

    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/orders', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if(response.status === 200){
                    const data = await response.json();
                    setOrders(data[0]);
                }
            } 
            catch (error) {
                console.error(error);
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
          const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/orders', {
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

    if(!carts){
        return <div>Antara tidak ada atau loading</div>
    }

    if(!orders){
        return (
            <>
                <Navbar />
                <div style={{marginBottom: "100vh", paddingTop: "200px", textAlign: "center"}}>Cart Masih Kosong</div>
                <Footer />
            </>
        );
    }

    return (
       <>
        {isClient && (
            <>
                <Navbar />
                <div className={styles.cartsAndOrder}>
                    <div className={styles.left}>
                        <h2>Carts</h2>
                        <div className={styles.cartList}>
                            {carts.map((item, index) => (
                                <div key={index} className={styles.cartDetails}>
                                    <img src={item.imageUrl} alt={item.name} />
                                    <div className={styles.centerCart}>
                                        <h4 className={styles.productName}>{item.name}</h4>
                                        <h5 style={{marginTop: "0", marginBottom: "0"}}>{item.gender}'s {item.category}</h5>
                                        <div className={styles.centerCenterCart}>
                                            <div style={{fontWeight: "bold", fontSize: "13px"}}>Size: {item.size}</div>
                                            <input className={styles.inputQuantity}
                                                type="number"
                                                min="0"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.cartId, e.target.value, index)}
                                            />
                                        </div>
                                        <button className={styles.removeCart} onClick={() => deleteCart(item.cartId)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" class="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className={styles.rightCart}>Price: <PriceComponent price={item.price * item.quantity} /> </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.right} >
                        <h2>Summary</h2>
                        <PriceComponent  price={orders.total}/>
                        <button className={styles.order} onClick={toggleOrderForm}>
                            Order
                        </button>
                    </div>
                </div>
                <Footer />

                {showOrderForm && (
                    <div className={styles.orderFormOverlay}>
                        <div className={styles.orderForm}>
                        <h2 style={{marginTop: "0"}}>Order Form</h2>
                            <label className={styles.labels} htmlFor="recipientName">Recipient Name:</label>
                            <input style={{width: "75%"}} type="text" id="recipientName" name="recipientName" onChange={handleRecipientNameChange} />

                            <label className={styles.labels} htmlFor="address">Address:</label>
                            <textarea style={{width: "75%"}} id="address" name="address" onChange={handleAddressChange}></textarea>

                            <button className={styles.createOrder} onClick={createOrder} disabled={isOrderButtonDisabled}>
                              Create Order
                            </button>

                            <button className={styles.cancelOrder} onClick={toggleOrderForm}>
                              Cancel
                            </button>
                        </div>
                    </div>
                )}
            </>
        )}
        </>
    );

};

export default Carts;
