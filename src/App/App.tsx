import React from 'react';
import {BlocksList} from "./Components/BlocksList/BlocksList";
import {Controls} from "./Components/Controls/Controls";
import {useApp} from "./Hooks/useApp";

const App: React.FC = () => {
  const {
    blocks,
    currentSortType,
    isDeleteRandomBlockAlert,
    addButtonHandler,
    sortButtonHandler,
    shuffleButtonHandler,
    removeBlock,
    resetBlockTimer
  } = useApp();

  return (
    <div className="app container">
      <h1 className="heading heading--h1">
        React colorful blocks by&nbsp;
        <a
          className="app__link"
          href="https://pavel-tagiltsev.github.io/portfolio/"
          target="_blank"
        >
          Pavel Tagiltsev
        </a>
      </h1>
      <Controls
        currentSortType={currentSortType}
        addButtonHandler={addButtonHandler}
        sortButtonHandler={sortButtonHandler}
        shuffleButtonHandler={shuffleButtonHandler}
      />
      {isDeleteRandomBlockAlert && <p className="app__alert">Random block is deleted</p>}
      <BlocksList
        blocks={blocks}
        remove={removeBlock}
        resetTimer={resetBlockTimer}
      />
    </div>
  );
};

export default App;
