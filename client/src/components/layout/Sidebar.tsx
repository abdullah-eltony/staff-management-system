import { LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { logout } from "../../api/logout";
import { useEffect, useRef } from "react";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Tasks", path: "/tasks" },
    { name: "Reports", path: "/reports" },
  ];

  // Close sidebar when clicking outside (mobile use-case)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <aside
      ref={sidebarRef}
      className="w-60 bg-gray-100 p-4 h-full shadow-lg md:shadow-none"
    >
      <nav className="flex flex-col justify-between h-full">
        <ul>
          {menu.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `p-2 rounded block ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-700"
                  }`
                }
                onClick={onClose} // closes sidebar on mobile after nav
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={async () => {
            await logout();
            onClose();
          }}
          className="flex gap-3 p-2 items-center bg-gray-200 w-full mt-auto hover:bg-blue-500 rounded hover:text-white"
        >
          Sign out <LogOut size={18} />
        </button>
      </nav>
    </aside>
  );
}
