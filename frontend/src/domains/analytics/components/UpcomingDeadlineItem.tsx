import { ProgressBar } from "@tremor/react";
import { GoProjectRoadmap } from "react-icons/go";

export const UpcomingDeadlineItem: React.FC<{ module: any }> = ({ module }) => {
  const per = (module.completedTask / module.totalTasks) * 100;
  return (
    <div className="w-full px-5 py-3 flex justify-between border-b hover:bg-slate-50 hover:cursor-pointer">
      <div className="flex-1 flex items-center gap-2">
        <GoProjectRoadmap className="mt-1" />
        <span className="font-medium">{module.title}</span>
      </div>
      <div className="flex-1 pl-3">{module.endAt}</div>
      <div className="flex-1">
        <ProgressBar value={per} color="teal" className="mt-3" />
      </div>
    </div>
  );
};
