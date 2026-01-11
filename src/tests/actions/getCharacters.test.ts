import { getCharacters } from '@/app/actions/getCharacters';

global.fetch = jest.fn();
process.env.COMIC_VINE_API_KEY = 'test_api_key';

describe('getCharacters Test Battery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch characters successfully', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Test Character One',
          image: { super_url: 'http://example.com/image.jpg' },
        },
        {
          id: 2,
          name: 'Test Character Two',
          image: { super_url: 'http://example.com/image.jpg' },
        },
      ],
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockResponse,
      ok: true,
    } as Response);

    const result = await getCharacters();

    expect(result).toEqual(mockResponse.results);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        'http://comicvine.gamespot.com/api/characters?api_key=test_api_key&format=json&limit=50&field_list=name,image,id'
      )
    );
  });

  it('should fetch characters with search query', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Test Character One',
          image: { super_url: 'http://example.com/image.jpg' },
        },
      ],
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockResponse,
      ok: true,
    } as Response);

    const searchQuery = 'One';

    const result = await getCharacters(searchQuery);
    expect(result).toEqual(mockResponse.results);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`&filter=name:${encodeURIComponent(searchQuery)}`)
    );
  });

  it('should handle fetch error gracefully', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockRejectedValueOnce(new Error('Test Fetch Error'));

    const result = await getCharacters();
    expect(result).toEqual([]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
