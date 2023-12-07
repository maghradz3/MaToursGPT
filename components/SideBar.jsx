import React from "react";
import SideBarHeader from "./SideBarHeader";
import NavLinks from "./NavLinks";
import ProfileMember from "./ProfileMember";

const SideBar = () => {
  return (
    <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid-rows-[auto,1fr,auto]">
      <SideBarHeader />
      <NavLinks />
      <ProfileMember />
      SideBar
    </div>
  );
};

export default SideBar;
