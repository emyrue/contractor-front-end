import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.user.user);
  return (
    <section>
      {user.name}
    </section>
  );
}
