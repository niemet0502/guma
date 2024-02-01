import { getTimeAgoString } from "@/lib/utils";
import { GoProjectRoadmap } from "react-icons/go";
import { Livrableupdate } from "../type";
import { ModuleUpdateIcon } from "./ModuleUpdateIcon";

export const UpdateItem: React.FC<{
  update: Livrableupdate;
  showModuleName?: boolean;
}> = ({ update, showModuleName = false }) => {
  return (
    <div className="flex flex-col gap-2 border-t p-3">
      {showModuleName && (
        <div className="flex  items-center gap-2">
          <GoProjectRoadmap className="text-xl" />
          <span className="text-lg font-medium">{update.livrable.name}</span>
        </div>
      )}
      <div className={`${showModuleName && "ml-6"} flex gap-2 items-center`}>
        <ModuleUpdateIcon status={update.status} />
        <div className="text-sm">
          by {update.author?.username} {getTimeAgoString(update.created_at)}
        </div>
      </div>
      <p className={`${showModuleName && "ml-6"} text-base`}>
        {update.description}
      </p>
    </div>
  );
};
