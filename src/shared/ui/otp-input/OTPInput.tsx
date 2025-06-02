export const OTPInput = ({
  otp,
  inputRefs,
  handleChangeOtp,
  handleOtpKeyDown,
  handleOtpPaste,
}: {
  otp: string[];
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
          onPaste={handleOtpPaste}
          className="rounded-md border border-gray-300 text-center text-2xl w-9 h-12"
        />
      ))}
    </div>
  );
};
