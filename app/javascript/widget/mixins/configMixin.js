export default {
  computed: {
    useInboxAvatarForBot() {
      return window.cyberchatWidgetDefaults.useInboxAvatarForBot;
    },
    hasAConnectedAgentBot() {
      return !!window.cyberchatWebChannel.hasAConnectedAgentBot;
    },
    inboxAvatarUrl() {
      return window.cyberchatWebChannel.avatarUrl;
    },
    channelConfig() {
      return window.cyberchatWebChannel;
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
      return window.cyberchatWebChannel.preChatFormEnabled;
    },
    preChatFormOptions() {
      let requireEmail = false;
      let preChatMessage = '';
      const options = window.cyberchatWebChannel.preChatFormOptions || {};
      requireEmail = options.require_email;
      preChatMessage = options.pre_chat_message;
      return {
        requireEmail,
        preChatMessage,
      };
    },
  },
};
