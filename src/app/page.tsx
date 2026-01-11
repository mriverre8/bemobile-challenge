import HomePageClient from './home-page-client';
import HomePageFavsClient from './home-page-favs-client';
import { getCharacters } from './actions/getCharacters';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ searchQuery?: string; favorites?: string }>;
}) {
  const params = await searchParams;
  const searchQuery = params.searchQuery || '';
  const favoritesFlag = params.favorites === 'true' ? true : false;

  if (!favoritesFlag) {
    const characters = await getCharacters(searchQuery);
    return <HomePageClient characters={characters} />;
  } else {
    return <HomePageFavsClient />;
  }
}
