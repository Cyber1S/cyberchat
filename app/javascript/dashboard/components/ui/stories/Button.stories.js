import { action } from '@storybook/addon-actions';
import c1chatButton from '../c1chatButton.vue';

export default {
  title: 'Components/Button',
  component: c1chatButton,
  argTypes: {
    colorScheme: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'success', 'alert', 'warning'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['tiny', 'small', 'medium', 'large', 'expanded'],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['hollow', 'clear'],
      },
    },
    isLoading: {
      control: {
        type: 'boolean',
      },
    },
    isDisabled: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { c1chatButton },
  template:
    '<c1chat-button v-bind="$props" @click="onClick">{{label}}</c1chat-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'New message',
  onClick: action('Hello'),
};
