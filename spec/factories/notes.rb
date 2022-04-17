# frozen_string_literal: true

FactoryBot.define do
  factory :note do
    content { 'Hey welcome to cyber1schat' }
    account
    user
    contact
  end
end
