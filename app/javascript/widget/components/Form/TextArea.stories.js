import { action } from '@storybook/addon-actions';
import woohTextArea from './TextArea';

export default {
  title: 'Components/Form/Text Area',
  component: woohTextArea,
  argTypes: {
    label: {
      defaultValue: 'Message',
      control: {
        type: 'text',
      },
    },
    type: {
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'Please enter your message',
      control: {
        type: 'text',
      },
    },
    value: {
      defaultValue: 'Lorem ipsum is a placeholder text commonly used',
      control: {
        type: 'text ,number',
      },
    },
    error: {
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { woohTextArea },
  template:
    '<wooh-text-area v-bind="$props" @input="onClick"></wooh-text-area>',
});

export const TextArea = Template.bind({});
TextArea.args = {
  onClick: action('Added'),
};
