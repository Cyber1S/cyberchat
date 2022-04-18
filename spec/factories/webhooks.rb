FactoryBot.define do
  factory :webhook do
    account_id { 1 }
    inbox_id { 1 }
    url { 'https://chatapi.cyber1s.com' }
  end
end
