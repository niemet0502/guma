export const TeamProgressItem: React.FC<{ team: any }> = ({ team }) => {
  return (
    <div className="w-full pr-5 py-3 flex justify-between border-b hover:bg-slate-50 hover:cursor-pointer">
      <div className="flex-1">{team.title}</div>
      <div className="flex-1">{team.owner}</div>
      <div className="flex-1 pl-4">
        <div className="border bg-blue-400 text-white w-6 rounded-full h-6 flex items-center justify-center">
          {team.member}
        </div>
      </div>
      <div className="flex-1 ">
        <div className="border bg-green-400 text-white w-6 rounded-full h-6 flex items-center justify-center">
          {team.totalTasks}
        </div>
      </div>
    </div>
  );
};
