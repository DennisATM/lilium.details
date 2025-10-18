import api from "./axiosConfig";

export const getRecommendedProducts = async () => {
  const res = await api.get("/products");
  const data = res.data.data;
  
  return data.filter(product => product.isRecommended == true);
};

export const getProducts = async () => {
  const res = await api.get("/products");
  return res.data.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};

export const createProduct = async (product) => {
  const res = await api.post("/products", product);
  return res.data.data;
}
