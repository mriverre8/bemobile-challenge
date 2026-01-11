'use client';
import Image from 'next/image';
import styles from '@/css/components/comic-item.module.css';

import { Comic } from '@/types/comic';

export default function ComicItem({ comic }: { comic: Comic }) {
  const safeComicName = comic?.name ?? 'Unknown';
  const safeCoverDate = comic?.cover_date?.split('-')[0] ?? 'Unknown';
  return (
    <div
      className={styles.comic_item_container}
      data-testid="comic-component"
    >
      <Image
        className={styles.comic_image}
        src={comic.image.super_url}
        alt={safeComicName}
        loading="lazy"
        unoptimized
        width={200}
        height={300}
      />
      <div>
        <span>{safeComicName}</span>
        <p>{safeCoverDate}</p>
      </div>
    </div>
  );
}
