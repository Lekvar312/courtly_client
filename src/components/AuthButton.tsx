import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";

const AuthButton = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (user) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };
  return (
    <button
      onClick={handleClick}
      className={`${
        user ? "bg-red-500 hover:bg-red-600" : "bg-sky-500  hover:bg-sky-600"
      } text-white px-3 py-1.5 rounded transition-all cursor-pointer text-lg`}
    >
      {user ? "Вийти" : "Увійти"}
    </button>
  );
};

export default AuthButton;
