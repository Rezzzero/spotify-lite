export const OTPInput = ({
  otp,
  otpError,
  inputRefs,
  handleChangeOtp,
  handleOtpKeyDown,
  handleOtpPaste,
}: {
  otp: string[];
  otpError: { status: boolean; message: string };
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  handleChangeOtp: (index: number, value: string) => void;
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent) => void;
  handleOtpPaste: (e: React.ClipboardEvent) => void;
}) => {
  return (
    <div className="flex gap-4">
      {otp.map((digit: string, i: number) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChangeOtp(i, e.target.value)}
          onKeyDown={(e) => handleOtpKeyDown(i, e)}
          onPaste={(e) => handleOtpPaste(e)}
          className={`rounded-md border outline-none text-center text-2xl w-9 h-12 ${
            otpError.status
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 hover:border-white focus:border-white"
          }`}
        />
      ))}
    </div>
  );
};
