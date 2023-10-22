import { BsCheckLg } from "react-icons/bs";

export const TaskStatusIcon: React.FC<{ status: string }> = ({ status }) => {
  let icon = null;
  switch (status) {
    case "Done":
      icon = (
        <div className="h-4 w-4 border-2 border-purple-700 bg-purple-700 rounded-full flex items-center hover:cursor-pointer">
          <BsCheckLg className="text-background" />
        </div>
      );
      break;
    case "Backlog":
      icon = (
        <div className="h-4 w-4 border-2 border-dotted rounded-full hover:cursor-pointer"></div>
      );
      break;
    case "In Progress":
      icon = (
        <div className="h-4 w-4 border-2  border-yellow-700 rounded-full flex overflow-hidden hover:cursor-pointer">
          <div className="flex-1 "></div>
          <div className="flex-1 bg-yellow-700"></div>
        </div>
      );
      break;
    default:
      icon = (
        <div className="h-4 w-4 border-2 rounded-full hover:cursor-pointer"></div>
      );
      break;
  }

  return <div>{icon}</div>;
};
