import React from 'react';
import {IBlockProps} from "../../../Types/Types";
import {useBlock} from "./Hooks/useBlock";

export const Block: React.FC<IBlockProps> = (props) => {
  const {
    order,
    color,
    timeLeft,
    setMod,
    resetBtnHandler
  } = useBlock(props);

  return (
    <div
      className="block"
      style={{backgroundColor: color}}
    >
      <span className="block__order">
        Order:
        <span className='block__value'>
          {order}
        </span>
      </span>
      <span className="block__timer">
        TimeLeft:
        <span className={`block__countdown block__countdown--${setMod()}`}>
          {timeLeft}
        </span>
      </span>
      <button
        className="button block__reset"
        onClick={resetBtnHandler}
      >
        Reset
      </button>
    </div>
  );
};