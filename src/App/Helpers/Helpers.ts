import {IBlock, sortEnum} from "../Types/Types";

export const generateRandomRange = (min: number, max: number) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomHexColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}
export const generateRandomBlock = (index: number, initialTimeLeft: number) => {
  return {
    id: Math.random(),
    color: generateRandomHexColor(),
    timeLeft: initialTimeLeft,
    order: index,
  };
};

export const shuffleArray = (array: number[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const sortBlocksByType = {
  [sortEnum.NONE]: (blocks: IBlock[]) => [...blocks].sort((a, b) => a.order - b.order),
  [sortEnum.ASCENDING]: (blocks: IBlock[]) => [...blocks].sort((a, b) => a.timeLeft - b.timeLeft),
  [sortEnum.DESCENDING]: (blocks: IBlock[]) => [...blocks].sort((a, b) => b.timeLeft - a.timeLeft),
};
