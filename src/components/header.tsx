'use client';

import Image from 'next/image';
import styles from '@/css/components/header.module.css';
import { useStore } from '@/context/store';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { likedCharacters } = useStore();

  const setFavoriteFlag = (flag: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (flag) {
      params.set('favorites', 'true');
      params.delete('searchQuery');
    } else {
      params.delete('favorites');
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';

    router.push(newUrl);
  };

  return (
    <div
      className={styles.header}
      data-testid="header-component"
    >
      <div className={styles.header_container}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Logo"
          loading="eager"
          width={130}
          height={52}
          onClick={() => setFavoriteFlag(false)}
        />
        <div className={styles.heart_container}>
          <Image
            className={styles.heart_icon}
            src="/heart-icon-default.svg"
            alt="Heart Icon"
            loading="eager"
            width={24}
            height={24}
            onClick={() => setFavoriteFlag(true)}
          />
          <span>{likedCharacters.length}</span>
        </div>
      </div>
    </div>
  );
}
