import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/user/UserReducer';

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
        { allUsers.map((user) => (
          <li key={`user-${user.id}`}>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            { user.contractor.name
                && (
                  <ul>
                    <li>
                      Contractor Name:
                      {' '}
                      {user.contractor.name}
                    </li>
                    <li>
                      Rate:
                      {' '}
                      $
                      {user.contractor.rate}
                      /hr
                    </li>
                    <li>
                      Rating:
                      {' '}
                      {user.contractor.rating}
                      {' '}
                      stars
                      (
                      {' '}
                      {user.contractor.number_of_reviews}
                      {' '}
                      reviews
                      )
                    </li>
                  </ul>
                )}
          </li>
        ))}
      </ul>
    </section>
  );
}
