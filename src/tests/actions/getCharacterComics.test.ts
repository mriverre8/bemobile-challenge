import { getCharacterComics } from '@/app/actions/getCharacterComics';

global.fetch = jest.fn();
process.env.COMIC_VINE_API_KEY = 'test_api_key';

describe('getCharacterComics Test Battery', () => {
  const issueCredits = [{ id: 101 }, { id: 102 }, { id: 103 }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch character comics given a list of issue credits', async () => {
    const mockResponse = {
      results: {
        id: 1,
        name: 'Test Comic One',
        image: { super_url: 'http://example.com/image.jpg' },
        cover_date: '2024-01-01',
      },
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockResponse,
      ok: true,
    } as Response);

    const result = await getCharacterComics(issueCredits);

    expect(result).toEqual(mockResponse.results);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://comicvine.gamespot.com/api/issues/?api_key=test_api_key&format=json&filter=id:101|102|103&field_list=id,name,image,cover_date&limit=20&sort=cover_date:desc'
      )
    );
  });

  it('should handle fetch error gracefully', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(new Error('Test Fetch Error'));

    const result = await getCharacterComics(issueCredits);
    expect(result).toEqual([]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
