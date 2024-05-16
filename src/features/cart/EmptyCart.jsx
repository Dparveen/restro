import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div>
      <Link to="/menu">&larr; Back to menu</Link>

      <p>Your cart is still empty. Start adding some Order :)</p>
    </div>
  );
}

export default EmptyCart;
