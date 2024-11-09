import { useState } from 'react';
import { Unlock } from 'lucide-react';

interface DecryptionFormProps {
  onDecrypt: (password: string) => void;
  loading: boolean;
}

export function DecryptionForm({ onDecrypt, loading }: DecryptionFormProps) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDecrypt(password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="decrypt-password" className="mb-1 block text-sm text-white">
          Password
        </label>
        <input
          type="password"
          id="decrypt-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg bg-white/20 px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          placeholder="Enter decryption password"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-purple-600 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-purple-600 border-t-transparent" />
        ) : (
          <>
            <Unlock className="h-5 w-5" />
            Decrypt File
          </>
        )}
      </button>
    </form>
  );
}
