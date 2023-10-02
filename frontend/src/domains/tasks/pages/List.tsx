import { TaskItem } from "../components/TaskItem";
import { useTasks } from "../hooks/useTasks";

export const TaskList: React.FC = () => {
  const { data } = useTasks();
  return (
    <div>
      <div className="w-full bg-background-secondary">
        {data?.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};
