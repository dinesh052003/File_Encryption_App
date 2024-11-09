export async function encryptFile(file: File, password: string): Promise<ArrayBuffer> {
  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Derive key from password
  const key = await deriveKey(password, salt);

  // Generate random IV
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // Read file content
  const fileContent = await file.arrayBuffer();

  // Encrypt the content
  const encryptedContent = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    fileContent
  );

  // Combine salt + IV + encrypted content
  const result = new Uint8Array(salt.length + iv.length + encryptedContent.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.length);
  result.set(new Uint8Array(encryptedContent), salt.length + iv.length);

  return result.buffer;
}

export async function decryptFile(file: File, password: string): Promise<ArrayBuffer> {
  const fileContent = await file.arrayBuffer();
  const data = new Uint8Array(fileContent);

  // Extract salt, IV, and encrypted content
  const salt = data.slice(0, 16);
  const iv = data.slice(16, 28);
  const encryptedContent = data.slice(28);

  // Derive key from password
  const key = await deriveKey(password, salt);

  // Decrypt the content
  try {
    const decryptedContent = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedContent
    );
    return decryptedContent;
  } catch (error) {
    throw new Error('Decryption failed. Invalid password or corrupted file.');
  }
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  // Convert password to key material
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    passwordBuffer,
    'PBKDF2',
    false,
    ['deriveBits', 'deriveKey']
  );

  // Derive the actual encryption key
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}
