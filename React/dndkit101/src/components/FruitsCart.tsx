import { useState } from 'react';
import styles from '../App.module.css'; 
import { fruits } from "../constants";
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import CartDroppable from './CartDroppable';
import FruitDraggable from './FruitDraggable';

function FruitsCart(){
  const [cartItems, setCartItems] = useState<string[]>([]);

  const addItemsToCart = (e: DragEndEvent) => {
    const newItem = e.active.data.current?.title;
    if(e.over?.id !== 'cart-droppable' || !newItem ) return;
    const temp = [...cartItems];
    temp.push(newItem);
    setCartItems(temp);
  };

  return (
  <DndContext onDragEnd={addItemsToCart}>
  <main className={styles.main}>
    <div className={styles['fruit-list-section']}>
      <h1>Fruit List</h1>
      <ul className={styles['fruit-list']}>
        {fruits.map(fruit=>{
          return <FruitDraggable key={fruit}>
            {fruit}
          </FruitDraggable>;
        })}
      </ul>
    </div>
    <div className={styles['cart-section']}>
      <h1>My Cart</h1>
      <CartDroppable items={cartItems}/>
    </div>
  </main>
  </DndContext>);
}

export default FruitsCart;