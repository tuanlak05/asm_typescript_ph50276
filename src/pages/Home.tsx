import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

// Định nghĩa kiểu dữ liệu sản phẩm
type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
};

function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        axios.get("http://localhost:3000/products")
            .then(({ data }) => setProducts(data))
            .catch(console.error);
    }, []);

    const deleteProduct = async (id: number) => {
        if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            alert("Xóa thành công");
            setProducts(products.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                {/* <div className="logo">Tuantm</div> */}
                <div  className="nav">
                    <nav>
                        <Link to="/">Trang chủ</Link>
                        <Link to="/add">Thêm sp</Link>
                        <Link to="/register">Đăng Ký</Link>
                        <Link to="/login">Đăng nhập</Link>
                    </nav>
                </div>
                <div className="search_bar">
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                </div>
            </header>

            {/* Main Content */}
            <section className="main_all">
                <div className="main_trai">
                    <h2>Danh sách yêu thích</h2>
                    <ul>
                        <li><a href="#">san pham 1</a></li>
                        <li><a href="#">san pham 1</a></li>
                        <li><a href="#">san pham 1</a></li>
                        <li><a href="#">san pham 1</a></li>
                        <li><a href="#">san pham 1</a></li>
                        <li><a href="#">san pham 1</a></li>
                        <li><a href="#">san pham 1</a></li>
                        <li><a href="#">san pham 1</a></li>
                    </ul>
                </div>
                <div className="main_phai">
                    <h1>Sản phẩm</h1>
                    <div className="product-grid">
                        {products.map((item) => (
                            <div className="product-card" key={item.id}>
                                <img src={item.image} alt={item.name} className="product-image" />
                                <h3 className="product-name">{item.name}</h3>
                                <p className="product-price">{item.price} VND</p>
                                <div className="product-actions">
                                    <Link to={`/update/${item.id}`} className="edit-btn">Sửa</Link>
                                    <button onClick={() => deleteProduct(item.id)} className="delete-btn">Xóa</button>
                                    <Link to={`/detail/${item.id}`} className="detail-btn">Chi tiết</Link>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 Apple Gold. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
