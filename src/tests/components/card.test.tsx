import Card from '@/components/card';
import { render, act } from '@testing-library/react';
import { useStore } from '@/context/store';
import { LIKED_CHARACTERS_ACTION_TYPES } from '@/context/liked-characters-reducer';

const mockPush = jest.fn();
const mockDispatchLikedCharacters = jest.fn();

jest.mock('@/context/store', () => ({
  useStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

describe('Card Component Test Battery', () => {
  const characterMock = {
    id: 1,
    name: 'Test Character One',
    image: { super_url: 'http://example.com/image.jpg' },
  };

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      likedCharacters: [],
      dispatchLikedCharacters: mockDispatchLikedCharacters,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<Card character={characterMock} />);
    const card = getByTestId('card-component');
    expect(card).not.toBeNull();
  });

  it('renders without crashing when character name is missing', () => {
    const characterWithoutName = { ...characterMock, name: null };
    const { getByTestId } = render(<Card character={characterWithoutName} />);
    const card = getByTestId('card-component');
    expect(card).not.toBeNull();
  });

  it('redirects to character detail page on image click', () => {
    const { getByAltText } = render(<Card character={characterMock} />);
    const image = getByAltText(characterMock.name);
    act(() => {
      image.click();
    });
    expect(mockPush).toHaveBeenCalledWith(`/character/${characterMock.id}`);
  });

  it('likes character on heart icon click when its not liked', () => {
    const { getByAltText } = render(<Card character={characterMock} />);
    const heartIcon = getByAltText('Heart Icon');
    act(() => {
      heartIcon.click();
    });

    expect(mockDispatchLikedCharacters).toHaveBeenCalledWith({
      type: LIKED_CHARACTERS_ACTION_TYPES.ADD_CHARACTER,
      payload: characterMock,
    });
  });

  it('unlikes character on heart icon click when its already liked', () => {
    (useStore as jest.Mock).mockReturnValue({
      likedCharacters: [characterMock],
      dispatchLikedCharacters: mockDispatchLikedCharacters,
    });
    const { getByAltText } = render(<Card character={characterMock} />);
    const heartIcon = getByAltText('Heart Icon');
    act(() => {
      heartIcon.click();
    });

    expect(mockDispatchLikedCharacters).toHaveBeenCalledWith({
      type: LIKED_CHARACTERS_ACTION_TYPES.REMOVE_CHARACTER,
      payload: characterMock,
    });
  });
});
