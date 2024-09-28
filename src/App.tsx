import "./App.css";
import {useState} from "react";

interface Props {
  name: string;
  price: number;
  quantity: number;
}

const App = () => {
  const [order, setOrder] = useState<Props[]>([]);
  const addItem = (itemName: string, itemPrice: number) => {
    const existingItem = order.find((item) => item.name === itemName);
    if (existingItem) {
      const recentOrder = order.map(item =>
        item.name === itemName ? {...item, quantity: item.quantity + 1} : item
      );
      setOrder(recentOrder);
    } else {
      setOrder([...order, {name: itemName, price: itemPrice, quantity: 1}]);
    }
  };

  return (
    <div className="container">
      <div className="order-details">
        <h3>Order Details</h3>
        <div id="order-list">
          {order.length === 0 ? (<div>Order is empty! <br/> Please, add some items!</div>)
            : (
              order.map(item => (
                <div key={item.name} className="order-item">
                  {item.name} x{item.quantity} {item.price} * {item.quantity} KGS;
                </div>
              )))
          }

        </div>

      </div>
      <div className="add-items">
        <h3>Add Items</h3>
        <button onClick={() => addItem('Hamburger', 80)}><strong>Hamburger</strong> <div>Price: 80 KGS</div></button>

      </div>

    </div>
  );
};


export default App;
