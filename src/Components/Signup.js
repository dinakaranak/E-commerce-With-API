import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import { auth, googleProvider } from './Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

function Signup() {
    const [isSignup, setIsSignup] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            // navigate('/');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isSignup) {
            if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.mobile) {
                setError('All fields are required');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            try {
                await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                localStorage.setItem('isLoggedIn', 'true');
                alert('Signup Successfully')
                // navigate('/Website');
            } catch (error) {
                setError(error.message);
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
                localStorage.setItem('isLoggedIn', 'true');
            
                navigate('/Website');
            } catch (error) {
                setError('Invalid email or password');
            }
        }
    };
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            alert(`Welcome ${result.user.displayName}`);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/Website');
        } catch (error) {
            console.error('Google Login Error:', error.message);
        }
    };

    return (
        <Container className="mt-5">
            <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
                {isSignup && (
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" onChange={handleChange} />
                    </Form.Group>
                )}
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} required />
                </Form.Group>
                {isSignup && (
                    <>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" name="mobile" onChange={handleChange} />
                        </Form.Group>
                    </>
                )}
                <Button type="submit" className="mt-3">{isSignup ? 'Sign Up' : 'Login'}</Button>
                <Button onClick={handleGoogleLogin}>Signup With google</Button>
            </Form>
            <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already have an account? Login' : 'Create an account'}
            </Button>
        </Container>
    );
}

export default Signup;
