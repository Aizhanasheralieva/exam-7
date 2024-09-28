import "./App.css";
import { useState } from "react";
import cutleryImage from "./assets/cutlery.png";
import coffeeCupImage from "./assets/coffee-cup.png";

interface Item {
  name: string;
  price: number;
  image: string;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

const ITEMS: Item[] = [
  { name: "hamburger", price: 80, image: cutleryImage },
  { name: "cheeseburger", price: 90, image: cutleryImage },
  { name: "fries", price: 45, image: cutleryImage },
  { name: "coffee", price: 70, image: coffeeCupImage },
  { name: "tea", price: 50, image: coffeeCupImage },
  { name: "cola", price: 40, image: coffeeCupImage },
];

const App = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addItem = (itemName: string, itemPrice: number) => {
    const existingItem = order.find((item) => item.name === itemName);
    if (existingItem) {

      const updatedOrder = order.map((item) =>
        item.name === itemName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setOrder(updatedOrder);
    } else {

      setOrder([...order, { name: itemName, price: itemPrice, quantity: 1 }]);
    }
    setTotalPrice((prevTotal) => prevTotal + itemPrice);
  };

  const removeItem = (itemName: string) => {
    const itemToRemove = order.find(item => item.name === itemName);

    if (itemToRemove) {
      const updatedOrder = order.filter(item => item.name !== itemName);
      setOrder(updatedOrder);
      setTotalPrice((prevTotal) => prevTotal - itemToRemove.price * itemToRemove.quantity);
    }
  };

  return (
    <div className="container">
      <div className="order-details">
        <h3>Order Details</h3>
        <div id="order-list">
          {order.length === 0 ? (
            <div className="order-info">
              Order is empty! <br/> Please, add some items!
            </div>
          ) : (
            order.map((item) => (
              <div key={item.name} className="order-item">
                {item.name} x{item.quantity} - {item.price * item.quantity} KGS
                <button className="remove-btn" onClick={() => removeItem(item.name)}>X</button>
              </div>
            ))
          )}
        </div>
        <hr/>
        <p><strong>Total price: </strong>{totalPrice} KGS</p>
      </div>

      <div className="add-items">
        <h3>Add Items</h3>
        {ITEMS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => addItem(item.name, item.price)}
          >
            <img width={40} src={item.image} alt={item.name}/>
            <p>
              {item.name.toUpperCase()}
              <div>Price: {item.price} KGS</div>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
