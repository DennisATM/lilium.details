import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContex";

export const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const [copied, setCopied] = useState(null);

  const subtotalFor = (item) => (Number(item.price || 0) * Number(item.quantity || 0));
  const total = useMemo(() => (Array.isArray(cart) ? cart.reduce((s, it) => s + subtotalFor(it), 0) : 0), [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyer((b) => ({ ...b, [name]: value }));
  };

  const handleIncrease = (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    updateQuantity(id, (Number(item.quantity) || 0) + 1);
  };
  const handleDecrease = (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    updateQuantity(id, (Number(item.quantity) || 0) - 1);
  };
  const handleRemove = (id) => removeFromCart(id);

  const validateBuyer = () => {
    if (!buyer.fullName.trim()) return "Ingrese nombre completo.";
    if (!buyer.email.trim()) return "Ingrese email.";
    // email simple check
    if (!/\S+@\S+\.\S+/.test(buyer.email)) return "Email inválido.";
    if (!buyer.phone.trim()) return "Ingrese teléfono.";
    return "";
  };

  const handleGenerateOrder = async () => {
    setError("");
    const v = validateBuyer();
    if (v) {
      setError(v);
      return;
    }
    if (!cart || cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    setLoading(true);
    try {
      // Simular petición para generar pedido
      await new Promise((res) => setTimeout(res, 900));
      // Aquí podrías llamar a tu API: createOrder({ buyer, cart, total, paymentMethod: 'transfer' })
      // limpiar carrito
      clearCart();
      setSuccess({
        orderId: `ORD-${Date.now()}`,
        message: `Orden generada correctamente. Realice la transferencia con los datos indicados.`,
      });
      // opcional: navegar a página de confirmación
      // navigate("/order-success");
    } catch (err) {
      setError("Error al generar el pedido. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      // limpiar indicador después de corto tiempo
      setTimeout(() => {
        setCopied((cur) => (cur === key ? null : cur));
      }, 1500);
    } catch (err) {
      console.error("No se pudo copiar:", err);
      setError("No se pudo copiar al portapapeles.");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Transferencia + Buyer */}
        <div className="md:col-span-2 space-y-6">
          {/* Transferencia */}
          <section className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-3">Datos para transferencia</h3>
            <p className="text-sm text-gray-600 mb-4">
              Tras generar el pedido, realiza la transferencia indicando el código de pedido como referencia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-gray-100 p-3 rounded">
                <div className="text-xs text-gray-500">Banco</div>
                <div className="font-medium">Banco Estado (Cuenta Cte.)</div>
              </div>
              <div className="bg-gray-100 p-3 rounded flex flex-col">
                <div className="text-xs text-gray-500">Titular</div>
                <div className="font-medium">Inés Yuquis P.</div>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <div className="text-xs text-gray-500">RUT</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">21.828.629-1</span>
                  <div className="flex items-center">
                    {copied === "rut" ? (
                      <span className="text-sm text-emerald-600 font-semibold ml-3">Copiado ✓</span>
                    ) : (
                      <button
                        onClick={() => copyToClipboard("21.828.629-1", "rut")}
                        className="ml-3 text-sm text-emerald-600 hover:underline"
                      >
                        Copiar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-3 rounded">
                <div className="text-xs text-gray-500">Nro. Cuenta</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">51700100344</span>
                  <div className="flex items-center">
                    {copied === "alias" ? (
                      <span className="text-sm text-emerald-600 font-semibold ml-3">Copiado ✓</span>
                    ) : (
                      <button
                        onClick={() => copyToClipboard("51700100344", "alias")}
                        className="ml-3 text-sm text-emerald-600 hover:underline"
                      >
                        Copiar
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded">
                <div className="text-xs text-gray-500">Email</div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">lilium.detalles26@gmail.com</span>
                  <div className="flex items-center">
                    {copied === "alias" ? (
                      <span className="text-sm text-emerald-600 font-semibold ml-3">Copiado ✓</span>
                    ) : (
                      <button
                        onClick={() => copyToClipboard("lilium.detalles26@gmail.com", "alias")}
                        className="ml-3 text-sm text-emerald-600 hover:underline"
                      >
                        Copiar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 bg-yellow-50 border-l-4 border-yellow-300 p-3 rounded text-sm text-yellow-800">
                Recuerda: hasta que no recibamos la constancia de la transferencia el pedido quedará en estado "pendiente".
              </div>
            </div>
          </section>

          {/* Buyer info */}
          <section className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-3">Datos del comprador</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="fullName"
                value={buyer.fullName}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <input
                name="email"
                value={buyer.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                type="email"
              />
              <input
                name="phone"
                value={buyer.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <input
                name="address"
                value={buyer.address}
                onChange={handleChange}
                placeholder="Dirección (opcional)"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <textarea
                name="note"
                value={buyer.note}
                onChange={handleChange}
                placeholder="Notas para el pedido (opcional)"
                className="sm:col-span-2 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
                rows={3}
              />
            </div>

            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
            {success && success.message && (
              <div className="mt-3 text-sm text-green-700">{success.message}</div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGenerateOrder}
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-60"
              >
                {loading ? "Generando pedido..." : "Generar pedido"}
              </button>
              <button
                onClick={() => navigate("/shopee")}
                className="w-full sm:w-auto px-4 py-2 border rounded hover:bg-gray-100"
              >
                Seguir comprando
              </button>
            </div>
          </section>
        </div>

        {/* Right: Order Summary */}
        <aside className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Detalle del pedido</h3>

          {(!cart || cart.length === 0) ? (
            <div className="text-sm text-gray-600">No hay productos en la bolsa.</div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  {/* <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" /> */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">${Number(item.price || 0).toFixed(0)}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${subtotalFor(item).toFixed(0)}</div>
                        <button onClick={() => handleRemove(item.id)} className="text-xs text-red-600 hover:underline mt-1">Eliminar</button>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => handleDecrease(item.id)} className="px-2 py-1 bg-gray-100 rounded">−</button>
                      <div className="px-3">{item.quantity || 1}</div>
                      <button onClick={() => handleIncrease(item.id)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="border-t pt-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Envío</span>
                  <span>Calculado luego</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-3">
                  <span>Total</span>
                  <span>${total.toFixed(0)}</span>
                </div>
              </div>

              <div className="mt-3">
                <button onClick={() => clearCart()} className="w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">Vaciar bolsa</button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
