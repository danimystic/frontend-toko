import React from 'react';
import styles from './Login.module.css';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import classes from './Login.module.css';

class Login extends React.Component {
    handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = data.redirectTo;
            } else {
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
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        Dann's Jacket World
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Do not have an account yet?{' '}
                        <Link to="/signup">
                            <Anchor size="sm" component="a" style={{ color: '#a1c5f8' }}>
                                Create account
                            </Anchor>
                        </Link>
                    </Text>

                    <Paper withBorder shadow="md" p={30} mt={30} radius="md" className={classes.paper}>
                        <form onSubmit={this.handleLogin} className={classes.form}>
                            <TextInput
                                label="Email"
                                placeholder="Your email"
                                name="email"
                                required
                                autoFocus
                            />
                            <PasswordInput
                                label="Password"
                                placeholder="Your password"
                                name="password"
                                required
                                mt="md"
                            />
                            <Button type="submit" fullWidth mt="xl" color='#f22e52' className={classes.button}>
                                Sign in
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        );
    }
}

export default Login;
