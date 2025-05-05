import DashboardSidebarItems from "./DashboardSidebarItems";
import { Menu, Users, Volleyball, ListCheck, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface AdminSideBar {
  isOpen: boolean;
  handleDashboard: () => void;
}

const DashboardSidebar: React.FC<AdminSideBar> = ({ isOpen, handleDashboard }) => {
  const navigate = useNavigate();
  return (
    <aside className={`border-1 p-2 flex gap-9 flex-col transition-all border-slate-200 rounded shadow-2xl h-full ${isOpen ? "w-2xs" : "w-16"}`}>
      <span className={`flex items-center ${isOpen ? "justify-between" : "justify-center"}`}>
        <h2 className={`text-2xl font-medium transition-all  ${isOpen ? "flex" : "hidden"}`}>Courtly Dashboard</h2>
        <button className="cursor-pointer flex items-center justify-end" onClick={handleDashboard}>
          <Menu strokeWidth={2} size={35} />
        </button>
      </span>
      <nav className="flex flex-col justify-between h-full">
        <ul className="flex flex-col gap-3">
          <Link to={"users"}>
            <DashboardSidebarItems
              colors={{ mainColor: "bg-orange-400", hoverColor: "hover:bg-orange-500" }}
              icon={<Users strokeWidth={2} />}
              isOpen={isOpen}
            >
              Користувачі
            </DashboardSidebarItems>
          </Link>
          <Link to={"courts"}>
            <DashboardSidebarItems
              colors={{ mainColor: "bg-lime-400", hoverColor: "hover:bg-lime-500" }}
              icon={<Volleyball strokeWidth={2} />}
              isOpen={isOpen}
            >
              Майданчики
            </DashboardSidebarItems>
          </Link>
          <Link to={"bookings"}>
            <DashboardSidebarItems
              colors={{ mainColor: "bg-blue-400", hoverColor: "hover:bg-blue-500" }}
              icon={<ListCheck strokeWidth={2} />}
              isOpen={isOpen}
            >
              Бронювання
            </DashboardSidebarItems>
          </Link>
        </ul>
        <button
          onClick={() => navigate("/")}
          className="bg-red-500 hover:bg-red-600 rounded text-center cursor-pointer flex items-center justify-center text-white font-bold py-2"
        >
          {isOpen ? "Повернутись" : <LogOut />}
        </button>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
