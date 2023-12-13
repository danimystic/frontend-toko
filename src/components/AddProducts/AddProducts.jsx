import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './AddProducts.module.css';

const AddProducts = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        category: '',
        description: '',
        gender: '',
        price: '',
        image: null,
        sizes: {
            S: 0,
            M: 0,
            L: 0,
            XL: 0,
            XXL: 0,
            XXXL: 0,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
        setProduct({ ...product, [name]: files[0] });
        }
        else if (name.startsWith('sizes.')) {
            const sizeName = name.split('.')[1];
            setProduct({
              ...product,
              sizes: {
                ...product.sizes,
                [sizeName]: parseInt(value, 10),
              },
            });
        }
        else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isFormValid = Object.values(product).every((value) => {
            if (typeof value === 'object' && value !== null) {
              return Object.values(value).every((sizeValue) => sizeValue >= 0);
            }
            return value !== null && value !== undefined && value !== '';
        });
        
        if (!isFormValid) {
            Swal.fire('Error', 'Please Fill All Input', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('category', product.category);
        formData.append('description', product.description);
        formData.append('gender', product.gender);
        formData.append('price', product.price);
        formData.append('image', product.image);
        formData.append('sizes', JSON.stringify(product.sizes));
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/add-products', {
                method: 'POST',
                headers: {
                },
                body: formData,
                credentials: 'include'
            });
            
            if (response.ok) {
                Swal.fire('Success', 'Product added successfully', 'success');
            }
            else {
                throw new Error('Failed to add product');
            }
        } 
        catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/session-info', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                  });
                const data = await response.json();
                setIsAdmin(data.role === 'admin');
            } 
            catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        };
        fetchSessionInfo();
    }, []);

    return (
        <>
            {isAdmin && 
                (
                    <div>
                        <Navbar />
                        <form  encType="multipart/form-data" className={styles.addProductsForm} onSubmit={handleSubmit}>
                            <div className={styles.formList}>
                                <label style={{color: "#f9f9f9", fontSize: 16, textAlign: "left"}}>Name:</label>
                                <input type="text" name="name" value={product.name} onChange={handleChange} />
                            </div>
                            <div className={styles.formList}>
                                <label style={{color: "#f9f9f9", fontSize: 16, textAlign: "left"}}>Category:</label>
                                <select name="category" value={product.category} onChange={handleChange}>
                                    <option>Select Category</option>
                                    <option value="Varsity">Varsity</option>
                                    <option value="Coach">Coach</option>
                                    <option value="Canvas">Canvas</option>
                                    <option value="Sweater">Sweater</option>
                                    <option value="Hoodie">Hoodie</option>
                                </select>
                            </div>
                            <div>
                                <label style={{color: "#f9f9f9", fontSize: 16, textAlign: "left"}}>Description:</label>
                                <textarea name="description" value={product.description} onChange={handleChange} />
                            </div>
                            <div>
                                <label style={{color: "#f9f9f9", fontSize: 16, textAlign: "left"}}>Gender:</label>
                                <select name="gender" value={product.gender} onChange={handleChange}>
                                    <option>Select Gender</option>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                </select>
                            </div>
                            <div>
                                <label style={{color: "#f9f9f9", fontSize: 16, textAlign: "left"}}>Price:</label>
                                <input type="number" name="price" value={product.price} onChange={handleChange} />
                            </div>
                            <div>
                                <label style={{color: "#f9f9f9", fontSize: 16, textAlign: "left"}}>Image:</label>
                                <input type="file" name="image" onChange={handleChange} />
                            </div>
                            <div>
                                <label style={{color: "#f9f9f9", fontSize: 16, textAlign: "left"}}>Sizes:</label>
                                <div>
                                    <label style={{textAlign: "left"}}>S:</label>
                                    <input type="number" name="sizes.S" value={product.sizes.S} onChange={handleChange} min={0} />
                                </div>
                                <div>
                                    <label style={{textAlign: "left"}}>M:</label>
                                    <input type="number" name="sizes.M" value={product.sizes.M} onChange={handleChange} min={0}/>
                                </div>
                                <div>
                                    <label style={{textAlign: "left"}}>L:</label>
                                    <input type="number" name="sizes.L" value={product.sizes.L} onChange={handleChange} min={0} />
                                </div>
                                <div>
                                    <label style={{textAlign: "left"}}>XL:</label>
                                    <input type="number" name="sizes.XL" value={product.sizes.XL} onChange={handleChange} min={0}/>
                                </div>
                                <div>
                                    <label style={{textAlign: "left"}}>XXL:</label>
                                    <input type="number" name="sizes.XXL" value={product.sizes.XXL} onChange={handleChange} min={0}/>
                                </div>
                                <div>
                                    <label style={{textAlign: "left"}}>XXXL:</label>
                                    <input type="number" name="sizes.XXXL" value={product.sizes.XXXL} onChange={handleChange} min={0}/>
                                </div>
                            </div>
                            <button type="submit" style={{maxWidth: "50%"}}>Add Product</button>
                        </form>
                        <Footer />
                    </div>
                )
            }
        </>
    );
};

export default AddProducts;