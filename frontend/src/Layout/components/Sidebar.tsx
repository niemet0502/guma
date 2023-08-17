import { Button } from "@/components/ui/button";
import { GoIssueDraft } from "react-icons/go";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

export const Sidebar: React.FC = () => {
  return (
    <div className="pb-12 h-full w-[270px] flex flex-none sticky top-0">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h3 className="mb-3 px-4 text-lg font-semibold tracking-tight">
            Workspace [logo]
          </h3>
          <div className="space-y-1">
            <Link to="/notifications">
              <Button
                variant="secondary"
                className="w-full justify-start flex gap-1"
              >
                <IoIosNotificationsOutline className="text-base" />
                Notifications
              </Button>
            </Link>

            <Link to="/documents">
              <Button
                variant="ghost"
                className="w-full justify-start flex gap-1"
              >
                <HiOutlineDocumentDuplicate className="text-base" />
                Documents
              </Button>
            </Link>
            <NavLink to="/issues">
              <Button
                variant="ghost"
                className="w-full justify-start flex gap-1"
              >
                <GoIssueDraft className="text-base" />
                Issues
              </Button>
            </NavLink>
          </div>
        </div>
        <div className="">
          <div className="w-full border-y">
            <h6 className="my-2 px-4 text-lg font-semibold tracking-tight">
              Teams
            </h6>
          </div>
          <div className="w-full border-b pb-1">
            <h5 className="my-2 px-4 text-base  font-semibold tracking-tight">
              Backend
            </h5>

            <div className="space-y-1 pl-4 pr-3">
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M21 15V6" />
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M12 12H3" />
                  <path d="M16 6H3" />
                  <path d="M12 18H3" />
                </svg>
                Issues
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="8" cy="18" r="4" />
                  <path d="M12 18V2l7 4" />
                </svg>
                Documents
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Sprints
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                  <circle cx="17" cy="7" r="5" />
                </svg>
                Roadmap
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m16 6 4 14" />
                  <path d="M12 6v14" />
                  <path d="M8 8v12" />
                  <path d="M4 4v16" />
                </svg>
                Albums
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
