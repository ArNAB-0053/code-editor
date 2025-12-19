import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { CAvatar } from "./ui/custom";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { IUserDetails } from "@/@types/auth";

const SharedUsersAvatar = ({user}: {user: IUserDetails}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className="relative flex items-center justify-center gap-x-2 ">
      <CAvatar
        name={user.name}
        characters={1}
        className="w-8 h-8 text-xs font-semibold border-0 ring-2 backdrop-blur-2xl"
        style={{
          background: `${theme.activeColor}50`,
          color: theme.activeColor,
        }}
      />
      <span className="flex-1">
        <p
          style={{ color: theme.disabledTextColor }}
          className="text-sm truncate w-full overflow-hidden"
        >
          {getFullnameFromNameObj(user.name)}
        </p>
        <p
          className="text-xs -translate-y-1 font-medium"
          style={{ color: theme.activeColor }}
        >
          @{user.username}
        </p>
      </span>
    </div>
  );
};

export default SharedUsersAvatar;
