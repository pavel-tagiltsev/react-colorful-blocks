import {useEffect} from "react";
import {IBlockProps} from "../../../../Types/Types";

export const useBlock = (props: IBlockProps) => {
  const {color, timeLeft, setTimeLeft, removeBlock, order} = props;

  useEffect(() => {
    if (timeLeft <= 0) {
      removeBlock();
    }
  }, [timeLeft, removeBlock]);

  const resetBtnHandler = () => {
    setTimeLeft(20);
  };

  const setMod = () => {
    if (timeLeft <= 3) {
      return 'finish';
    }

    if (timeLeft < 10) {
      return 'half';
    }

    return 'start';
  }

  return {
    order,
    color,
    timeLeft,
    setMod,
    resetBtnHandler
  }
}