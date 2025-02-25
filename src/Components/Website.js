import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar, NavDropdown, Card } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './API.css';
import { auth, googleProvider } from './Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

function Website() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [showCart, setShowCart] = useState(false); // Toggle between products and cart page
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(res => setProducts(res.data));
    }, []);
    
    // Add to Cart Function
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        setTotal(total + product.price);
    };

    // Decrease Quantity / Remove from Cart
    const decreaseQuantity = (productId) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return null;
            }
            return item;
        }).filter(item => item !== null);

        const removedItem = cart.find(item => item.id === productId);
        if (removedItem) {
            setTotal(total - removedItem.price);
        }

        setCart(updatedCart);
    };

    // Remove from Cart Function
    const removeFromCart = (index) => {
        const itemToRemove = cart[index];
        setCart(cart.filter((_, i) => i !== index));
        setTotal(total - itemToRemove.price);
    };

    // Logout function
    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('isLoggedIn');
            alert('Logged out successfully');
            // setUser(null);
            navigate('/Signup');
        } catch (error) {
            console.error('Logout Error:', error.message);
        }
    };

    return (
        <div>
            {/* Navbar Section */}
            <Navbar expand="lg" className="bg-body-tertiary nav">
                <Container>
                    <Navbar.Brand href="#">API Card Functions</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#">Home</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {/* Cart Icon */}
                        <Button variant="outline-dark" onClick={() => setShowCart(true)}>
                            <FaShoppingCart /> ({cart.length})
                        </Button>
                        <Link to='/Signup'>

                        <Button variant="outline-primary" className="ms-3" >Sign Up / Login</Button></Link>
                        <Button variant="outline-danger" className="ms-3" onClick={handleLogout}>Logout</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Toggle Between Product Page & Cart Page */}
            {showCart ? (
                <div className="container mt-4">
                    <h3>Shopping Cart</h3>
                    {cart.length === 0 ? <p>No items in cart</p> : (
                        <p className="list-group">
                            {cart.map((item, index) => (
                                <p key={index} className="list-group-item">
                                    <div className='div'>
                                        <p> {item.title} - ${item.price}</p>
                                        <div className='div-1'>
                                            <Button variant="black" size="sm" onClick={() => addToCart(item)}>+</Button>{item.quantity}
                                            <Button variant="black" size="sm" onClick={() => decreaseQuantity(item.id)}>-</Button>
                                            <Button variant="black" size="sm" onClick={() => removeFromCart(index)}>Remove</Button>
                                        </div>
                                    </div>
                                </p>
                            ))}
                        </p>
                    )}
                    <h4 className="mt-3">Total Price: ${total.toFixed(2)}</h4>
                    <Button variant="secondary" className="mt-3" onClick={() => setShowCart(false)}>Back to Products</Button>
                </div>
            ) : (
                <div className="card">
                    {products.map((product) => (
                        <Card key={product.id} style={{ width: '18rem' }}>
                            <Card.Body className='body'>
                                <Card.Img variant="top" src={product.image} style={{ height: "250px", width:"250px"}} />
                                <Card.Title className='tit'>{product.title}</Card.Title>
                                <Card.Text className='tex'>{product.description.substring(0, 100)}...</Card.Text>
                                <Card.Text><strong>Price:</strong> $ {product.price}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" className='button'>{product.category}</Button>
                                    <Button variant="success" onClick={() => addToCart(product)}>Add to Cart</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Website;