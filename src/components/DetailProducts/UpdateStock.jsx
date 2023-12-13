import React, { useState, useEffect } from 'react';
import styles from './UpdateStock.module.css';

const UpdateStock = ({ productId, onModifiedStatus}) => {
    const [sizes, setSizes] = useState({});
    const [originalSizes, setOriginalSizes] = useState({});

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/products/stock/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setSizes(data.reduce((acc, curr) => ({ ...acc, [curr.size]: curr.stock }), {}));
                    setOriginalSizes(data.reduce((acc, curr) => ({ ...acc, [curr.size]: curr.stock }), {}));
                } 
                else {
                    console.error('Error fetching stock');
                }
            } 
            catch (error) {
                console.error(error);
            }
        };
        fetchStock();
    }, [productId]);

    const handleChange = (size, stock) => {
        setSizes((prevSizes) => ({ ...prevSizes, [size]: parseInt(stock) }));
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+`/products/stock/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ sizes })
            });

            if (response.status === 200) {
                onModifiedStatus(200);
                setOriginalSizes(sizes);
            } 
            else {
                console.error('Error updating stock');
                onModifiedStatus(500);
            }
        } 
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.updateStock}>
            <h2 style={{marginBottom: "5px", marginTop: "0px"}}>Update Stock</h2>
            {Object.entries(sizes).map(([size, stock]) => (
                <div key={size}>
                    <label className={styles.labelSize}>{size}:</label>
                    <input className={styles.inputStock}
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => handleChange(size, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={handleUpdate} disabled={JSON.stringify(sizes) === JSON.stringify(originalSizes)} className={styles.submitUpdate}>
                Update
            </button>
        </div>
    );
};

export default UpdateStock;
