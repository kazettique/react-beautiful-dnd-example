const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    }
  },
  columnOrder: ['column-1']
}

const initialTaskLists = [
  {
    columnId: 'c01',
    columnTitle: 'To Do',
    taskList: [
      { taskId: '100', content: 'Code Refinement' },
      { taskId: '101', content: 'Daily Meeting' },
      { taskId: '102', content: 'Study Vue' },
      { taskId: '103', content: 'Add RWD' },
    ],
  },
  {
    columnId: 'c02',
    columnTitle: 'In Progress',
    taskList: [
      { taskId: '104', content: 'Fix IE bugs' },
      { taskId: '105', content: 'Study React-DnD' },
    ],
  },
  {
    columnId: 'c03',
    columnTitle: 'Done',
    taskList: [
      { taskId: '106', content: 'Write testing' }
    ],
  }

]

export { initialData, initialTaskLists }