require 'rails_helper'

RSpec.describe Internal::CheckNewVersionsJob, type: :job do
  subject(:job) { described_class.perform_now }

  it 'updates the latest cyberchat version in redis' do
    version = '1.1.1'
    allow(Rails.env).to receive(:production?).and_return(true)
    allow(CyberchatHub).to receive(:latest_version).and_return(version)
    job
    expect(CyberchatHub).to have_received(:latest_version)
    expect(::Redis::Alfred.get(::Redis::Alfred::LATEST_CYBERCHAT_VERSION)).to eq version
  end
end
