import { IUserDetails } from "@/@types/auth";
import React from "react";
import SharedUsersAvatar from "../SharedUsersAvatar";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { CDivider } from "../ui/custom";
import { StyledDivBG } from "@/styles/StyledComponents";
import Remaining from "./by-me/remaining";
import { IShareByMeResRemaining } from "@/@types/share";
import { dateISOtoNormal } from "@/helper/date-formatter";
import { EmptyContent } from "../empty";

const Users = ({
  users,
  remaining,
}: {
  users: IUserDetails[];
  remaining: IShareByMeResRemaining[];
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <div className="flex items-center justify-center flex-col w-full">
      <p
        className="text-start mt-2 w-full font-semibold text-xs "
        style={{
          color: theme.disabledTextColor,
        }}
      >
        Shared With
      </p>
      <CDivider className="mt-1! mb-2!" />
      {users?.map((user, i) => (
        <StyledDivBG
          $theme={theme}
          key={i}
          className="px-3 py-2 rounded-xl my-0 w-full "
        >
          <SharedUsersAvatar user={user} />
        </StyledDivBG>
      ))}

      <p
        className="text-start mt-4 w-full font-semibold text-xs "
        style={{
          color: theme.disabledTextColor,
        }}
      >
        Other codes you share
      </p>
      <CDivider className="mt-1! mb-2!" />

      {remaining?.length === 0 && (
        <>
          {/* Just for the margin-top */}
          <div className="mt-20" />
          <EmptyContent
            title="No Data Found"
            boxClassName="opacity-50!"
            titleClassName="opacity-60!"
          />
        </>
      )}

      {remaining?.map((rem, i) => (
        <Remaining
          key={i}
          code={rem?.share?.code}
          lang={rem?.share?.lang}
          sharedWith={rem?.sharedWith}
          sharedId={rem?.share?.sharedId}
          createdAt={dateISOtoNormal(rem?.share?.createdAt)}
        />
      ))}
    </div>
  );
};

export default Users;
