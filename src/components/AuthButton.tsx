import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/userSlice';

const AuthButton = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleClick = async () => {
    if(token) {
      await dispatch(logoutUser())
    }else{
      navigate('/login')
    }
  }
  return (
    <button
    onClick={handleClick}
      className={`${token ? "bg-red-500 hover:bg-red-600" : "bg-sky-500  hover:bg-sky-600"  } text-white px-3 py-1.5 rounded transition-all cursor-pointer text-lg`}>
        {token ? "Вийти" : "Увійти"}
    </button>
  )
}

export default AuthButton