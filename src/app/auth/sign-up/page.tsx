'use client';

import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Success: show verification message
        alert('Verification email sent. Please check your inbox.');
      }
    } catch (err: any) {
      setError(err.message || 'Sign-up failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 p-6 bg-surface rounded-xl border border-border">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-border-input rounded bg-bg text-text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-border-input rounded bg-bg text-text"
          />
        </div>

        {error && <div className="text-danger text-sm">{error}</div>}

        <Button type="submit" className="w-full" isLoading={isLoading} disabled={!email || !password}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}
