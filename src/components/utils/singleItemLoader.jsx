// src/loaders/singleItemLoader.js
export async function singleItemLoader({ params }) {
  const { id } = params; // Extract the product ID from the URL
  const response = await fetch(
    `https://newtova-server.vercel.app/products/${id}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }
  const product = await response.json();
  return { product }; // Return the fetched data
}
