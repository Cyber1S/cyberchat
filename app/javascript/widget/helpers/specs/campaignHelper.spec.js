import {
  stripTrailingSlash,
  formatCampaigns,
  filterCampaigns,
} from '../campaignHelper';
import campaigns from './campaignFixtures';

global.cyberchatWebChannel = {
  workingHoursEnabled: false,
};
describe('#Campaigns Helper', () => {
  describe('stripTrailingSlash', () => {
    it('should return striped trailing slash if url with trailing slash is passed', () => {
      expect(
        stripTrailingSlash({ URL: 'https://chat.cyber1s.com/pricing/' })
      ).toBe('https://chat.cyber1s.com/pricing');
    });
  });

  describe('formatCampaigns', () => {
    it('should return formatted campaigns if campaigns are passed', () => {
      expect(formatCampaigns({ campaigns })).toStrictEqual([
        {
          id: 1,
          timeOnPage: 3,
          triggerOnlyDuringBusinessHours: false,
          url: 'https://chat.cyber1s.com/pricing',
        },
        {
          id: 2,
          triggerOnlyDuringBusinessHours: false,
          timeOnPage: 6,
          url: 'https://chat.cyber1s.com/about',
        },
      ]);
    });
  });
  describe('filterCampaigns', () => {
    it('should return filtered campaigns if formatted campaigns are passed', () => {
      expect(
        filterCampaigns({
          campaigns: [
            {
              id: 1,
              timeOnPage: 3,
              url: 'https://chat.cyber1s.com/pricing',
              triggerOnlyDuringBusinessHours: false,
            },
            {
              id: 2,
              timeOnPage: 6,
              url: 'https://chat.cyber1s.com/about',
              triggerOnlyDuringBusinessHours: false,
            },
          ],
          currentURL: 'https://chat.cyber1s.com/about/',
        })
      ).toStrictEqual([
        {
          id: 2,
          timeOnPage: 6,
          url: 'https://chat.cyber1s.com/about',
          triggerOnlyDuringBusinessHours: false,
        },
      ]);
    });
    it('should return filtered campaigns if formatted campaigns are passed and business hours enabled', () => {
      expect(
        filterCampaigns({
          campaigns: [
            {
              id: 1,
              timeOnPage: 3,
              url: 'https://chat.cyber1s.com/pricing',
              triggerOnlyDuringBusinessHours: false,
            },
            {
              id: 2,
              timeOnPage: 6,
              url: 'https://chat.cyber1s.com/about',
              triggerOnlyDuringBusinessHours: true,
            },
          ],
          currentURL: 'https://chat.cyber1s.com/about/',
          isInBusinessHours: true,
        })
      ).toStrictEqual([
        {
          id: 2,
          timeOnPage: 6,
          url: 'https://chat.cyber1s.com/about',
          triggerOnlyDuringBusinessHours: true,
        },
      ]);
    });
    it('should return empty campaigns if formatted campaigns are passed and business hours disabled', () => {
      expect(
        filterCampaigns({
          campaigns: [
            {
              id: 1,
              timeOnPage: 3,
              url: 'https://chat.cyber1s.com/pricing',
              triggerOnlyDuringBusinessHours: true,
            },
            {
              id: 2,
              timeOnPage: 6,
              url: 'https://chat.cyber1s.com/about',
              triggerOnlyDuringBusinessHours: true,
            },
          ],
          currentURL: 'https://chat.cyber1s.com/about/',
          isInBusinessHours: false,
        })
      ).toStrictEqual([]);
    });
  });
});
