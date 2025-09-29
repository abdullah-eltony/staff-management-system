import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/" },
    { name: "Employees", path: "/employees" },
    { name: "Tasks", path: "/tasks" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <aside className="w-60 bg-gray-100 p-4 h-full">
      <nav>
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
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
