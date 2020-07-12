export class Padder {
  public static pad(input: string, length: number, padAt: 'START' | 'END', padWith: string = '0') {
    const padCount = length - input.length;
    let padding = '';
    if (padCount > 0) {
      padding = new Array(padCount).fill(padWith).join('');
    }
    return padAt === 'START' ? `${padding}${input}` : `${input}${padding}`;
  }
}
