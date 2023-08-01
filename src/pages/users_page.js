import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../redux/user/UserReducer';

export default function UsersPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <section />
  );
}
