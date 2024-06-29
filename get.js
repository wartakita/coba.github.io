// Fungsi untuk mengimpor kunci dari string Base64
async function importKey(base64Key) {
    const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
    return await crypto.subtle.importKey(
        'raw',
        rawKey,
        'AES-GCM',
        true,
        ['encrypt', 'decrypt']
    );
}

// Fungsi untuk menghasilkan kunci baru dan mengubahnya menjadi string Base64
async function generateKey() {
    const key = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
    const rawKey = await crypto.subtle.exportKey('raw', key);
    return btoa(String.fromCharCode(...new Uint8Array(rawKey)));
}

// Fungsi untuk mengenkripsi teks
async function encryptData(key, data) {
    const encodedData = new TextEncoder().encode(data);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedData
    );
    const buffer = new Uint8Array(encryptedData);
    const base64EncryptedData = btoa(String.fromCharCode(...buffer));
    const base64Iv = btoa(String.fromCharCode(...iv));
    return base64Iv + ':' + base64EncryptedData;
}

// Fungsi untuk mendekripsi teks
async function decryptData(key, encryptedData) {
    const [base64Iv, base64Cipher] = encryptedData.split(':');
    const iv = Uint8Array.from(atob(base64Iv), c => c.charCodeAt(0));
    const cipher = Uint8Array.from(atob(base64Cipher), c => c.charCodeAt(0));
    const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        cipher
    );
    return new TextDecoder().decode(decryptedData);
}

// Contoh penggunaan
(async () => {
    const keyString = await generateKey();
    const key = await importKey(keyString);

    const originalText = 'This is a secret message';
    const encryptedText = await encryptData(key, originalText);
    console.log('Encrypted:', encryptedText);

    const decryptedText = await decryptData(key, encryptedText);
    console.log('Decrypted:', decryptedText);
})();
