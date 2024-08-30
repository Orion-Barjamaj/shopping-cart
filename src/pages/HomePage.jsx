import { useEffect, useState } from "react";
import '../style/homepage.css';
import '../style/navbar.css';
import '../style/cart.css';
import { v4 as uuidv4 } from 'uuid';
import Shop from './Shop.jsx';
import { Link, Outlet } from "react-router-dom";

function Cart({show, setShow, cart, setCart}) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if(cart.length === 0){
            setTotal(0);
        }else {
            const total = cart.reduce((total, item) => {
                const count = item.itemCount || 1;
                return total + item.price * count;
            }, 0);
            setTotal(total.toFixed(1));
        }
    }, [cart]);

    const updateItemCount = (id, change) => {
        setCart(cart.map(item => 
            item.id === id 
                ? {...item, itemCount: item.itemCount + change} 
                : item
        ));
    };

    const deleteItem = (item) => {
        if(item.itemCount <= 1){
            const index = cart.findIndex(clothe => clothe.id === item.id);
            if(index !== -1){
                const updatedCart = [...cart];
                updatedCart.splice(index, 1);
                setCart(updatedCart);
            }
        }
    }

    const clotheItem = cart.map(item => 
        <div className="cartItem" key={uuidv4()}>
            <div className="cartImg" style={{backgroundImage: `url(${item.image})`}}></div>
            <div className="cartPriceName">
                <div className="cartName">{item.title}</div>
                <div className="cartPrice">${item.price}</div>
            </div>
            <div className="count">
                <button className="subtractBtn" onClick={() => {updateItemCount(item.id, -1); deleteItem(item);}}>-</button>
                <div>{item.itemCount}</div>
                <button className="addBtn" onClick={() => updateItemCount(item.id, 1)}>+</button>
            </div>
        </div>
    );

    return (
        <div className="cartContainer" style={show ? {right: '0'} : {right: '-600px', display: 'none'}}>
            <div className="cartTitle">YOUR CART</div>
            <div className="cartItems">{cart.length === 0 ? 'Nothing to show here' : clotheItem}</div>
            <button className="closeCart" onClick={() => setShow(false)}><div style={show === false ? {transform: 'rotate(0deg)', left: '5%'} : {transform: 'rotate(180deg)', left: '0%'}}></div></button>
            <div className="total">Total: ${total}</div>
        </div>
    );
}

function NavBar({setPage, page, cart, setCart, search, setSearch}){
    const [width, setWidth] = useState(150);
    const [pos, setPos] = useState(5);
    const [mobilePos, setMobilePos] = useState(-450);
    const [showCart, setShowCart] = useState(false);

    let convertToLowerCase = (e) => {
        let lowerCase = e.target.value.toLowerCase();
        setSearch(lowerCase);
    }

    return(
        <>
            <div className="navBar">
                <div className="navBarContent">
                    <div className="logoContainer">
                        <div className="threeLines" onClick={() => setMobilePos(0)}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                        <div className="logo" onClick={() => {setPage('Home'); setPos(5); setWidth(150)}}>SNAZZY</div>
                    </div>
                    <div className="menu">
                        <div className="whiteBg" style={{width: width+'px', left: pos+'px'}}></div>
                        <div className="menuItem" style={page === 'Home' ? {color: '#0A0908'} : {color: '#F2F4F3'}} onClick={() => {setPage('Home'); setPos(5); setWidth(150)}}><Link to='/' style={page === 'Home' ? {color: '#0A0908'} : {color: '#F2F4F3'}}>HOME</Link></div>
                        <div className="menuItem" style={page === 'Shop' ? {color: '#0A0908'} : {color: '#F2F4F3'}} onClick={() => {setPage('Shop'); setPos(150); setWidth(140)}}><Link to='Shop' style={page === 'Shop' ? {color: '#0A0908'} : {color: '#F2F4F3'}}>SHOP</Link></div>
                        <div className="menuItem" style={page === 'About Us' ? {color: '#0A0908'} : {color: '#F2F4F3'}} onClick={() => {setPage('About Us'); setPos(295); setWidth(200)}}>ABOUT US</div>
                    </div>
                    <div className="search">
                        <Link to='Shop'>
                            <div className="searchHandle">
                                <input type="text" className="searchInput" id='searchInput' name='searchInput' onChange={convertToLowerCase} onClick={() => {setPage('Shop'); setPos(150); setWidth(140)}}></input>
                                <label className="searchBtn" htmlFor='searchInput' onClick={() => setPage('Shop')}></label>
                            </div>
                        </Link>
                        <div className="cartBtn" onClick={() => {setShowCart(true)}}><div className="cartCount">{cart.length}</div></div>
                    </div>
                </div>
                <div className="line"></div>
            </div>
            <Cart show={showCart} setShow={setShowCart} cart={cart} setCart={setCart}/>
            <div className="mobileMenu" style={{left: `${mobilePos}px`}}>
                <div className="mobileMenuItem" onClick={() => {setPage('Home'); setMobilePos(-450)}}><Link to="/">HOME</Link></div>
                <div className="mobileMenuItem" onClick={() => {setPage('Shop'); setMobilePos(-450)}}><Link to='Shop'>SHOP</Link></div>
                <div className="mobileMenuItem" onClick={() => {setPage('About Us'); setMobilePos(-450)}}>ABOUT US</div>
            </div>
        </>
    )
}

function Home() {
    const [page, setPage] = useState('Home');
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search);
    document.body.style.overflow = 'hidden';
    
    return (
        <>
            <NavBar setPage={setPage} page={page} cart={cart} setCart={setCart} search={search} setSearch={setSearch}/>
            {page === 'Home' && 
            <div className="homePageContent">
                    <div className="secondSlogan">Crafted for <br></br>Ultimate <span className="border">Comfort</span></div>
                    <div className="manImg"></div>
                    <div className="backgroundText">SNAZZY</div>
            </div>}
            {page ==='Shop' && <Shop cart={cart} setCart={setCart} search={search}/>}
        </>
    );
}

export default Home;