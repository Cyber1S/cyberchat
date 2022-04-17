import { action } from '@storybook/addon-actions';
import c1chatDateTimePicker from '../DateTimePicker.vue';

export default {
  title: 'Components/Date Picker/Date Time Picker',
  argTypes: {
    confirmText: {
      defaultValue: 'Apply',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'Select date time',
      control: {
        type: 'text',
      },
    },
    value: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { c1chatDateTimePicker },
  template:
    '<c1chat-date-time-picker v-bind="$props" @change="onChange"></c1chat-date-time-picker>',
});

export const DateTimePicker = Template.bind({});
DateTimePicker.args = {
  onChange: action('applied'),
  value: new Date(),
};
