import c1chatKeyboardShortcutModal from './c1chatKeyShortcutModal.vue';

export default {
  title: 'Components/Shortcuts/Keyboard Shortcut',
  component: c1chatKeyboardShortcutModal,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { c1chatKeyboardShortcutModal },
  template:
    '<c1chat-keyboard-shortcut-modal v-bind="$props"></c1chat-keyboard-shortcut-modal>',
});

export const KeyboardShortcut = Template.bind({});
KeyboardShortcut.args = {};
