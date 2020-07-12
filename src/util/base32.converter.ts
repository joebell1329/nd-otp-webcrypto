import { Padder } from './padder';

export class Base32Converter {

  private static readonly B32Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  public static fromB32(input: string): Uint8Array {
    return new Uint8Array(
      input
        .replace(/ /g, '')
        .replace(/=/g, '')
        .split('')
        .map(b32Char => this.B32Alphabet.indexOf(b32Char))
        .map(decimal => decimal.toString(2))
        .map(binary => Padder.pad(binary, 5, 'START'))
        .join('')
        .match(/.{8}/g)
        ?.map(binary => parseInt(binary, 2)) as number[]
    );
  }

  public static toB32(input: Uint8Array): string {
    return Array.from(input)
      .map(decimal => decimal.toString(2))
      .map(binary => Padder.pad(binary, 8, 'START'))
      .join('')
      .match(/.{1,5}/g)
      ?.map(chunk => Padder.pad(chunk, 5, 'END'))
      .map(chunk => parseInt(chunk, 2))
      .map(decimal => this.B32Alphabet.charAt(decimal))
      .join('') as string;
  }

}
