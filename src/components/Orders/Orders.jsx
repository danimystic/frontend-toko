import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from './Orders.module.css';
import Navbar from "../Navbar/Navbar";
import PriceComponent from "../PriceComponent/PriceComponent";
import Footer from "../Footer/Footer";

const Orders = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                    setIsLoggedIn(true);
                }
                else{
                    setIsLoggedIn(false);
                }
            } 
            catch (error) {
                console.error(error);
                setIsLoggedIn(false);
            }
        };
        fetchSessionInfo();
    }, []); 

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/orders/all`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if(response.status === 200){
                    const data = await response.json();
                    setOrders(data);
                }
            } 
            catch (error) {
                console.error(error);
            }
        };
        fetchOrder();
    }, []);
      

    return (
       <>
        {isLoggedIn && (
            <>
                <Navbar />
                <h1 style={{marginTop: "100px", marginLeft: "100px"}}>Orders</h1>
                <div className={styles.listOrder}>
                    {orders.map((item) => (
                        <Link to={`/orders/${item.orderId}`} className={styles.linkContainer}>
                            <div className={styles.orderDetail}>
                                <div className={styles.top}>
                                    <h3 style={{margin: "0px"}}>{item.recipientName}</h3> 
                                    <h4 className={styles.price}><PriceComponent price={item.total} /></h4>
                                </div>
                                <div className={styles.center}>
                                    <h4 style={{margin: "0px"}}>{item.address}</h4>
                                </div>
                                <div className={styles.bottom}>
                                    <h4 style={{margin: "0px"}}>{new Date(item.orderDate).toLocaleDateString('id-ID')}</h4>
                                    {item.orderStatus === "2" ? (<h4 className={styles.statusNow}>Finished</h4>) : (<h4 className={styles.statusNow}>Ongoing</h4>)}
                                </div>
                            </div>
                        </Link>
                    )) 
                    }
                </div> 
                <Footer />
            </>
        )}        
        </>
    );

};

export default Orders;
