import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/user/UserReducer';
import AdminPageUserDetails from '../components/user/admin_page_user_details';

export default function UsersPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, user]);

  return (
    <section>
      <h1>All Users</h1>
      <ul>
        { allUsers.map((oneUser) => (
          <AdminPageUserDetails oneUser={oneUser} key={`user-${oneUser.id}`} />
        ))}
      </ul>
    </section>
  );
}
