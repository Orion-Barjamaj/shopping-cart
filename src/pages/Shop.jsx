import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import '../style/shop.css';

function Shop({cart, setCart, search}){
    const [clothes, setClothes] = useState([]);

    document.body.style.overflow = 'visible';
    document.body.style.overflowX = 'hidden';

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', {mode: 'cors'})
        .then(res=>res.json())
        .then(json=>{            
            const clothesWithItemCount = json.map(item => ({
                ...item,
                itemCount: 1
            }));
            setClothes(clothesWithItemCount);
        })
    }, []);

    const checkForExistingItems = (itemInfo) => {
        const itemInCart = cart.find(item => item.title === itemInfo.title);
        return itemInCart;
    }

    const updateItemCount = (id, change) => {
        setCart(cart.map(item => 
            item.id === id 
                ? { ...item, itemCount: item.itemCount + change } 
                : item
        ));
    };

    const filteredData = clothes.filter((el) => {
        if(search === ''){
            return el;
        }
        else {
            return el.title.toLowerCase().includes(search);
        }
    }) 

    const clotheItem = filteredData.map(item => 
        <div className="clotheItem" key={uuidv4()}>
            <div className="clotheImg" style={{backgroundImage: `url(${item.image})`}}></div>
            <div className="details">
                <div className="priceName">
                    <div className="itemName">{item.title}</div>
                    <div className="itemPrice">${item.price}</div>
                </div>
                <button className="addCart" onClick={() => {(checkForExistingItems(item) ? updateItemCount(item.id, 1) : setCart([...cart, item])); console.log(item.itemCount)}}><div>+</div></button>
            </div>
        </div>
    );

    return ( 
        <div className="clothesContainer">
            {clotheItem}
        </div>
    )
}

export default Shop;