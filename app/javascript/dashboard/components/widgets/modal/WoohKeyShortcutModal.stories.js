import WoohKeyboardShortcutModal from './WoohKeyShortcutModal.vue';

export default {
  title: 'Components/Shortcuts/Keyboard Shortcut',
  component: WoohKeyboardShortcutModal,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WoohKeyboardShortcutModal },
  template:
    '<wooh-keyboard-shortcut-modal v-bind="$props"></wooh-keyboard-shortcut-modal>',
});

export const KeyboardShortcut = Template.bind({});
KeyboardShortcut.args = {};
