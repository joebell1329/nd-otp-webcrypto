import { CryptoService } from '../crypto/crypto.service';
import { Base32Converter } from '../util/base32.converter';
import { GenOtpOptions } from './otp.model';

export class OtpService {

  private static readonly DEFAULT_TOTP_PERIOD = 30;
  private static readonly DEFAULT_OPTIONS: GenOtpOptions = {
    type: 'TOTP'
  };

  public static async genOtp(key: string, options?: GenOtpOptions): Promise<string> {
    options = options || this.DEFAULT_OPTIONS;

    let iteration: number;
    if (options.type === 'HOTP') {
      if (typeof options.iteration !== 'number') {
        throw new Error('You must specify a numeric iteration for HOTP token generation.');
      }
      iteration = options.iteration;
    } else if (options.type === 'TOTP') {
      iteration = this.getTotpIteration(options.period || this.DEFAULT_TOTP_PERIOD);
    } else {
      throw new Error('Type must be either "HOTP" or "TOTP"');
    }

    const decodedKey = Base32Converter.fromB32(key);
    const hmacSha1Hash = new Uint8Array(await CryptoService.generateHmacSha1Hash(decodedKey, iteration));
    const hexHash = this.uint8ArrayToHex(hmacSha1Hash);
    const offset = this.getOffsetFromHexHash(hexHash);
    const bytesForBitwise = this.getBytesForBitwiseOperation(hmacSha1Hash, offset);
    const transformedBytes = this.transformHashBytes(bytesForBitwise);
    const finalHex = Array.from(transformedBytes).map(b => b.toString(16)).join('');
    const finalResult = parseInt(finalHex, 16).toString(10);
    return finalResult.slice(-6);
  }

  private static getUnixEpochTime(): number {
    return Math.floor(new Date().getTime() / 1000);
  }

  private static getTotpIteration(period: number): number {
    return Math.floor(this.getUnixEpochTime() / period);
  }

  private static int2Hex(val: number): string {
    return ('0' + val.toString(16)).slice(-2);
  }

  private static uint8ArrayToHex(val: Uint8Array): string {
    return val.reduce((acc: string, next: number) => acc + this.int2Hex(next), '');
  }

  private static getOffsetFromHexHash(hash: string): number {
    return parseInt(hash.slice(-1)[0], 16);
  }

  private static getBytesForBitwiseOperation(hash: Uint8Array, offset: number): Uint8Array {
    return hash.slice(offset, offset + 4);
  }

  private static transformHashBytes(hashBytes: Uint8Array): Uint8Array {
    return hashBytes.map((hashByte, index) => index === 0 ? hashByte & 127 : hashByte & 255);
  }

}
