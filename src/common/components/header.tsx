import { Home, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart-store";

export const Header = () => {
  const { cart } = useCartStore();

  return (
    <div className="flex px-4 items-center justify-between h-16 bg-red-500 text-white">
      <Link to={"/"}>
        <Home />
      </Link>

      <div className="flex items-center gap-4">
        <Link to={"/products"}>Tienda</Link>
        <Link to={"/cart"} className="cursor-pointer relative">
          <ShoppingCart />
          <label className="bg-blue-600 text-xs rounded-full w-4 h-4 absolute -top-2 -right-2">
            {cart.length}
          </label>
        </Link>
      </div>
    </div>
  );
};