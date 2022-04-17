import { action } from '@storybook/addon-actions';
import c1chatDateRangePicker from '../DateRangePicker.vue';

export default {
  title: 'Components/Date Picker/Date Range Picker',
  argTypes: {
    confirmText: {
      defaultValue: 'Apply',
      control: {
        type: 'text',
      },
    },
    placeholder: {
      defaultValue: 'Select date range',
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
  components: { c1chatDateRangePicker },
  template:
    '<c1chat-date-range-picker v-bind="$props" @change="onChange"></c1chat-date-range-picker>',
});

export const DateRangePicker = Template.bind({});
DateRangePicker.args = {
  onChange: action('applied'),
  value: new Date(),
};
