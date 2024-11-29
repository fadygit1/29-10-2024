import CryptoJS from 'crypto-js';

export class CryptoUtils {
  static sha256(message: string): string {
    return CryptoJS.SHA256(message).toString();
  }

  static ripemd160(message: string): string {
    return CryptoJS.RIPEMD160(message).toString();
  }

  static isValidHexKey(key: string): boolean {
    const hexRegex = /^[0-9a-fA-F]+$/;
    return hexRegex.test(key) && key.length === 64;
  }

  static validateRange(start: string, end: string): boolean {
    if (!this.isValidHexKey(start) || !this.isValidHexKey(end)) {
      return false;
    }
    
    const startBigInt = BigInt(`0x${start}`);
    const endBigInt = BigInt(`0x${end}`);
    return startBigInt < endBigInt;
  }
}