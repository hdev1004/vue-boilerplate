import Register from './registerDemo.vue'

export default {
  component: Register,
  title: 'Register/Form',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
}

export const Default = {
  args: {}
}
