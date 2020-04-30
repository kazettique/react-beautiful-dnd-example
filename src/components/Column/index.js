import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task'
import { Droppable } from 'react-beautiful-dnd'
import classnames from 'classnames/bind'
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
        return (
          <div className={cx('column')} data-is-over={snapshot.isDraggingOver}>
            <h3 className={cx('column-title')}>{columnTitle}</h3>
            <div ref={provided.innerRef} {...provided.droppableProps}>
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
