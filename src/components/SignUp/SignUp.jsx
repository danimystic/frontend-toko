import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import styles from './SignUp.module.css';
import {
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Anchor
} from '@mantine/core';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/signup', {
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
            <Container size={420} my={40}>
                <Title ta="center" className={styles.title}>
                    Create an Account
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Already have an account?{' '}
                    <Link to="/login">
                        <Anchor size="sm" component="a" style={{ color: '#a1c5f8' }}>
                            Sign in
                        </Anchor>
                    </Link>
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <form onSubmit={handleSignup} className={styles.form}>
                        <TextInput
                            label="Username"
                            placeholder="Your username"
                            inputMode='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            autoFocus
                        />
                        <TextInput
                            label="Email"
                            placeholder="Your email"
                            value={email}
                            inputMode='email'
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            mt="md"
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            mt="md"
                        />
                        <Button type="submit" fullWidth mt="xl" color='#f22e52' className={styles.button}>
                            Sign Up
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default SignUp;
