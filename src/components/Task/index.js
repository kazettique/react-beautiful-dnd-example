import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import classnames from 'classnames/bind'
import { ITEM_TYPE } from '../../constants'

// style
import styles from './style.module.scss'

const cx = classnames.bind(styles)

export const propTypes = {
  task: PropTypes.object,
  taskIndex: PropTypes.number,
}

function Task(props) {
  const { task, taskIndex } = props
  const { taskId, content } = task

  return (
    <Draggable draggableId={taskId} index={taskIndex} type={ITEM_TYPE.TASK}>
      {(provided, snapshot) => {
        return (
          <div
            className={cx('wrapper')}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={cx('task')} data-is-dragging={snapshot.isDragging}>
              <strong>[IT-{taskId}]</strong>
              <p>{content}</p>
            </div>
          </div>
        )
      }}

    </Draggable>
  )
}

export default Task
