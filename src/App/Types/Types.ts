import React, {FormEvent} from "react";

export interface IBlock {
  id: number;
  order: number;
  color: string;
  timeLeft: number;
}

export type sortTypes = 'none' | 'ascending' | 'descending';

export enum sortEnum {
  NONE = 'none',
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

export interface IControlsProps {
  currentSortType: sortTypes,
  addButtonHandler: (evt: FormEvent<HTMLFormElement>, input: React.RefObject<HTMLInputElement>) => void,
  shuffleButtonHandler: () => void,
  sortButtonHandler: () => void,
}

export interface IBlocksListProps {
  blocks: IBlock[],
  remove: (id: number) => void,
  resetTimer: (id: number, newTimeLeft: number) => void,
}

export interface IBlockProps {
  color: string;
  order: number;
  timeLeft: number;
  setTimeLeft: (left: number) => void
  removeBlock: () => void
}