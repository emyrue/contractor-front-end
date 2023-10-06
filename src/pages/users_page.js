import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/user/UserReducer';
import AdminPageUserDetails from '../components/user/admin_page_user_details';
import '../styles/usersPage.scss';

export default function UsersPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.isLoading);
  const allUsers = useSelector((state) => state.user.allUsers);

  useEffect(() => {
    if (user.role === 'admin') {
      dispatch(getAllUsers());
    }
  }, [dispatch, user]);

  return (
    <section className="users-page">
      { user.role === 'admin'
        && (
          <section className="users-page-section">
            <h1>All Users</h1>
            <ul className="users-list">
              { allUsers.map((oneUser) => (
                <AdminPageUserDetails oneUser={oneUser} key={`user-${oneUser.id}`} />
              ))}
            </ul>
          </section>
        )}
      { (user.role !== 'admin') && !loading
        && (
          <h1>
            This page is for admins only. You can register as an admin through your account page.
          </h1>
        )}
      { loading
        && (
          <h1>Loading...</h1>
        )}
    </section>
  );
}
