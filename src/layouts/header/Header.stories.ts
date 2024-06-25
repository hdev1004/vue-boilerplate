import Header from './HeaderDemo.vue'

export default {
  component: Header,
  title: 'Layout/Header',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/
}

export const Default = {
  args: {}
}
