import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import PriceComponent from "../PriceComponent/PriceComponent";
import styles from './DetailOrders.module.css';
import Swal from "sweetalert2";

const DetailOrders = () => {
    
    const { orderId } = useParams();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

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
                    const data = await response.json();
                    if(data.role === "admin"){
                        setIsAdmin(true);
                    }
                    else{
                        setIsAdmin(false);
                    }
                }
                else{
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                }
            } 
            catch (error) {
                console.error(error);
                setIsLoggedIn(false);
            }
        };
        fetchSessionInfo();
    }, []); 

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/carts/${orderId}`, {
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
    }, [orderId]);

    const [orders, setOrders] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/orders/${orderId}`, {
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
    }, [orderId]);
      

    const [selectedImage, setSelectedImage] = useState(null);

    const handleChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append("image", selectedImage);

            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/orders/${orderId}`, {
                method: "POST",
                body: formData,
                credentials: 'include'
            });

            if (response.status === 200) {
                Swal.fire('Success', 'Product added successfully', 'success');
                const data = await response.json();
                const newOrders = {...orders};
                newOrders.proofPayment = data.proofPayment;
                setOrders(newOrders);
            } 
            else {
                console.error("Failed to upload image");
                Swal.fire('Error', 'Error', 'error');
            }
        } 
        catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error', 'error');
        }
    };

    const acceptPayment = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({userId: orders.userId})
            });

            if(response.status === 200){
                Swal.fire('Success', 'Success Accepting Payment', 'success');
                const newOrders = {...orders};
                newOrders.orderStatus = "2";
                setOrders(newOrders);
            }
            else{
                Swal.fire('Error', 'Error', 'error');
            }
        } 
        catch (error) {
            console.error(error);
            Swal.fire('Error', 'Error', 'error');
        }
    };

    if(!orders){
        return <div>Antara tidak ada atau loading</div>
    }
    
    return (
        <>
         {isLoggedIn && (
             <>
                 <Navbar />
                 <div className={styles.cartsAndOrder}>
                     <div className={styles.left}>
                         <h2>Products</h2>
                         <div className={styles.cartList}>
                             {carts.map((item, index) => (
                                 <div key={index} className={styles.cartDetails}>
                                     <img src={item.imageUrl} alt={item.name} />
                                     <div className={styles.centerCart}>
                                         <h4 className={styles.productName}>{item.name}</h4>
                                         <h5 style={{marginTop: "0", marginBottom: "0"}}>{item.gender}'s {item.category}</h5>
                                         <div className={styles.centerCenterCart}>
                                            <div style={{fontWeight: "bold", fontSize: "13px"}}>Size: {item.size}</div>
                                            <div className={styles.inputQuantity}>Quantity: {item.quantity}</div> 
                                         </div>
                                         
                                     </div>
                                     <div className={styles.rightCart}>Price: <PriceComponent price={item.price * item.quantity} /> </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                     <div className={styles.right}>
                         <h2>Summary</h2>
                         <PriceComponent  price={orders.total}/>
                     </div>
                 </div>

                {
                    orders.orderStatus === "1" ? (
                        isAdmin === true ? (
                            <div style={{padding: "100px"}}>
                                <h2 style={{color: "#f9f9f9"}}>Proof Payment:</h2>
                                <img src={orders.proofPayment} alt="proof payment" /> <br></br>
                                <button onClick={acceptPayment}>Accept</button>
                            </div>
                        ) :
                        (
                            orders.proofPayment === null ? (
                                <div style={{padding: "100px"}}>
                                    <form  encType="multipart/form-data" className={styles.addProductsForm} onSubmit={handleSubmit}>
                        
                                        <h2 style={{color: "#f9f9f9"}}>Upload Proof Payment:</h2>
                                        <input type="file" name="image" onChange={handleChange} />
                                
                                        <button type="submit" style={{maxWidth: "50%"}} disabled={selectedImage === null}>Upload</button>
                                    </form>

                                </div>
                            ) :
                            (
                                <div style={{padding: "100px"}}>
                                    <h2 style={{color: "#f9f9f9"}}>Proof Payment:</h2>
                                    <img src={orders.proofPayment} alt="proof payment" />
                                    <h4>Menunggu Persetujuan Admin</h4>
                                </div>
                            )
                        )
                    ) :
                    orders.orderStatus === "2" ? (
                        <div style={{padding: "100px"}}>
                            <h3>Date: {new Date(orders.orderDate).toLocaleDateString('id-ID')}</h3>
                            <h2 style={{color: "#f9f9f9"}}>Proof Payment:</h2>
                            <img src={orders.proofPayment} alt="proof payment" /> <br></br>
                        </div>
                    ) :
                    (
                        <div></div>
                    )
                }
                 <Footer /> 
             </>
         )}
         </>
     );
};

export default DetailOrders;