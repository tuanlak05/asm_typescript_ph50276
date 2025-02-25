import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.css";

// Định nghĩa kiểu dữ liệu cho form
interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const navigate = useNavigate();

  // Xử lý khi submit form
  const onSubmit = async (data: LoginFormData) => {
    try {
      // Lấy danh sách người dùng từ db.json
      const response = await axios.get("http://localhost:3000/users", {
        params: { email: data.email, password: data.password },
      });

      const user = response.data[0]; // Vì email + password là duy nhất

      if (user) {
        localStorage.setItem("token", user.accessToken);
        alert("Đăng nhập thành công!");
        navigate("/");
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  return (
    <div className="all" style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label style={{ color: "black" }}>Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Email không hợp lệ",
              },
            })}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <label style={{ color: "black" }}>Mật khẩu:</label>
          <input
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

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
