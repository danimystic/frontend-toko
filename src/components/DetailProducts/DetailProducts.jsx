import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './DetailProducts.module.css';
import Navbar from "../Navbar/Navbar";
import AddToCart from "./AddToCart";
import PriceComponent from "../PriceComponent/PriceComponent";
import Swal from "sweetalert2";
import UpdateStock from "./UpdateStock";
import Footer from "../Footer/Footer";
import { LoadingOverlay, Box } from '@mantine/core';

const DetailProducts = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');

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
                    setIsLoggedIn(true);
                    setRole(data.role);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSessionInfo();
    }, []);

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL + `/products/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    console.error("Error at fetching");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const [postStatus, setPostStatus] = useState(null);

    const updatePostStatus = (result) => {
        setPostStatus(result);
    };

    useEffect(() => {
        if (postStatus === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Product Added to Cart',
            });
            setPostStatus(null);
        } else if (postStatus === 409) {
            Swal.fire({
                icon: 'info',
                title: 'Information',
                text: 'Product Already in Cart',
            });
            setPostStatus(null);
        } else if (postStatus === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed Add Product to Cart',
            });
            setPostStatus(null);
        }
    }, [postStatus]);

    const [statusModified, setStatusModified] = useState(null);

    const onModifiedStatus = (result) => {
        setStatusModified(result);
    };

    useEffect(() => {
        if (statusModified === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update Stock Success',
            });
            setStatusModified(null);
        } else if (statusModified === 500) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to Update Stock'
            });
            setStatusModified(null);
        }
    }, [statusModified]);

    return (
        <>
            <Navbar />
            <Box pos="relative" className={styles.outerDetailProducts}>
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2, color: 'rgba(0, 0, 0, .5)' }}
                    loaderProps={{ color: '#f22e52', type: 'bars',  }}
                />
                {!loading && product && (
                    <>
                        <img src={product.imageUrl} className={styles.productImage} alt={product.name} />
                        <div className={styles.right}>
                            <h1 className={styles.productName}>{product.name}</h1>
                            <h4 className={styles.productGenderAndCategory}>{product.gender}'s {product.category}</h4>
                            <h5 className={styles.price}><PriceComponent price={product.price} /></h5>
                            <div className={styles.productDescription}>{product.description}</div>
                            <div>
                                {role !== "admin" ? (
                                    <AddToCart isLoggedIn={isLoggedIn} productId={productId} updatePostStatus={updatePostStatus} />
                                ) : (
                                    <UpdateStock productId={productId} onModifiedStatus={onModifiedStatus} />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default DetailProducts;
