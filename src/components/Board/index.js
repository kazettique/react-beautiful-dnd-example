import React, { useState, useEffect } from 'react'
import Column from '../Column'
import classnames from 'classnames/bind'
import { initialTaskLists } from '../../initialTasks'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import cloneDeep from 'lodash/cloneDeep'
import findIndex from 'lodash/findIndex'

// constant
import { ITEM_TYPE } from '../../constants'

// style
import styles from './style.module.scss'

const cx = classnames.bind(styles)

export const propTypes = {}

function Board(props) {
  const [taskList, setTaskList] = useState(initialTaskLists)
  useEffect(() => {
    console.log(
      '%c STATE %c taskList ',
      'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#61dafb; padding: 1px; border-radius: 0 3px 3px 0;  color: #35495e',
      taskList
    )
  }, [taskList])

  const handleDragTask = (result) => {
    const { source, destination, draggableId, type, reason } = result

    // 當放置於 droppable ground 區域外的時候，不做任何事
    if (!destination) return
    const { droppableId: sourceColumnId, index: sourceIndex } = source
    const { droppableId: targetColumnId, index: targetIndex } = destination
    // 當放置的 item 是自己的時候，不做任何事
    if (sourceColumnId === targetColumnId && sourceIndex === targetIndex) return

    const newTaskList = cloneDeep(taskList)
    const sourceColumnIndex = findIndex(newTaskList, (item) => item.columnId === sourceColumnId)
    const targetColumnIndex = findIndex(newTaskList, (item) => item.columnId === targetColumnId)

    // 若 drag type 是 task
    if (type === ITEM_TYPE.TASK) {
      const sourceTaskList = newTaskList[sourceColumnIndex].taskList
      const targetTaskList = newTaskList[targetColumnIndex].taskList
      const [sourceTaskData] = sourceTaskList.splice(sourceIndex, 1)
      targetTaskList.splice(targetIndex, 0, sourceTaskData)
      // 若 drag type 是 column
    } else if (type === ITEM_TYPE.COLUMN) {
      const [sourceColumnData] = newTaskList.splice(sourceIndex, 1)
      newTaskList.splice(targetIndex, 0, sourceColumnData)
    }

    setTaskList(newTaskList)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragTask}>
        <h1 className={cx('board-title')}>JIRA Board made with React-Beautiful-DnD</h1>
        <Droppable droppableId="all-columns" direction="horizontal" type={ITEM_TYPE.COLUMN}>
          {(provided) => {
            const { droppableProps, innerRef, placeholder } = provided
            return (
              <div className={cx('board')} {...droppableProps} ref={innerRef}>
                {taskList.map((columnData, columnIndex) => {
                  const { columnId } = columnData
                  return <Column key={columnId} columnData={columnData} columnIndex={columnIndex} />
                })}
                {placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default Board
