
export const Contact = () => {
    return(
        <>
        <div className="relative row">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Contacto" className="w-full h-64 object-cover"/>
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold bg-[#6A8F6B] bg-opacity-40 px-6 py-2 rounded">Contáctanos</h1>
            </div>
        </div>
        <div className="text-center mt-20 mb-20">
            
            <p className="text-lg mb-8">¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ayudarte.</p>
            <form className="max-w-md mx-auto">
                <div className="mb-4 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Nombre
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                    />
                </div>
                <div className="mb-4 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="   Tu correo electrónico"
                    />
                </div>  
                <div className="mb-4 text-left">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Mensaje
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        rows="4"
                        placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                </div>
                <button
                    className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Enviar Mensaje
                </button>
            </form> 

        </div>
        </>
    )
}