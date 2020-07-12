import { GenOtpOptions } from './otp/otp.model';
import { OtpService } from './otp/otp.service';

export async function genOtp(value: string, options?: GenOtpOptions): Promise<string> {
  return await OtpService.genOtp(value, options);
}
