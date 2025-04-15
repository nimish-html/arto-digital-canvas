import React from "react";
import { Home, Image, User, Menu } from "lucide-react";
import { AnimeNavBar } from "./anime-navbar";

const items = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Canvas",
    url: "/canvas",
    icon: Image,
  },
  {
    name: "Showcase",
    url: "/showcase",
    icon: Menu,
  },
  {
    name: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AnimeNavBarDemo() {
  return <AnimeNavBar items={items} defaultActive="Home" />;
}

export default AnimeNavBarDemo;