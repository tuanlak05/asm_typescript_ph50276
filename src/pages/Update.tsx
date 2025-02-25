import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

type ProductInput = { name: string; image: string; price: number };

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm<ProductInput>();

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(({ data }) => reset(data))
            .catch(console.error);
    }, [id, reset]);

    const onSubmit = async (data: ProductInput) => {
        try {
            await axios.put(`http://localhost:3000/products/${id}`, data);
            alert("Cập nhật thành công");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Cập nhật sản phẩm</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true })} placeholder="Tên sản phẩm" />
                <input {...register("image", { required: true })} placeholder="Ảnh sản phẩm" />
                <input {...register("price", { required: true, min: 0 })} type="number" placeholder="Giá sản phẩm" />
                <button type="submit">Sửa</button>
            </form>
        </div>
    );
}

export default Update;
