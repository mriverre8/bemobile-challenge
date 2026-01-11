import { render, act } from "@testing-library/react";
import { useStore } from "@/context/store";
import CharacterPageClient from "@/app/character/[id]/character-page-client";

const mockPush = jest.fn();
const mockSetLikedItems = jest.fn();

jest.mock("@/context/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => "/"),
}));

describe("CharacterPageClient Test Battery", () => {
  const characterMock = {
    id: 1,
    name: "Test Character One",
    image: { super_url: "http://example.com/image.jpg" },
    deck: "This is a test character used for testing purposes.",
    issue_credits: [{ id: 101 }, { id: 102 }, { id: 103 }],
  };

  const comicsMock = [
    {
      id: 101,
      name: "Test Comic One",
      image: { super_url: "http://example.com/comic1.jpg" },
      cover_date: "2023-01-01",
    },
    {
      id: 102,
      name: "Test Comic Two",
      image: { super_url: "http://example.com/comic2.jpg" },
      cover_date: "2023-02-01",
    },
    {
      id: 103,
      name: "Test Comic Three",
      image: { super_url: "http://example.com/comic3.jpg" },
      cover_date: "2023-03-01",
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
    const { getByTestId } = render(
      <CharacterPageClient character={characterMock} comics={comicsMock} />
    );
    const page = getByTestId("character-page-client");
    expect(page).not.toBeNull();
  });

  it("renders without crashing when no comics are provided", () => {
    const { getByText } = render(
      <CharacterPageClient character={characterMock} comics={[]} />
    );
    const noComicsText = getByText("No comics available.");
    expect(noComicsText).not.toBeNull();
  });

  it("renders without crashing when character name and deck are missing", () => {
    const characterWithoutNameAndDeck = {
      ...characterMock,
      name: null,
      deck: null,
    };
    const { getByTestId } = render(
      <CharacterPageClient
        character={characterWithoutNameAndDeck}
        comics={comicsMock}
      />
    );
    const page = getByTestId("character-page-client");
    expect(page).not.toBeNull();
  });

  it("likes character on heart icon click when its not liked", () => {
    const { getByAltText } = render(
      <CharacterPageClient character={characterMock} comics={comicsMock} />
    );
    const heartIcon = getByAltText("Heart Icon");
    act(() => {
      heartIcon.click();
    });

    expect(mockSetLikedItems).toHaveBeenCalledTimes(1);

    // Gets the function passed to setLikedItems
    const updateFunction = mockSetLikedItems.mock.calls[0][0];

    const resultAfterLike = updateFunction([]);
    expect(resultAfterLike).toEqual([characterMock]);
  });

  it("unlikes character on heart icon click when its already liked", () => {
    (useStore as jest.Mock).mockReturnValue({
      likedItems: [characterMock],
      setLikedItems: mockSetLikedItems,
    });
    const { getByAltText } = render(
      <CharacterPageClient character={characterMock} comics={comicsMock} />
    );
    const heartIcon = getByAltText("Heart Icon");
    act(() => {
      heartIcon.click();
    });

    expect(mockSetLikedItems).toHaveBeenCalledTimes(1);

    // Gets the function passed to setLikedItems
    const updateFunction = mockSetLikedItems.mock.calls[0][0];

    const resultAfterUnlike = updateFunction([characterMock]);
    expect(resultAfterUnlike).toEqual([]);
  });
});
