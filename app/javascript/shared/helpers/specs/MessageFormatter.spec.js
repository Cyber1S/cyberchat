import MessageFormatter from '../MessageFormatter';

describe('#MessageFormatter', () => {
  describe('content with links', () => {
    it('should format correctly', () => {
      const message =
        'CyberChat is an opensource tool. [CyberChat](https://www.chat.cyber1s.com)';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>CyberChat is an opensource tool. <a title="" class="link" href="https://www.chat.cyber1s.com" rel="noreferrer noopener nofollow" target="_blank">CyberChat</a></p>'
      );
    });
    it('should format correctly', () => {
      const message =
        'CyberChat is an opensource tool. https://www.chat.cyber1s.com';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p>CyberChat is an opensource tool. <a title="" class="link" href="https://www.chat.cyber1s.com" rel="noreferrer noopener nofollow" target="_blank">https://www.chat.cyber1s.com</a></p>'
      );
    });
  });

  describe('parses heading to strong', () => {
    it('should format correctly', () => {
      const message = '### opensource \n ## tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<strong>opensource</strong><strong>tool</strong>'
      );
    });
  });

  describe('tweets', () => {
    it('should return the same string if not tags or @mentions', () => {
      const message = 'CyberChat is an opensource tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(message);
    });

    it('should add links to @mentions', () => {
      const message =
        '@cyber1sapp is an opensource tool thanks @longnonexistenttwitterusername';
      expect(
        new MessageFormatter(message, true, false).formattedMessage
      ).toMatch(
        '<p><a href="http://twitter.com/cyber1schatapp" target="_blank" rel="noreferrer nofollow noopener">@cyber1sapp</a> is an opensource tool thanks @longnonexistenttwitterusername</p>'
      );
    });

    it('should add links to #tags', () => {
      const message = '#cyber1schatapp is an opensource tool';
      expect(
        new MessageFormatter(message, true, false).formattedMessage
      ).toMatch(
        '<p><a href="https://twitter.com/hashtag/cyber1schatapp" target="_blank" rel="noreferrer nofollow noopener">#cyber1schatapp</a> is an opensource tool</p>'
      );
    });
  });

  describe('private notes', () => {
    it('should return the same string if not tags or @mentions', () => {
      const message = 'CyberChat is an opensource tool';
      expect(new MessageFormatter(message).formattedMessage).toMatch(message);
    });

    it('should add links to @mentions', () => {
      const message =
        '@cyber1sapp is an opensource tool thanks @longnonexistenttwitterusername';
      expect(
        new MessageFormatter(message, false, true).formattedMessage
      ).toMatch(message);
    });

    it('should add links to #tags', () => {
      const message = '#cyber1schatapp is an opensource tool';
      expect(
        new MessageFormatter(message, false, true).formattedMessage
      ).toMatch(message);
    });
  });

  describe('plain text content', () => {
    it('returns the plain text without HTML', () => {
      const message =
        '<b>CyberChat is an opensource tool. https://www.chat.cyber1s.com</b>';
      expect(new MessageFormatter(message).plainText).toMatch(
        'CyberChat is an opensource tool. https://www.chat.cyber1s.com'
      );
    });
  });

  describe('#sanitize', () => {
    it('sanitizes markup and removes all unnecessary elements', () => {
      const message =
        '[xssLink](javascript:alert(document.cookie))\n[normalLink](https://google.com)**I am a bold text paragraph**';
      expect(new MessageFormatter(message).formattedMessage).toMatch(
        '<p><a title="" class="link" rel="noreferrer noopener nofollow" target="_blank">xssLink</a><br><a title="" class="link" href="https://google.com" rel="noreferrer noopener nofollow" target="_blank">normalLink</a><strong>I am a bold text paragraph</strong></p>'
      );
    });
  });
});
