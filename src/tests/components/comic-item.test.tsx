import { render } from '@testing-library/react';
import ComicItem from '@/components/comic-item';

describe('ComicItem Component Test Battery', () => {
  const comicMock = {
    id: 1,
    name: 'Test Comic One',
    image: { super_url: 'http://example.com/image.jpg' },
    cover_date: '2023-01-01',
  };

  it('renders without crashing', () => {
    const { getByTestId } = render(<ComicItem comic={comicMock} />);
    const comic = getByTestId('comic-component');
    expect(comic).not.toBeNull();
  });

  it('renders without crashing when name and cover date are missing', () => {
    const comicWithoutNameAndCoverDate = {
      ...comicMock,
      name: null,
      cover_date: null,
    };
    const { getByTestId } = render(
      <ComicItem comic={comicWithoutNameAndCoverDate} />
    );
    const comic = getByTestId('comic-component');
    expect(comic).not.toBeNull();
  });
});
