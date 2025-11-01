import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api/product';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export const ProdAdmin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        stock: '',
        isRecommended: false,
    });

    // Cargar productos
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            setError('Error al cargar productos');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async(e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Por favor, suba un archivo de imagen válido.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('El tamaño de la imagen no debe exceder los 5MB.');
            return;
        }

        try { 
            const formData = new FormData();
            formData.append('image', file);
            
            const response = await fetch('https://lilium-api.onrender.com/api/v1/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Error al subir imagen');

            const data = await response.json();
            
            // Construir URLs completas usando la URL base del servidor
            const imageUrl = `https://lilium-api.onrender.com/imgProducts/${data.imageUrl}`;
            
            setCurrentProduct(prev => ({
                ...prev,
                imageUrl: imageUrl // guardar URL completa
            }));
            setImagePreview(imageUrl); // usar la misma URL completa para el preview
            
        } catch (err) {
            console.error(err);
            setError('Error al subir la imagen');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        const val = name === 'isRecommended' ? (value === 'true'): value;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: val
        }));
    };

    const resetForm = () => {
        setCurrentProduct({
            name: '',
            description: '',
            price: '',
            imageUrl: '',
            category: '',
            stock: ''
        });
        setIsEditing(false);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            if (isEditing) {
                await updateProduct(currentProduct.id, currentProduct);
            } else {
                await createProduct(currentProduct);
            }
            loadProducts();
            resetForm();
        } catch (err) {
            setError('Error al guardar el producto');
            console.error(err);
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Está seguro de eliminar este producto?')) return;
        
        try {
            await deleteProduct(id);
            loadProducts();
        } catch (err) {
            setError('Error al eliminar el producto');
            console.error(err);
        }
    };

    if (loading) return <div className="flex justify-center p-8">Cargando...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                {/* Formulario */}
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                        </h3>
                    </div>
                </div>

                <div className="mt-5 md:mt-0 md:col-span-2">
                    <form onSubmit={handleSubmit}>
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                {error && (
                                    <div className="text-red-600 text-sm">{error}</div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currentProduct.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Descripción
                                    </label>
                                    <textarea
                                        name="description"
                                        rows="3"
                                        value={currentProduct.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Precio
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={currentProduct.price}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            value={currentProduct.stock}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Categoría
                                        </label>
                                        <select
                                            name="category"
                                            value={currentProduct.category}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        >
                                            <option value="">Seleccionar...</option>
                                            <option value="Velas">Velas</option>
                                            <option value="Ambientadores">Ambientadores</option>
                                            <option value="Difusores">Difusores</option>
                                            <option value="Detalles">Detalles</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Recomendado
                                    </label>
                                    <select                                        name="isRecommended"
                                        value={String(currentProduct.isRecommended)}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-40 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                                    >
                                        <option value="false">No</option>
                                        <option value="true">Sí</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Imagen del Producto
                                    </label>
                                    <div className="mt-2 flex items-center gap-4">
                                        {/* Preview de la imagen */}
                                        {(imagePreview || currentProduct.imageUrl) && (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview || currentProduct.imageUrl}
                                                    alt="Preview"
                                                    className="w-24 h-24 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setImagePreview(null);
                                                        setCurrentProduct(prev => ({...prev, imageUrl: ''}));
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="sr-only"
                                                id="image-upload"
                                            />
                                            <label
                                                htmlFor="image-upload"
                                                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                            >
                                                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                                                </svg>
                                                Seleccionar imagen
                                            </label>
                                            <p className="mt-1 text-xs text-gray-500">
                                                PNG, JPG, GIF hasta 5MB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    {isEditing ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Tabla de productos */}
            <div className="mt-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Productos</h1>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Imagen
                                            </th>
                                             <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Recomendado
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Nombre
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Categoría
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Precio
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Stock
                                            </th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Acciones</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {product.isRecommended ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Sí</span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">No</span>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                                    {product.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {product.category}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    ${product.price}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {product.stock}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-emerald-600 hover:text-emerald-900 mr-4"
                                                    >
                                                        <PencilIcon className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};