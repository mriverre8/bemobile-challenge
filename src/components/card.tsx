"use client";
import Image from "next/image";
import styles from "@/css/components/card.module.css";
import { useStore } from "@/context/store";
import { Character } from "@/types/character";
import { useRouter } from "next/navigation";
import { isCharacterLiked } from "@/utils/like-utils";

interface Props {
  character: Character;
}

export default function Card({ character }: Props) {
  const router = useRouter();

  const { likedItems, setLikedItems } = useStore();
  const safeName = character?.name ?? "Unknown";

  const viewItem = () => {
    router.push(`/character/${character.id}`);
  };

  const like = () => {
    setLikedItems((prev) => {
      const exists = prev.some((i) => i.id === character.id);

      if (exists) {
        return prev.filter((i) => i.id !== character.id);
      }

      return [...prev, character];
    });
  };

  return (
    <div className={styles.card} data-testid="card-component">
      <Image
        className={styles.card_image}
        src={character.image.super_url}
        alt={safeName}
        loading="lazy"
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
            isCharacterLiked(likedItems, character.id)
              ? "/heart-icon-default.svg"
              : "/heart-icon-unselected-1.svg"
          }
          alt="Heart Icon"
          width={12}
          height={12}
          onClick={() => like()}
        />
      </div>
    </div>
  );
}
