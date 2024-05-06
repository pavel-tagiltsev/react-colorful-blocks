import React from "react";
import { Block } from "./Components/Block";
import { IBlocksListProps } from "../../Types/Types";
import {motion, AnimatePresence } from 'framer-motion'

export const BlocksList: React.FC<IBlocksListProps> = (props) => {
  const {
    blocks,
    remove,
    resetTimer
  } = props;

  const isBlocks = Boolean(blocks.length);

  return (
    <section className="blocks-list">
      <h2 className="heading heading--h2">Blocks list</h2>
      <ul className="blocks-list__list">
        <AnimatePresence>
          {blocks.map(({id, color, timeLeft, order}, index) => (
              <motion.li
                key={id}
                className="blocks-list__item"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Block
                  color={color}
                  order={order}
                  timeLeft={timeLeft}
                  removeBlock={() => remove(id)}
                  setTimeLeft={(newTimeLeft) => resetTimer(id, newTimeLeft)}
                />
              </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {!isBlocks && <p className="blocks-list__paragraph">All blocks are deleted</p>}
    </section>
  )
}