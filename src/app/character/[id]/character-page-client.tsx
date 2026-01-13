'use client';

import ComicItem from '@/components/comic-item';
import { LIKED_CHARACTERS_ACTION_TYPES } from '@/context/liked-characters-reducer';
import { useStore } from '@/context/store';
import styles from '@/css/character-page.module.css';
import { CharacterInfo } from '@/types/character';
import { Comic } from '@/types/comic';
import { isCharacterLiked } from '@/utils/like-utils';
import Image from 'next/image';

export default function CharacterPageClient({
  character,
  comics,
}: {
  character: CharacterInfo;
  comics: Comic[];
}) {
  const { likedCharacters, dispatchLikedCharacters } = useStore();

  const safeName = character?.name ?? 'Unknown';
  const safeDeck = character?.deck ?? 'No description available.';

  const isCharacterLikedFlag = isCharacterLiked(likedCharacters, character.id);

  return (
    <main
      className={styles.main}
      data-testid="character-page-client"
    >
      <div className={styles.character_container}>
        <div className={styles.character_info_container}>
          <Image
            className={styles.character_image}
            src={character.image.super_url}
            alt={safeName}
            loading="eager"
            unoptimized
            width={200}
            height={300}
          />
          <div className={styles.character_info}>
            <div className={styles.character_title_container}>
              <h1>{safeName}</h1>
              <Image
                className={styles.heart_icon}
                src={
                  isCharacterLikedFlag
                    ? '/heart-icon-default.svg'
                    : '/heart-icon-unselected-2.svg'
                }
                alt="Heart Icon"
                width={26}
                height={26}
                onClick={() =>
                  dispatchLikedCharacters({
                    type: isCharacterLikedFlag
                      ? LIKED_CHARACTERS_ACTION_TYPES.REMOVE_CHARACTER
                      : LIKED_CHARACTERS_ACTION_TYPES.ADD_CHARACTER,
                    payload: character,
                  })
                }
              />
            </div>
            <p>{safeDeck}</p>
          </div>
        </div>
      </div>
      <div className={styles.comics_container}>
        <div className={styles.comics_section}>
          <h2>COMICS</h2>
          {comics.length > 0 ? (
            <div className={styles.comics_grid}>
              {comics.map((comic) => (
                <div key={comic.id}>
                  <ComicItem comic={comic} />
                </div>
              ))}
            </div>
          ) : (
            <p>No comics available.</p>
          )}
        </div>
      </div>
    </main>
  );
}
