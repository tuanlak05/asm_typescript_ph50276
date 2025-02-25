import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Register.css";
 

// Định nghĩa kiểu dữ liệu cho form
interface RegisterFormData {
  email: string;
  password: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({ mode: "onChange" });

  const navigate = useNavigate();

  // Xử lý khi submit form
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await axios.post("http://localhost:3000/users", data);
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Tài khoản đã tồn tại !");
    }
  };

  return (
    <div className="all" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="emaill">
          <label style={{color:"black"}}>Email:</label>
          <input
            type="email" placeholder="Nhap email..."
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Email phải đúng định dạng Gmail (@gmail.com)",
              },
            })}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <label style={{color:"black"}}>Mật khẩu:</label>
          <input placeholder="Nhap password..."
            type="password"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={!isValid}>Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
