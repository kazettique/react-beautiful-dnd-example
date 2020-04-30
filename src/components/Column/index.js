import React from 'react'
import PropTypes from 'prop-types'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import classnames from 'classnames/bind'
import DragIcon from '../../assets/grip-vertical-solid.svg'

// component
import Task from '../Task'

// constant
import { ITEM_TYPE } from '../../constants'

// style
import styles from './style.module.scss'

const cx = classnames.bind(styles)

export const propTypes = {
  columnData: PropTypes.object,
  columnIndex: PropTypes.number,
}

function Column(props) {
  const { columnData, columnIndex } = props
  const { columnId, columnTitle, taskList } = columnData

  return (
    <Draggable draggableId={columnId} index={columnIndex} type={ITEM_TYPE.COLUMN}>
      {(provided, snapshot) => {
        const { draggableProps, innerRef: dragInnerRef, dragHandleProps } = provided
        const { isDragging } = snapshot
        return (
          <div className={cx('wrapper')} {...draggableProps} ref={dragInnerRef} data-is-dragging={isDragging}>
            <Droppable droppableId={columnId} type={ITEM_TYPE.TASK}>
              {(provided, snapshot) => {
                const { droppableProps, innerRef: dropInnerRef, placeholder } = provided
                const { isDraggingOver } = snapshot
                return (
                  <div className={cx('column')} data-is-over={isDraggingOver}>
                    <h3 className={cx('column-title')} data-is-over={isDraggingOver} {...dragHandleProps}>
                      <img src={DragIcon} alt="drag" className={cx('column-drag_icon')} />
                      {columnTitle}
                    </h3>
                    <div ref={dropInnerRef} {...droppableProps}>
                      {taskList.map((task, taskIndex) => {
                        const { taskId } = task
                        return <Task key={taskId} task={task} taskIndex={taskIndex} />
                      })}
                      {placeholder}
                    </div>
                  </div>
                )
              }}
            </Droppable>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Column
