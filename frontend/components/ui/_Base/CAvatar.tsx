import { IBaseCAvatarProps } from "@/@types/_base";

const BaseCAvatar = ({ name, theme }: IBaseCAvatarProps) => {
  return (
    <div
      className="border rounded-full flex items-center justify-center w-16 h-16"
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
