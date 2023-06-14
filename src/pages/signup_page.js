import { useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');

  return (
    <section>
      <h1>Sign In</h1>
      <form>
        <label htmlFor="login-email">
          <input
            type="text"
            name="login-email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </form>
    </section>
  );
}
