import { Upload } from 'lucide-react';

interface FileUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  mode: 'encrypt' | 'decrypt';
}

export function FileUploader({ file, onFileSelect, mode }: FileUploaderProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor="file-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-white/30 p-6 transition-colors hover:border-white/50"
      >
        <Upload className="mb-2 h-8 w-8 text-white" />
        <span className="text-sm text-white">
          {file ? file.name : `Choose a file to ${mode}`}
        </span>
        <span className="mt-1 text-xs text-white/70">
          {!file && 'Drag and drop or click to select'}
        </span>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              onFileSelect(selectedFile);
            }
          }}
        />
      </label>
    </div>
  );
}
