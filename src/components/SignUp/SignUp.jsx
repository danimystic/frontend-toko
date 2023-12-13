import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import styles from './SignUp.module.css'; 

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = data.redirectTo;
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Successful',
                    text: 'You have successfully registered.',
                });
            } else {
                const data = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Signup Failed',
                    text: data.message || 'Failed to register user.',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An unexpected error occurred. Please try again later.',
            });
        }
    };

    return (
        <div className={styles["signup-container"]}>
            <div className={styles["signup-box"]}>
                <h2>Sign Up</h2>
                <form>
                    <div className={styles["form-group"]}>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={handleSignup}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
