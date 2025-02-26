import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button } from 'react-bootstrap';
import { auth, googleProvider } from './Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import './signup.css'

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
            // navigate('/');  // Uncomment if you'd like to navigate when logged in
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
                alert('Signup Successfully');
                // navigate('/Website');  // Uncomment if you'd like to navigate to the website after signup
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
        <Container className="signup-container mt-5">
            <h2 className="signup-title">{isSignup ? 'Sign Up' : 'Login'}</h2>
            {error && <p className="text-danger error-message">{error}</p>}
            <Form onSubmit={handleSubmit} className="signup-form">
                {isSignup && (
                    <Form.Group className="form-group">
                        <Form.Label className="form-label">Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="username" 
                            onChange={handleChange} 
                            className="form-control" 
                        />
                    </Form.Group>
                )}
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        required 
                        className="form-control" 
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        onChange={handleChange} 
                        required 
                        className="form-control" 
                    />
                </Form.Group>
                {isSignup && (
                    <>
                        <Form.Group className="form-group">
                            <Form.Label className="form-label">Confirm Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="confirmPassword" 
                                onChange={handleChange} 
                                className="form-control" 
                            />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label className="form-label">Mobile Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="mobile" 
                                onChange={handleChange} 
                                className="form-control" 
                            />
                        </Form.Group>
                    </>
                )}
                <Button type="submit" className="btn-submit mt-3">{isSignup ? 'Sign Up' : 'Login'}</Button>
                <Button onClick={handleGoogleLogin} className="btn-google mt-3">Signup With Google</Button>
            </Form>
            <Button variant="link" onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
                {isSignup ? 'Already have an account? Login' : 'Create an account'}
            </Button>
        </Container>
    );
}

export default Signup;
