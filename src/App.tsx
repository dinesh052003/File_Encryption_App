import { useState } from 'react';
import { Shield, Lock, Unlock, Upload, Download, AlertCircle } from 'lucide-react';
import { FileUploader } from './components/FileUploader';
import { EncryptionForm } from './components/EncryptionForm';
import { DecryptionForm } from './components/DecryptionForm';
import { encryptFile, decryptFile } from './utils/crypto';
import { downloadFile } from './utils/download';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const handleEncrypt = async (password: string) => {
    if (!file) return;

    try {
      setLoading(true);
      setError('');

      const encryptedData = await encryptFile(file, password);
      downloadFile(
        new Blob([encryptedData], { type: 'application/octet-stream' }),
        `${file.name}.encrypted`
      );
    } catch (err) {
      setError('Failed to encrypt file. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrypt = async (password: string) => {
    if (!file) return;

    try {
      setLoading(true);
      setError('');

      const decryptedData = await decryptFile(file, password);
      const fileName = file.name.endsWith('.encrypted')
        ? file.name.slice(0, -9)
        : `decrypted_${file.name}`;

      downloadFile(
        new Blob([decryptedData], { type: 'application/octet-stream' }),
        fileName
      );
    } catch (err) {
      setError('Failed to decrypt file. Please check your password and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Shield className="h-8 w-8 text-white" />
          <h1 className="text-3xl font-bold text-white">Secure File Encryption</h1>
        </div>

        <div className="rounded-lg bg-white/10 p-6 backdrop-blur-lg">
          <div className="mb-6 flex justify-center gap-4">
            <button
              onClick={() => setMode('encrypt')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                mode === 'encrypt'
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Lock className="h-5 w-5" />
              Encrypt
            </button>
            <button
              onClick={() => setMode('decrypt')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
                mode === 'decrypt'
                  ? 'bg-white text-purple-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <Unlock className="h-5 w-5" />
              Decrypt
            </button>
          </div>

          <FileUploader
            file={file}
            onFileSelect={setFile}
            mode={mode}
          />

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-500/20 p-4 text-white">
              <AlertCircle className="h-5 w-5" />
              {error}
            </div>
          )}

          {file && (
            mode === 'encrypt' ? (
              <EncryptionForm
                onEncrypt={handleEncrypt}
                loading={loading}
              />
            ) : (
              <DecryptionForm
                onDecrypt={handleDecrypt}
                loading={loading}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
