import Logo from "../Logo";
import { FontPalette, ThemePalette } from "../palette";
import { AccountProps, NRAvatarDropdown } from "../profile/avatar";
import { NRCDivider } from "../ui/no-redux";

const Header = ({ profileDetails, isLoading }: AccountProps) => {
  return (
    <div className=" w-full lg:w-[75vw] xl:lg:w-[65vw] h-[70px] z-10 backdrop-blur-sm place-self-center rounded-full px-6  flex items-center justify-between fixed top-5 max-md:top-0">
      <Logo />
      <div className="flex items-center gap-x-2 ">
        <FontPalette />
        <NRCDivider direction="horizontal" className="bg-white! h-4! mx-2!" />
        <ThemePalette />
        <NRCDivider direction="horizontal" className="bg-white! h-4! mx-2!" />
        <NRAvatarDropdown
          profileDetails={profileDetails}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Header;
