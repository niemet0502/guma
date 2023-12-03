import { TaskApi } from "../tasks/type";

export const isPositionChanged = (destination: any, source: any) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

export const calculateIssueListPosition = (
  allIssues: TaskApi[],
  destination: any,
  source: any,
  droppedIssueId: number
) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(
    allIssues,
    destination,
    source,
    droppedIssueId
  );
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.position - 1;
  } else if (!nextIssue) {
    position = prevIssue.position + 1;
  } else {
    position =
      prevIssue.position + (nextIssue.position - prevIssue.position) / 2;
  }
  return position;
};

const getAfterDropPrevNextIssue = (
  allIssues: TaskApi[],
  destination: any,
  source: any,
  droppedIssueId: number
) => {
  const beforeDropDestinationIssues = getSortedListIssues(
    allIssues,
    +destination.droppableId
  );

  const droppedIssue: any = allIssues.find(
    (issue) => +issue.id === droppedIssueId
  );

  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      )
    : insertItemIntoArray(
        beforeDropDestinationIssues,
        droppedIssue,
        destination.index
      );

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

const getSortedListIssues = (issues: TaskApi[], status_id: number) =>
  issues
    .filter((issue) => issue.status_id === status_id)
    .sort((a, b) => a.position - b.position);

export const moveItemWithinArray = (
  arr: TaskApi[],
  item: TaskApi,
  newIndex: number
) => {
  const arrClone = [...arr];
  const oldIndex = arrClone.indexOf(item);
  arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
  return arrClone;
};

export const insertItemIntoArray = (
  arr: TaskApi[],
  item: TaskApi,
  index: number
) => {
  const arrClone = [...arr];
  arrClone.splice(index, 0, item);
  return arrClone;
};

export function remainingWorkingDays(endDateString: string) {
  // Convert input string to Date object for the end date
  const endDate = new Date(endDateString);

  // Define a function to check if a given date is a weekend (Saturday or Sunday)
  function isWeekend(date: Date) {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  }

  // Get the current date
  const currentDate = new Date();

  // Calculate the remaining working days
  let remainingDays = 0;
  let currentDay = new Date(currentDate);

  while (currentDay <= endDate) {
    if (!isWeekend(currentDay)) {
      remainingDays++;
    }
    currentDay.setDate(currentDay.getDate() + 1);
  }

  return remainingDays;
}
