

export default async function getProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok){
            console.error('Failed to fetch products');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}