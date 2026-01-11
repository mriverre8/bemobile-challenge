import { render, fireEvent, act } from "@testing-library/react";
import { useStore } from "@/context/store";
import HomePageFavsClient from "@/app/home-page-favs-client";

const mockSetLikedItems = jest.fn();

jest.mock("@/context/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe("HomePageFavsClient Test Battery", () => {
  const likedItems = [
    {
      id: 1,
      name: "Test Character One",
      image: { super_url: "http://example.com/image.jpg" },
    },
    {
      id: 2,
      name: "Test Character Two",
      image: { super_url: "http://example.com/image2.jpg" },
    },
    {
      id: 3,
      name: "Test Character Three",
      image: { super_url: "http://example.com/image3.jpg" },
    },
  ];

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      likedItems: [],
      setLikedItems: mockSetLikedItems,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    const { getByTestId } = render(<HomePageFavsClient />);
    const page = getByTestId("home-page-favs-client");
    expect(page).not.toBeNull();
  });

  it("displays no results when likedItems is empty", () => {
    const { getByText } = render(<HomePageFavsClient />);
    const resultsText = getByText("0 RESULTS");
    expect(resultsText).not.toBeNull();
  });

  it("displays correct number of results", () => {
    (useStore as jest.Mock).mockReturnValue({
      likedItems: likedItems,
      setLikedItems: mockSetLikedItems,
    });
    const { getByText } = render(<HomePageFavsClient />);
    const resultsText = getByText("3 RESULTS");
    expect(resultsText).not.toBeNull();
  });

  it("filters characters based on search input", () => {
    (useStore as jest.Mock).mockReturnValue({
      likedItems: likedItems,
      setLikedItems: mockSetLikedItems,
    });
    const { getByTestId, getByText } = render(<HomePageFavsClient />);
    const searchInput = getByTestId("search-input-favs");

    act(() => {
      fireEvent.change(searchInput, { target: { value: "Two" } });
    });

    expect(getByText("1 RESULT")).not.toBeNull();
  });
});
