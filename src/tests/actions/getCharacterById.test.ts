import { getCharacterById } from "@/app/actions/getCharacterById";

global.fetch = jest.fn();
process.env.COMIC_VINE_API_KEY = "test_api_key";

describe("getCharacterById Test Battery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch character by ID successfully", async () => {
    const mockResponse = {
      error: "OK",
      results: {
        id: 1,
        name: "Test Character One",
        image: { super_url: "http://example.com/image.jpg" },
        deck: "This is a test character used for testing purposes.",
        issue_credits: [{ id: 101 }, { id: 102 }, { id: 103 }],
      },
    };

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => mockResponse,
      ok: true,
    } as Response);

    const result = await getCharacterById("1");

    expect(result).toEqual(mockResponse.results);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        "http://comicvine.gamespot.com/api/character/4005-1?api_key=test_api_key&format=json&field_list=name,image,id,deck,issue_credits"
      )
    );
  });

  it("should fetch character by ID and return data error KO", async () => {
    const mockResponse = {
      error: "KO",
      results: {
        id: 1,
        name: "Test Character One",
        image: { super_url: "http://example.com/image.jpg" },
        deck: "This is a test character used for testing purposes.",
        issue_credits: [{ id: 101 }, { id: 102 }, { id: 103 }],
      },
    };

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => mockResponse,
      ok: true,
    } as Response);

    const result = await getCharacterById("1");
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle fetch error gracefully", async () => {
    jest
      .spyOn(global, "fetch")
      .mockRejectedValueOnce(new Error("Test Fetch Error"));

    const result = await getCharacterById("1");
    expect(result).toBeNull();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
