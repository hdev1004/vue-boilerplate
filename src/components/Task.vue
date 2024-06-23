<template>
  <div class="list-item">
    <label for="title" :aria-label="task.title">
      <input
        type="text"
        readonly
        :value="task.title"
        id="title"
        name="title"
        :class="`${task.state}`"
        :disabled="task.state === 'TASK_DISABLED'"
        :onclick="handlePinClick"
      />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.TASK_PINNED {
  width: 500px;
  height: 40px;
  font-size: 16px;
  border: 1px solid lightgray;
  outline: none;
  padding: 10px;
}

.TASK_DISABLED {
  width: 500px;
  height: 40px;
  font-size: 16px;
  border: 1px solid lightgray;
  outline: none;
  padding: 10px;
}
</style>

<script setup lang="ts">
interface Task {
  id: string
  state: string
  title: string
}

const props = defineProps<{
  task: Task
  onPinTask: Function
  onDisableTask: Function
}>()

const handlePinClick = () => {
  props.onPinTask()
}

const handleDisableClick = () => {
  props.onDisableTask()
}
</script>
