import { defaultColors } from "@/config/default-colors.config";
import { jetBrainsMono } from "@/fonts";
import { passwordRules, usernameRules } from "@/helper/validation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { CDivider } from "../ui/custom";

const Rule = ({ ok, text }: { ok: boolean; text: string }) => (
  <div
    className={`flex items-center justify-start gap-2 `}
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
    <p
      className={cn(
        jetBrainsMono.className,
        "tracking-tight text-[0.6rem] opacity-75 "
        // ok ? "line-through" : ""
      )}
      style={{
        color: "white",
        // lineHeight: '12px'
      }}
    >
      {text}
    </p>
  </div>
);

// Template to maintain same design
export const ToolTipTemplate = ({ children }: { children: ReactNode }) => {
  return (
    <div className="p-3 bg-black/50 backdrop-blur-sm flex flex-col ">
      {children}
    </div>
  );
};

export const PasswordTooltip = ({ password }: { password: string }) => {
  const rules = passwordRules(password);

  return (
    <ToolTipTemplate>
      <Rule ok={rules.length} text="At least 8 characters." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.lowercase} text="At least 1 lowercase letter." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.uppercase} text="At least 1 uppercase letter." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.number} text="At least 1 number." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.special} text="At least 1 special character." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.noRepeat} text="No more than 3 repeated characters." />
    </ToolTipTemplate>
  );
};

export const UsernameTooltip = ({ username }: { username: string }) => {
  const rules = usernameRules(username);

  return (
    <ToolTipTemplate>
      <Rule ok={rules.minLength} text="Must be at least 3 characters long." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.lowercase} text="Must start with a lowercase letter." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.maxLength} text="At max 18 characters." />
      <CDivider className="mt-2 mb-2"/>
      <Rule ok={rules.special} text="Uppercase Character and Special character not allowed(except underscore)." />
    </ToolTipTemplate>
  );
};
