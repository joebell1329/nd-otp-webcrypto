export class CryptoService {

  private static readonly HMAC_IMPORT_PARAMS: HmacImportParams = {
    name: 'HMAC',
    hash: 'SHA-1'
  };

  /**
   * Generates an HMAC-SHA1 hash with the given key and message.
   * @param key
   * @param message
   */
  public static async generateHmacSha1Hash(key: Uint8Array, iteration: number): Promise<ArrayBuffer> {
    const signingKey = await this.getSigningKey(key);
    const messageBuffer = this.get8ByteBufferFromIteration(iteration);

    return crypto.subtle.sign('HMAC', signingKey, messageBuffer);
  }

  /**
   * Gets a web CryptoKey from the given plaintext key.
   * @param key
   */
  private static async getSigningKey(key: Uint8Array): Promise<CryptoKey> {
    return crypto.subtle.importKey(
      'raw',
      key,
      this.HMAC_IMPORT_PARAMS,
      false,
      [ 'sign', 'verify' ]
    );
  }

  private static get8ByteBufferFromIteration(iteration: number): ArrayBuffer {
    const hexIteration = this.iterationTo8ByteHex(iteration);
    return this.hexTo8ByteArrayBuffer(hexIteration);
  }

  private static iterationTo8ByteHex(iteration: number): string {
    return this.leftPad(iteration.toString(16), 16);
  }

  private static leftPad(val: string, count: number): string {
    let pad: string = '';
    for (let i = 0; i < count; i++) {
      pad += '0';
    }
    return (pad + val).slice(-count);
  }

  private static hexTo8ByteArrayBuffer(val: string): ArrayBuffer {
    const hexBytes = val.match(/.{1,2}/g);

    if (hexBytes?.length === 8) {
      return new Uint8Array(hexBytes.map(hex => parseInt(hex, 16))).buffer;
    } else {
      throw new Error('Supplied hex value is not 8 bytes');
    }
  }

}
