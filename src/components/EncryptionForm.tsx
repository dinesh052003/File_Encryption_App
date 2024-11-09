import { useState } from 'react';
import { Lock } from 'lucide-react';

interface EncryptionFormProps {
  onEncrypt: (password: string) => void;
  loading: boolean;
}

export function EncryptionForm({ onEncrypt, loading }: EncryptionFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onEncrypt(password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Enter encryption password"
          required
          minLength={8}
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="mb-1 block text-sm text-white">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Confirm encryption password"
          required
        />
        {password && confirmPassword && password !== confirmPassword && (
          <p className="mt-1 text-sm text-red-300">Passwords do not match</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || password !== confirmPassword}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-purple-600 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
        ) : (
          <>
            <Lock className="h-5 w-5" />
            Encrypt File
          </>
        )}
      </button>
    </form>
  );
}
