import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import classnames from 'classnames/bind'

// component
import Task from '../Task'

// constant
import { ITEM_TYPE } from '../../constants'

// style
import styles from './style.module.scss'

const cx = classnames.bind(styles)

export const propTypes = {
  columnData: PropTypes.object,
}

function Column(props) {
  const { columnData } = props
  const { columnId, columnTitle, taskList } = columnData

  return (
    <Droppable droppableId={columnId} type={ITEM_TYPE.TASK}>
      {(provided, snapshot) => {
        const { droppableProps, innerRef } = provided
        const { isDraggingOver } = snapshot
        return (
          <div className={cx('column')} data-is-over={isDraggingOver}>
            <h3 className={cx('column-title')} data-is-over={isDraggingOver}>{columnTitle}</h3>
            <div ref={innerRef} {...droppableProps}>
              {taskList.map((task, taskIndex) => {
                const { taskId } = task
                return <Task key={taskId} task={task} taskIndex={taskIndex} />
              })}
              {provided.placeholder}
            </div>
          </div>
        )
      }}
    </Droppable>
  )
}

export default Column
