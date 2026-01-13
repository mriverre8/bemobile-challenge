'use client';
import Image from 'next/image';
import styles from '@/css/components/card.module.css';
import { useStore } from '@/context/store';
import { Character } from '@/types/character';
import { useRouter } from 'next/navigation';
import { isCharacterLiked } from '@/utils/like-utils';
import { LIKED_CHARACTERS_ACTION_TYPES } from '@/context/liked-characters-reducer';

interface Props {
  character: Character;
}

export default function Card({ character }: Props) {
  const router = useRouter();

  const { likedCharacters, dispatchLikedCharacters } = useStore();
  const safeName = character?.name ?? 'Unknown';

  const isCharacterLikedFlag = isCharacterLiked(likedCharacters, character.id);

  const viewItem = () => {
    router.push(`/character/${character.id}`);
  };

  return (
    <div
      className={styles.card}
      data-testid="card-component"
    >
      <Image
        className={styles.card_image}
        src={character.image.super_url}
        alt={safeName}
        loading="eager"
        unoptimized
        width={200}
        height={300}
        onClick={() => viewItem()}
      />
      <div className={styles.card_name_container}>
        <span>{safeName}</span>

        <Image
          className={styles.heart_icon}
          src={
            isCharacterLikedFlag
              ? '/heart-icon-default.svg'
              : '/heart-icon-unselected-1.svg'
          }
          alt="Heart Icon"
          width={12}
          height={12}
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
    </div>
  );
}
