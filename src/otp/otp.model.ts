export type GenHotpOptions = {
  type: 'HOTP';
  iteration: number;
}

export type GenTotpOptions = {
  type: 'TOTP';
  period?: number;
}

export type GenOtpOptions = GenHotpOptions | GenTotpOptions;
