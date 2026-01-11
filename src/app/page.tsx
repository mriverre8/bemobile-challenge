import HomePageClient from './home-page-client';
import HomePageFavsClient from './home-page-favs-client';
import { getCharacters } from './actions/getCharacters';
import { Suspense } from 'react';

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
    return (
      <Suspense>
        <HomePageClient characters={characters} />
      </Suspense>
    );
  } else {
    return <HomePageFavsClient />;
  }
}
