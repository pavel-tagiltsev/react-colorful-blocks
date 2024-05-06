import React, {useRef} from 'react';
import {IControlsProps} from "../../Types/Types";

export const Controls: React.FC<IControlsProps> = (props) => {
  const {
    currentSortType,
    addButtonHandler,
    shuffleButtonHandler,
    sortButtonHandler
  } = props;

  const input = useRef<HTMLInputElement>(null);

  return (
    <section className="controls">
      <h2 className="heading heading--h2">Controls</h2>
      <div className="controls__panel">
        <button
          className="button controls__shuffle"
          onClick={shuffleButtonHandler}
        >
          Shuffle
        </button>
        <form className="controls__form" onSubmit={(evt) => addButtonHandler(evt, input)}>
          <input
            className="input controls__input"
            placeholder="Enter color"
            name="color"
            type="text"
            ref={input}
          />
          <button
            className='button controls__add'
            type='submit'
          >
            Add
          </button>
        </form>
        <button
          className={`button controls__sort controls__sort--${currentSortType}`}
          onClick={sortButtonHandler}
        >
          Sort {currentSortType}
        </button>
      </div>
    </section>
  );
};