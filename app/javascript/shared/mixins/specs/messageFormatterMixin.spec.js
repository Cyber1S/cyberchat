import { shallowMount } from '@vue/test-utils';
import messageFormatterMixin from '../messageFormatterMixin';

describe('messageFormatterMixin', () => {
  it('returns correct plain text', () => {
    const Component = {
      render() {},
      mixins: [messageFormatterMixin],
    };
    const wrapper = shallowMount(Component);
    const message =
      '<b>Cyberchat is an opensource tool. https://chat.cyber1s.com</b>';
    expect(wrapper.vm.getPlainText(message)).toMatch(
      'Cyberchat is an opensource tool. https://chat.cyber1s.com'
    );
  });

  it('stripStyleCharacters returns message without style tags', () => {
    const Component = {
      render() {},
      mixins: [messageFormatterMixin],
    };
    const wrapper = shallowMount(Component);
    const message =
      '<b style="max-width:100%">Cyberchat is an opensource tool. https://chat.cyber1s.com</b><style type="css">.message{}</style>';
    expect(wrapper.vm.stripStyleCharacters(message)).toMatch(
      '<b>Cyberchat is an opensource tool. https://chat.cyber1s.com</b>'
    );
  });
});
