import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";

export default function Navbar() {
  const token = localStorage.getItem("access_token") ? true : false;

  const currentRoute = usePathname();
  const router = useRouter(); // Initialize router

  const handleLogout = async () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("address");
    localStorage.removeItem("id");
    localStorage.removeItem("access_token");

    router.push("/");
  };
  return (
    <Nav shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/" color={currentRoute === "/" ? "primary" : "foreground"}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/transaction" color={currentRoute === "/transaction" ? "primary" : "foreground"}>
            Transaction
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/wallet" color={currentRoute === "/wallet" ? "primary" : "foreground"}>
            Wallet
          </Link>
        </NavbarItem>
      </NavbarContent>
      {!token ? (
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar isBordered as="button" className="transition-transform" color="secondary" name="Jason Hughes" size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{localStorage.getItem("username")}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Nav>
  );
}
