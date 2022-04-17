export default {
  computed: {
    useInboxAvatarForBot() {
      return window.cyber1schatWidgetDefaults.useInboxAvatarForBot;
    },
    hasAConnectedAgentBot() {
      return !!window.cyber1schatWebChannel.hasAConnectedAgentBot;
    },
    inboxAvatarUrl() {
      return window.cyber1schatWebChannel.avatarUrl;
    },
    channelConfig() {
      return window.cyber1schatWebChannel;
    },
    hasEmojiPickerEnabled() {
      return this.channelConfig.enabledFeatures.includes('emoji_picker');
    },
    hasAttachmentsEnabled() {
      return this.channelConfig.enabledFeatures.includes('attachments');
    },
    hasEndConversationEnabled() {
      return this.channelConfig.enabledFeatures.includes('end_conversation');
    },
    preChatFormEnabled() {
      return window.cyber1schatWebChannel.preChatFormEnabled;
    },
    preChatFormOptions() {
      let requireEmail = false;
      let preChatMessage = '';
      const options = window.cyber1schatWebChannel.preChatFormOptions || {};
      requireEmail = options.require_email;
      preChatMessage = options.pre_chat_message;
      return {
        requireEmail,
        preChatMessage,
      };
    },
  },
};
