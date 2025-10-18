import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/user";

const handleSubmit = async (event, setError, navigate) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const response = await loginUser({ email, password });
        console.log("Login exitoso:", response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user.firstName));
        setError("");
        navigate("/dashboard");
    } catch (error) {
        setError("Credenciales incorrectas o error de conexión.");
    }
    form.reset();
};

export const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    return (
        <>
            <form onSubmit={e => handleSubmit(e, setError, navigate)}>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <img
                                className="mx-auto h-45 w-auto rounded-full"
                                src="./public/imgBases/logolilium.jpg"
                                alt="Your Company"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Ingresa a tu cuenta</h2>
                            <h4 className="text-center text-gray-500">( Sólo administradores )</h4>
                        </div>
                        <div className="mt-8 space-y-6">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">Email</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-emerald-200 focus:border-emerald-600 focus:z-10 sm:text-sm"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="password" className="sr-only">Contraseña</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-emerald-600 focus:z-10 sm:text-sm"
                                        placeholder="Contraseña"
                                    />
                                </div>
                            </div>
                            {error && (
                                <div className="text-red-500 text-sm text-center mt-2">{error}</div>
                            )}
                            <div>
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Ingresar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}