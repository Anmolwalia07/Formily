import { useState } from "react";
import { 
  FaBars, FaHome, FaUser, FaCog, FaSignOutAlt,  FaFileAlt, FaPlus, FaSearch, 
  FaBell, FaQuestionCircle, FaChevronDown, FaChevronLeft
} from "react-icons/fa";
import  DashboardHeader  from "./DashboardHeader";
import SidebarItem from "./SideBarItems";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useUser } from "../UserContext";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isActive=useLocation()
  const [activeItem, setActiveItem] = useState(isActive.pathname.slice(1));
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigation=useNavigate();

  const {user}=useUser();
  console.log(user)

  const sidebarItems = [
    { icon: <FaHome />, text: "dashboard", badge: null },
    { icon: <FaFileAlt />, text: "forms", badge: 5 },
    { icon: <FaUser />, text: "profile", badge: "!" },
    { icon: <FaCog />, text: "settings", badge: null },
  ];

  const notifications = [
    { id: 1, text: "New response to your survey", time: "2 min ago", read: false },
    { id: 2, text: "Your form was viewed 50 times", time: "1 hour ago", read: true },
    { id: 3, text: "Monthly report is ready", time: "3 hours ago", read: true },
  ];

  return (
    <>
    <DashboardHeader/>
    <div className="flex h-screen bg-gray-900">
      <aside className={`bg-gray-900 text-white transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-20"} hidden md:flex flex-col relative z-10 shadow-xl`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="bg-gray-800 w-8 h-8 rounded-lg flex items-center justify-center">
                <div className="bg-gray-900 w-6 h-6 rounded-md flex items-center justify-center">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
              </div>
              <span className="text-2xl font-bold"><span className="text-indigo-400 ">Form</span>ily</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto">
              <div className="bg-gray-900 w-6 h-6 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">F</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-700 transition"
          >
            {sidebarOpen ? <FaChevronLeft size={14} /> : <FaBars />}
          </button>
        </div>

        {/* Create Form Button */}
        <div className="p-4">
          <button onClick={()=>{
            navigation('/createform')
          }} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-md transition-all">
            <FaPlus className="text-sm" />
            {sidebarOpen && <span>Create New Form</span>}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.text}
              icon={item.icon}
              text={item.text}
              open={sidebarOpen}
              active={activeItem === item.text}
              onClick={() => setActiveItem(item.text)}
              badge={item.badge}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-gray-700">
          <SidebarItem 
            icon={<FaSignOutAlt />} 
            text="Logout" 
            open={sidebarOpen} 
            className="hover:bg-gray-700"
          />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-900 shadow px-6 py-2.5 pt-3 hidden md:flex justify-between items-center border-b border-gray-700">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-200" />
            </div>
            <input
              type="text"
              placeholder="Search forms, responses, analytics..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-5">
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-gray-700 relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <FaBell className="text-gray-200 text-xl" />
                <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-20">
                  <div className="p-3 border-b border-gray-700 font-medium text-gray-200">
                    Notifications
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                          !notification.read ? "bg-gray-700" : ""
                        }`}
                      >
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-300 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center text-sm text-indigo-300 font-medium hover:bg-gray-700 cursor-pointer">
                    View all notifications
                  </div>
                </div>
              )}
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-700">
              <FaQuestionCircle className="text-gray-200 text-xl" />
            </button>
            
            <div className="relative">
              <button 
                className="flex items-center space-x-2 group"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-700 shadow"
                />
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-100">{user.name}</p>
                  <p className="text-xs text-gray-300">Admin</p>
                </div>
                <FaChevronDown 
                  className={`text-gray-200 transition-transform ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-20 border border-gray-700">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-indigo-300"
                  >
                    Profile
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-indigo-300"
                  >
                    Account Settings
                  </a>
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-indigo-300"
                  >
                    Billing
                  </a>
                  <div className="border-t border-gray-700 my-1"></div>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-indigo-300"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>Logout</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

       <Outlet/>
      </div>
    </div>
    </>
  );
}




