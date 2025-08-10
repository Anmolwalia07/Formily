import { Link } from "react-router";

export default function SidebarItem({ icon, text, open, active, onClick, badge, className = "" }) {
  return (
    <Link
      to={`/${text}`}
      onClick={onClick}
      className={`flex items-center p-3 rounded-md transition-all ${
        active 
          ? "bg-gray-800 font-medium" 
          : "hover:bg-gray-700"
      } ${className} relative group`}
    >
      <span className={`text-lg ${active ? "text-white" : "text-gray-400"}`}>
        {icon}
      </span>
      {open ? (
        <span className="ml-3 capitalize">{text}</span>
      ) : (
        <span className="absolute left-14 ml-2 w-auto p-2 min-w-max rounded-md shadow-md
        text-white bg-gray-900 text-xs font-bold transition-all duration-300 origin-left
        scale-0 group-hover:scale-100 z-50">
          {text}
        </span>
      )}
      {badge && (
        <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-medium ${
          typeof badge === "number" 
            ? "bg-gray-600 text-white" 
            : "bg-gray-700 text-white"
        }`}>
          {badge}
        </span>
      )}
    </Link>
  );
}