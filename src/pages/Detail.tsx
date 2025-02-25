import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type Product = {
    id:number,
    name:string,
    image:string,
    price:number
}
function Detail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:3000/products/${id}`)
            .then(({ data }) => setProduct(data))
            .catch(console.error)
    }, [id]);

    if (!product) return <p>Không tìm thấy sản phẩm.</p>;

    return (
        <div>
            <h1>Chi tiết sản phẩm</h1>
            <img src={product.image} alt={product.name} width="200" />
            <p><strong>Tên:</strong> {product.name}</p>
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Giá:</strong> {product.price} VND</p>
        </div>
    );
}

export default Detail;
