import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export const NavbarAdmin = ({setToken}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <Link to="/admin/products" className="text-white hover:text-emerald-300 font-semibold">
          Productos
        </Link>
        <Link to="/admin/orders" className="text-white hover:text-emerald-300 font-semibold">
          Pedidos
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center text-white hover:text-red-400"
        title="Salir"
      >
        <ArrowRightOnRectangleIcon className="h-6 w-6 mr-1" />
        Salir
      </button>
    </nav>
  );
};