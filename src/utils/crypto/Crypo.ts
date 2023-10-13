import { AES, enc } from "crypto-js";

const secretKey = process.env.REACT_APP_SECRET_KEY;

export const encryptData = (data: string) => {
  if (secretKey) {
    const encrypted = AES.encrypt(data, secretKey).toString();
    return encodeURIComponent(encrypted)
      .replace(/\+/g, "%")
      .replace(/\//g, "%");
  }
  return data;
};

export const decryptData = (value: string) => {
  if (value && secretKey) {
    const decodedValue = decodeURIComponent(
      value.replace(/-/g, "%").replace(/_/g, "%"),
    );
    const decrypted = AES.decrypt(decodedValue, secretKey).toString(enc.Utf8);
    return decrypted;
  }
  return value;
};
