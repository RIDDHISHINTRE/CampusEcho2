import React from "react";
import { Menu } from "lucide-react";

const Navbar = ({ title, onToggle }) => (
  <nav className="bg-black shadow-lg flex justify-between items-center p-4 text-white">
    <h2 className="text-2xl font-bold">{title}</h2>
    <div className="flex items-center space-x-4">
      <div onClick={onToggle} className="cursor-pointer">
        <Menu size={28} />
      </div>
      <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold">
        EP
      </div>
    </div>
  </nav>
);

export default Navbar;