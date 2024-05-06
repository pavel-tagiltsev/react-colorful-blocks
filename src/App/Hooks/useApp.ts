import React, {FormEvent, useEffect, useState} from "react";
import {IBlock, sortTypes, sortEnum} from "../Types/Types";
import {
  generateRandomBlock,
  generateRandomRange,
  shuffleArray,
  sortBlocksByType
} from "../Helpers/Helpers";
import {
  MAX_BLOCKS,
  MIN_BLOCKS,
  INITIAL_LIME_LEFT,
  COUNT_DOWN_STOP,
  COUNT_DOWN_INTERVAL,
  DELETE_RANDOM_BLOCK_INTERVAL,
  ALERT_DISAPPEARING_TIMEOUT
} from "../Consts/Consts";

export const useApp = () => {
  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const [currentSortType, setcurrentSortType] = useState<sortTypes>(sortEnum.NONE);
  const [isDeleteRandomBlockAlert, showDeleteRandomBlockAlert] = useState(false);

  useEffect(() => {
    const numberOfBlocks = generateRandomRange(MIN_BLOCKS, MAX_BLOCKS);
    const initialBlocks = Array.from(
      {length: numberOfBlocks},
      (_, index) => generateRandomBlock(index, INITIAL_LIME_LEFT)
    );

    setBlocks(initialBlocks);

    const deleteRandomBlockInterval = setInterval(() => {
      setBlocks(prevBlocks => {
        if (prevBlocks.length) {
          showDeleteRandomBlockAlert(true);
          setTimeout(() => {
            showDeleteRandomBlockAlert(false);
          }, ALERT_DISAPPEARING_TIMEOUT);

          const randomIndex = Math.floor(Math.random() * prevBlocks.length);
          return prevBlocks.filter((_, index) => index !== randomIndex);
        }

        return [];
      });

    }, DELETE_RANDOM_BLOCK_INTERVAL);

    const countDownInterval = setInterval(() => {
      setBlocks(prevBlocks => {
        return prevBlocks.map(block => {
          return {...block, timeLeft: block.timeLeft - COUNT_DOWN_STOP};
        });
      });
    }, COUNT_DOWN_INTERVAL);

    return () => {
      clearInterval(deleteRandomBlockInterval);
      clearInterval(countDownInterval);
    };
  }, []);

  const addButtonHandler = (evt: FormEvent<HTMLFormElement>, input: React.RefObject<HTMLInputElement>) => {
    evt.preventDefault();

    if (input.current) {
      const color = input.current.value.trim();

      if (color) {
        setBlocks(prevBlocks => {
          const newBlockOrder = Math.floor(Math.random() * (prevBlocks.length + 1));
          const newBlock = { color, timeLeft: INITIAL_LIME_LEFT, id: Math.random(), order: newBlockOrder };
          const newBlocks = [...prevBlocks];
          newBlocks.splice(newBlockOrder, 0, newBlock);

          for (let i = 0; i < newBlocks.length; i++) {
            newBlocks[i].order = i;
          }

          return sortBlocksByType[currentSortType](newBlocks);
        });
        input.current.value = '';
        return;
      }

      alert('Please enter a valid color');
      input.current.value = '';
    }
  };

  const shuffleButtonHandler = () => {
    const shuffledOrder = shuffleArray(blocks.map(block => block.order));

    setBlocks(prevBlocks => {
      const shuffledBlocks = prevBlocks.map((block, index) => ({
        ...block,
        order: shuffledOrder[index]
      }));

      if (currentSortType === sortEnum.NONE) {
        return sortBlocksByType[sortEnum.NONE](shuffledBlocks);
      }

      return shuffledBlocks;
    });
  };

  const sortButtonHandler = () => {
    setBlocks(prevBlocks => {
      switch(currentSortType) {
        case(sortEnum.NONE):
          setcurrentSortType(sortEnum.ASCENDING);
          return sortBlocksByType[sortEnum.ASCENDING](prevBlocks);
        case(sortEnum.ASCENDING):
          setcurrentSortType(sortEnum.DESCENDING);
          return sortBlocksByType[sortEnum.DESCENDING](prevBlocks);
        default:
          setcurrentSortType(sortEnum.NONE);
          return sortBlocksByType[sortEnum.NONE](prevBlocks);
      }
    });
  };

  const removeBlock = (id: number) => {
    setBlocks((prevBlocks) => {
      return prevBlocks.filter((block) => block.id !== id);
    });
  };

  const resetBlockTimer = (id: number, newTimeLeft: number) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((block) => {
        return block.id === id ? {...block, timeLeft: newTimeLeft} : block;
      });

      return sortBlocksByType[currentSortType](updatedBlocks);
    });
  }

  return {
    blocks,
    currentSortType,
    isDeleteRandomBlockAlert,
    removeBlock,
    resetBlockTimer,
    addButtonHandler,
    sortButtonHandler,
    shuffleButtonHandler
  };
}