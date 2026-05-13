import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useUserStore } from "@/store/user.store";
import { Link } from "react-router";

function Navbar() {
  const { user } = useUserStore();
  const navList = [
    {
      label: "Login",
      href: "/login",
      loggedIn: false,
    },
    {
      label: "Register",
      href: "/register",
      loggedIn: false,
    },
    {
      label: "Generate Report",
      href: "/",
      loggedIn: true,
    },
    {
      label: "Profile",
      href: "/profile",
      loggedIn: true,
    },
    {
      label: "Report",
      href: "/report",
      loggedIn: true,
    },
  ];
  return (
    <NavigationMenu className="w-full sticky top-0 z-50 bg-background">
      <div className="mx-auto flex justify-between py-2 px-8 md:px-20">
        <Link to={"/"}>
          <img
            src="./logo.png"
            alt=""
            width={40}
            height={40}
            className="rounded-xl"
          />
        </Link>
        <NavigationMenuList className="">
          {navList.map((link) => {
            if (link.loggedIn === false && user.isLoggedIn === true)
              return null;
            if (link.loggedIn === true && user.isLoggedIn === false)
              return null;
            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}

export default Navbar;
