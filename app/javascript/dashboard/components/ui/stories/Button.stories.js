import { action } from '@storybook/addon-actions';
import WoohButton from '../WoohButton.vue';

export default {
  title: 'Components/Button',
  component: WoohButton,
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
  components: { WoohButton },
  template:
    '<wooh-button v-bind="$props" @click="onClick">{{label}}</wooh-button>',
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'New message',
  onClick: action('Hello'),
};
