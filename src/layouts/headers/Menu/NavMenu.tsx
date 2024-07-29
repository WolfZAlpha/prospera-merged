"use client";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import menu_data from "../../../data/MenuData";

const NavMenu = () => {
    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => {
        return currentRoute === menuLink;
    };

    const isSubMenuItemActive = (subMenuLink: string) => {
        return currentRoute === subMenuLink;
    };

    return (
        <ul className="navigation">
            {menu_data.filter((items) => items.page === "nav_1").map((menu: any) => (
                <li key={menu.id}
                    className={menu.has_dropdown ? "menu-item-has-children" : ""}
                >
                    <Link href={menu.link}
                        className={`section-link ${(isMenuItemActive(menu.link) || (menu.sub_menus && menu.sub_menus.some((sub_m: any) => sub_m.link && isSubMenuItemActive(sub_m.link)))) ? "active" : ""}`}>
                        {menu.title}
                    </Link>

                    {menu.has_dropdown && (
                        <>
                            {menu.sub_menus && (
                                <ul className="sub-menu">
                                    {menu.sub_menus.map((sub_m: any, i: any) => (
                                        <li key={i}>
                                            <Link
                                                href={sub_m.link}
                                                className={
                                                    sub_m.link && isSubMenuItemActive(sub_m.link) ? "active" : ""}>
                                                {sub_m.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;