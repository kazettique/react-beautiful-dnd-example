import React, { useState, useEffect } from 'react'
import Column from '../Column'
import classnames from 'classnames/bind'
import { initialTaskLists } from '../../initialTasks'
import { DragDropContext } from 'react-beautiful-dnd'
import cloneDeep from 'lodash/cloneDeep'
import findIndex from 'lodash/findIndex'

// style
import styles from './style.module.scss'

const cx = classnames.bind(styles)

export const propTypes = {}

function Board(props) {
  const [taskList, setTaskList] = useState(initialTaskLists)
  useEffect(() => {
    console.log('%c STATE %c taskList ',
      'background:#35495e; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#61dafb; padding: 1px; border-radius: 0 3px 3px 0;  color: #35495e', taskList)
  }
    , [taskList])

  const handleDrag = result => {
    const { source, destination, draggableId, type, reason } = result
    // 當放置於 droppable ground 區域外的時候，不做任何事
    if (!destination) return
    const { droppableId: sourceColumnId, index: sourceTaskIndex } = source
    const { droppableId: targetColumnId, index: targetTaskIndex } = destination
    // 當放置的 item 是自己的時候，不做任何事
    if (sourceColumnId === targetColumnId && sourceTaskIndex === targetTaskIndex) return

    const newTaskList = cloneDeep(taskList)
    const sourceColumnIndex = findIndex(newTaskList, item => item.columnId === sourceColumnId)
    const targetColumnIndex = findIndex(newTaskList, item => item.columnId === targetColumnId)
    const sourceTaskList = newTaskList[sourceColumnIndex].taskList
    const targetTaskList = newTaskList[targetColumnIndex].taskList
    const [sourceTaskData] = sourceTaskList.splice(sourceTaskIndex, 1)
    targetTaskList.splice(targetTaskIndex, 0, sourceTaskData)
    setTaskList(newTaskList)
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDrag}>
        <h1>JIRA Board made with React-Beautiful-DnD</h1>
        <div className={cx('board')}>
          {taskList.map((columnData, columnIndex) => {
            const { columnId } = columnData
            return <Column key={columnId} columnData={columnData} />
          })}
        </div>
      </DragDropContext>
    </>
  )
}

export default Board