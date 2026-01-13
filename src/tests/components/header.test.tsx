import Header from '@/components/header';
import { useStore } from '@/context/store';
import { render, act } from '@testing-library/react';

const mockPush = jest.fn();

jest.mock('@/context/store', () => ({
  useStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

describe('Header Component Test Battery', () => {
  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      likedCharacters: [],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<Header />);
    const header = getByTestId('header-component');
    expect(header).not.toBeNull();
  });

  it('navigate to favorites when heart icon is clicked', () => {
    const { getByAltText } = render(<Header />);
    const heartIcon = getByAltText('Heart Icon');
    act(() => {
      heartIcon.click();
    });
    expect(mockPush).toHaveBeenCalledWith('/?favorites=true');
  });

  it('navigate to home when logo is clicked', () => {
    const { getByAltText } = render(<Header />);
    const logo = getByAltText('Logo');
    act(() => {
      logo.click();
    });
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
