import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ProductInput = {
    name: string;
    image: string;
    price: number;
};

function Add() {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductInput>();
    const navigate = useNavigate();

    const onAdd: SubmitHandler<ProductInput> = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/products", data);
            if (res.status === 201) {
                alert("Thêm sản phẩm thành công!");
                navigate("/");
            }
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm:", error);
        }
    };

    return (
        <div>
            <h1>Thêm sản phẩm</h1>
            <form onSubmit={handleSubmit(onAdd)}>
                <div>
                    <label>Tên sản phẩm</label>
                    <input type="text" {...register("name", { required: "Tên sản phẩm không được để trống" })} />
                    {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                </div>
                <div>
                    <label>Ảnh sản phẩm</label>
                    <input type="text" {...register("image", { required: "Ảnh sản phẩm không được để trống" })} />
                    {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
                </div>
                <div>
                    <label>Giá sản phẩm</label>
                    <input type="number" {...register("price", { required: "Giá sản phẩm không được để trống", min: 1 })} />
                    {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
                </div>
                <button type="submit">Thêm</button>
            </form>
        </div>
    );
}

export default Add;
