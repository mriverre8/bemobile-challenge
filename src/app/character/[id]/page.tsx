import { getCharacterById } from '@/app/actions/getCharacterById';
import CharacterPageClient from './character-page-client';
import { getCharacterComics } from '@/app/actions/getCharacterComics';
import { Comic } from '@/types/comic';

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const character = await getCharacterById(id);

  if (!character) {
    return <div>Character not found</div>;
  }

  let comics: Comic[] = [];
  if (character.issue_credits && character.issue_credits.length > 0) {
    comics = await getCharacterComics(character.issue_credits);
  }

  return (
    <CharacterPageClient
      character={character}
      comics={comics}
    />
  );
}
