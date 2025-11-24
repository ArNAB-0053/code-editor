import { IBaseCAvatarProps } from "@/@types/_base";
import { BaseCAvatar } from "../_Base";

const NRCAvatar = ({ name, theme }: IBaseCAvatarProps) => {
  return <BaseCAvatar name={name} theme={theme} />;
};

export default NRCAvatar;
