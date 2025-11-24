import { IBaseCAvatarProps } from "@/@types/_base";

const BaseCAvatar = ({ name, theme }: IBaseCAvatarProps) => {
  return (
    <div
      className="border-2 rounded-full flex items-center justify-center w-16 h-16 text-2xl font-semibold"
      style={{
        borderColor: theme.border20,
        background: `${theme.activeColor}30`,
        color: `${theme.activeColor}`,
      }}
    >
      {name?.charAt(0).toUpperCase()}
    </div>
  );
};

export default BaseCAvatar;
