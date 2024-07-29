interface MenuItem {
    id: number;
    page:string;
    title: string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
}[];

const menu_data: MenuItem[] = [
    
    {
        id: 1,
        page:"nav_1",
        has_dropdown: false,
        title: "Home",
        link: "/#Home",
        sub_menus: [
            { link: "/", title: "Prospera - IT'S YOUR TIME NOW!" },
            { link: "/home-two", title: "Blockchain", },
        ],
    },
    {
        id: 2,
        page:"nav_1",
        has_dropdown: false,
        title: "wHY $PROS",
        link: "/#feature",
    },
    {
        id: 3,
        page:"nav_1",
        has_dropdown: false,
        title: "RoadMap",
        link: "/#roadMap",
    },
    {
        id: 4,
        page:"nav_1",
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
    
    {
        id: 1,
        page:"nav_2",
        has_dropdown: false,
        title: "Home",
        link: "/#Home",
        sub_menus: [
            { link: "/", title: "PROSPERA - IT'S YOUR TIME NOW!" },
            { link: "/home-two", title: "Blockchain", },
        ],
    },
    {
        id: 2,
        page:"nav_2",
        has_dropdown: false,
        title: "Why Blockchain",
        link: "/home-two/#blockchain",
    },
    {
        id: 3,
        page:"nav_2",
        has_dropdown: false,
        title: "Feature",
        link: "/home-two/#feature",
    },
    {
        id: 4,
        page:"nav_2",
        has_dropdown: false,
        title: "Blog - CS",
        link: "#",
        sub_menus: [
            { link: "/blog", title: "Our Blog" },
            { link: "/blog-details", title: "Blog-Details", },
        ],
    },
    {
        id: 5,
        page:"nav_2",
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
];
export default menu_data;
