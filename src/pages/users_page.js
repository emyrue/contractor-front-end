import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/user/UserReducer';

export default function UsersPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [user]);

  return (
    <section />
  );
}
