import Card from "@/components/card";
import { render, act } from "@testing-library/react";
import { useStore } from "@/context/store";

const mockPush = jest.fn();
const mockSetLikedItems = jest.fn();

jest.mock("@/context/store", () => ({
  useStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

describe("Card Component Test Battery", () => {
  const characterMock = {
    id: 1,
    name: "Test Character One",
    image: { super_url: "http://example.com/image.jpg" },
  };

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
    const { getByTestId } = render(<Card character={characterMock} />);
    const card = getByTestId("card-component");
    expect(card).not.toBeNull();
  });

  it("renders without crashing when character name is missing", () => {
    const characterWithoutName = { ...characterMock, name: null };
    const { getByTestId } = render(<Card character={characterWithoutName} />);
    const card = getByTestId("card-component");
    expect(card).not.toBeNull();
  });

  it("redirects to character detail page on image click", () => {
    const { getByAltText } = render(<Card character={characterMock} />);
    const image = getByAltText(characterMock.name);
    act(() => {
      image.click();
    });
    expect(mockPush).toHaveBeenCalledWith(`/character/${characterMock.id}`);
  });

  it("likes character on heart icon click when its not liked", () => {
    const { getByAltText } = render(<Card character={characterMock} />);
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
    const { getByAltText } = render(<Card character={characterMock} />);
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
