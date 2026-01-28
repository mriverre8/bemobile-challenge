import { render, fireEvent, act } from '@testing-library/react';
import { useStore } from '@/context/store';
import HomePageClient from '@/app/home-page-client';

const mockPush = jest.fn();
const mockDispatchLikedCharacters = jest.fn();

jest.mock('@/context/store', () => ({
  useStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => '/'),
}));

describe('HomePageClient Test Battery', () => {
  const characters = [
    {
      id: 1,
      name: 'Test Character One',
      image: { super_url: 'http://example.com/image.jpg' },
    },
    {
      id: 2,
      name: 'Test Character Two',
      image: { super_url: 'http://example.com/image2.jpg' },
    },
    {
      id: 3,
      name: 'Test Character Three',
      image: { super_url: 'http://example.com/image3.jpg' },
    },
  ];

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      likedCharacters: [],
      dispatchLikedCharacters: mockDispatchLikedCharacters,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<HomePageClient characters={characters} />);
    const page = getByTestId('home-page-client');
    expect(page).not.toBeNull();
  });

  it('renders only 1 result', () => {
    const { getByText } = render(
      <HomePageClient characters={characters.slice(0, 1)} />
    );
    const resultsText = getByText('1 RESULT');
    expect(resultsText).not.toBeNull();
  });

  it('updates search input value and triggers router push after debounce timeout', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<HomePageClient characters={characters} />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;

    act(() => {
      fireEvent.change(searchInput, { target: { value: 'Batman' } });
    });

    expect(searchInput.value).toBe('Batman');

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(mockPush).toHaveBeenCalledWith('/?searchQuery=Batman');
  });

  it('updates search input value with empty string and triggers router push after debounce timeout', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<HomePageClient characters={characters} />);
    const searchInput = getByTestId('search-input') as HTMLInputElement;

    act(() => {
      fireEvent.change(searchInput, { target: { value: ' ' } });
    });

    expect(searchInput.value).toBe(' ');

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
