import { Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";

export const Layout: React.FC = () => {
  return (
    <div className="w-full flex h-screen fixed">
      <Sidebar />
      <div className="col-span-3 flex flex-1 flex-col lg:border-l">
        <Topbar />
        <div className="overflow-auto">
          <div className="h-[1200px] p-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
