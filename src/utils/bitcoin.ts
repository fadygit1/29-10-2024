import * as secp256k1 from 'secp256k1';
import * as bs58 from 'bs58';
import { Buffer } from 'buffer';
import { sha256, ripemd160 } from './crypto';

export class BitcoinUtils {
  static generateAddress(privateKey: Buffer, compressed: boolean = true): string {
    // Generate public key
    const publicKey = secp256k1.publicKeyCreate(privateKey, compressed);
    
    // Perform SHA-256 hashing on the public key
    const sha256Hash = sha256(publicKey);
    
    // Perform RIPEMD-160 hashing on the result
    const ripemd160Hash = ripemd160(Buffer.from(sha256Hash, 'hex'));
    
    // Add version byte in front (0x00 for mainnet)
    const versionedHash = Buffer.concat([Buffer.from([0x00]), Buffer.from(ripemd160Hash, 'hex')]);
    
    // Perform double SHA-256 hashing on the extended RIPEMD-160 result
    const checksum = sha256(Buffer.from(sha256(versionedHash), 'hex')).slice(0, 8);
    
    // Add 4 bytes of checksum
    const binaryAddress = Buffer.concat([
      versionedHash,
      Buffer.from(checksum, 'hex')
    ]);
    
    // Encode the result in base58
    return bs58.encode(binaryAddress);
  }

  static validatePrivateKey(privateKey: Buffer): boolean {
    try {
      return secp256k1.privateKeyVerify(privateKey);
    } catch {
      return false;
    }
  }

  static validateAddress(address: string): boolean {
    try {
      const decoded = bs58.decode(address);
      if (decoded.length !== 25) return false;
      
      const checksum = decoded.slice(21);
      const versionedHash = decoded.slice(0, 21);
      
      const newChecksum = Buffer.from(
        sha256(Buffer.from(sha256(versionedHash), 'hex')),
        'hex'
      ).slice(0, 4);
      
      return Buffer.compare(checksum, newChecksum) === 0;
    } catch {
      return false;
    }
  }
}