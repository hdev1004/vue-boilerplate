import Task from './Task.vue'

export const ActionsData = {
  onPinTask: () => {
    alert('test')
  },
  onDisableTask: () => {
    console.log('test')
  }
}

export default {
  component: Task,
  title: 'Task',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData
  }
}

export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX'
    }
  }
}

export const Pinned = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED'
    }
  }
}

export const Disabled = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_DISABLED'
    }
  }
}
