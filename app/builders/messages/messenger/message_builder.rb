class Messages::Messenger::MessageBuilder
  include ::FileTypeHelper

  def process_attachment(attachment)
    return if attachment['type'].to_sym == :template

    attachment_obj = @message.attachments.new(attachment_params(attachment).except(:remote_file_url))
    attachment_obj.save!
    attach_file(attachment_obj, attachment_params(attachment)[:remote_file_url]) if attachment_params(attachment)[:remote_file_url]
    fetch_story_link(attachment_obj) if attachment_obj.file_type == 'story_mention'
    update_attachment_file_type(attachment_obj)
  end

  def attach_file(attachment, file_url)
    attachment_file = Down.download(
      file_url
    )
    attachment.file.attach(
      io: attachment_file,
      filename: attachment_file.original_filename,
      content_type: attachment_file.content_type
    )
  end

  def attachment_params(attachment)
    file_type = attachment['type'].to_sym
    params = { file_type: file_type, account_id: @message.account_id }

    if [:image, :file, :audio, :video, :share, :story_mention].include? file_type
      params.merge!(file_type_params(attachment))
    elsif file_type == :location
      params.merge!(location_params(attachment))
    elsif file_type == :fallback
      params.merge!(fallback_params(attachment))
    end

    params
  end

  def file_type_params(attachment)
    {
      external_url: attachment['payload']['url'],
      remote_file_url: attachment['payload']['url']
    }
  end

  def update_attachment_file_type(attachment)
    return unless attachment.file_type == 'share' || attachment.file_type == 'story_mention'

    attachment.file_type = file_type(attachment.file&.content_type)
    attachment.save!
  end

  def fetch_story_link(attachment)
    message = attachment.message
    begin
      k = Koala::Facebook::API.new(@inbox.channel.page_access_token) if @inbox.facebook?
      result = k.get_object(message.source_id, fields: %w[story from]) || {}
    rescue Koala::Facebook::AuthenticationError
      @inbox.channel.authorization_error!
      raise
    rescue StandardError => e
      result = {}
      Sentry.capture_exception(e)
    end
    story_id = result['story']['mention']['id']
    story_sender = result['from']['username']
    message.content_attributes[:story_sender] = story_sender
    message.content_attributes[:story_id] = story_id
    message.content = I18n.t('conversations.messages.instagram_story_content', story_sender: story_sender)
    message.save!
  end
end
