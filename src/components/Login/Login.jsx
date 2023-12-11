import React from 'react';
import styles from './Login.module.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
            const response = await fetch('http://localhost:9000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if(data.success) {
                window.location.href = data.redirectTo;
            } 
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Username atau password salah. Silahkan coba lagi.',
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    render() {
        return (
            <div className={styles["login-container"]}>
                <div className={styles['login-box']}>
                    <h1 className={styles['logo']}>Dann's Jacket World</h1>
                    <h3>Login</h3>
                    <form onSubmit={this.handleLogin}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" name="email" required />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <div className={styles["button-group"]}>
                            <button type="submit" className={styles["login-button"]}>Login</button>
                            <Link to='/signup' type="button" className={styles["signup-button"]}>Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
