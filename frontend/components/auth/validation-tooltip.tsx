import { defaultColors } from "@/config/default-colors.config";
import { spaceGrotesk } from "@/fonts";
import { passwordRules, usernameRules } from "@/helper/validation";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

export const PasswordTooltip = ({ password }: { password: string }) => {
  const rules = passwordRules(password);

  return (
    <div className="absolute left-10 bg-black/90 text-white text-xs p-3 rounded-md shadow-lg z-50 border border-white/10">
      <Rule ok={rules.length} text="At least 8 characters" />
      <Rule ok={rules.lowercase} text="At least 1 lowercase letter" />
      <Rule ok={rules.uppercase} text="At least 1 uppercase letter" />
      <Rule ok={rules.number} text="At least 1 number" />
      <Rule ok={rules.special} text="At least 1 special character" />
      <Rule ok={rules.noRepeat} text="No more than 3 repeated characters" />
    </div>
  );
};

export const UsernameTooltip = ({ username }: { username: string }) => {
  const rules = usernameRules(username);

  return (
    <div className="p-3 bg-black/50 text-white text-xs rounded-xl flex flex-col overflow-y-auto">
      <Rule ok={rules.minLength} text="Must be at least 3 characters long" />
      <Rule ok={rules.lowercase} text="Must start with a lowercase letter" />
      <Rule ok={rules.maxLength} text="At max 18 characters" />
      <Rule ok={rules.special} text="Special character not allowed" />
    </div>
  );
};

const Rule = ({ ok, text }: { ok: boolean; text: string }) => (
  <div
    className={`flex items-center justify-start gap-2 my-1`}
    style={{
      color: ok ? defaultColors.SUCCESS.TEXT : defaultColors.ERROR.TEXT,
    }}
  >
    <div
      style={{
        backgroundColor: ok ? defaultColors.SUCCESS.BG : defaultColors.ERROR.BG,
      }}
      className="aspect-square rounded-sm p-1"
    >
      {ok ? <FaCheck size={8} /> : <RxCross1 strokeWidth={1.4} size={8} />}
    </div>
    <p className={cn(spaceGrotesk.className, "leading-3 text-[0.7rem]")}>
      {text}
    </p>
  </div>
);
