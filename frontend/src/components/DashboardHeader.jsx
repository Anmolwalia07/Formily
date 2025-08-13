import { useState } from "react";
import {
  FaBars,
  FaChartBar,
  FaCog,
  FaFileAlt,
  FaHome,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import SidebarItem from "./SideBarItems";

export default function DashboardHeader() {
  const navigation = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const isActive=useLocation()
  const [activeItem, setActiveItem] = useState(isActive.pathname.slice(1));
  const [sidebarOpen] = useState(true);

  const sidebarItems = [
    { icon: <FaHome />, text: "dashboard", badge: null },
    { icon: <FaFileAlt />, text: "forms", badge: 5 },
    { icon: <FaUser />, text: "profile", badge: "!" },
    { icon: <FaCog />, text: "settings", badge: null },
  ];

  return (
    <>
      {/* Mobile header */}
      <header className="sm:hidden sticky top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div
              className="text-2xl font-extrabold tracking-wide hover:cursor-pointer"
              onClick={() => {
                navigation("/");
              }}
            >
              <span className="text-indigo-400">Form</span>ily
            </div>

            <button
              className="ml-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Open menu"
              onClick={() => {
                setIsVisible((prev) => !prev);
              }}
            >
              {isVisible ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isVisible && (
        <div className="">
          <div className="w-full bg-gray-900 text-white p-4 flex flex-col shadow-lg">

           <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <SidebarItem
                  key={item.text}
                  icon={item.icon}
                  text={item.text}
                  open={sidebarOpen}
                  active={activeItem === item.text}
                  onClick={() => {
                    setActiveItem(item.text);
                    setIsVisible(false);
                  }}
                  badge={item.badge}
                />
              ))}
            </nav>
          </div>

          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsVisible(false)}
          />
        </div>
      )}
    </>
  );
}
