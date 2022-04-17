require 'rails_helper'

RSpec.describe Internal::CheckNewVersionsJob, type: :job do
  subject(:job) { described_class.perform_now }

  it 'updates the latest cyber1schat version in redis' do
    version = '1.1.1'
    allow(Rails.env).to receive(:production?).and_return(true)
    allow(Cyber1SChatHub).to receive(:latest_version).and_return(version)
    job
    expect(Cyber1SChatHub).to have_received(:latest_version)
    expect(::Redis::Alfred.get(::Redis::Alfred::LATEST_CYBER1SCHAT_VERSION)).to eq version
  end
end
