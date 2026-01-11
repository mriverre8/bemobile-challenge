'use client';

import Card from '@/components/card';
import styles from '@/css/home-page.module.css';
import Image from 'next/image';
import { Character } from '@/types/character';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function HomePageClient({
  characters,
}: {
  characters: Character[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set('searchQuery', query.trim());
      } else {
        params.delete('searchQuery');
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(newUrl);
    },
    [router, pathname, searchParams]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery !== (searchParams.get('searchQuery') || '')) {
        handleSearch(searchQuery);
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [searchQuery, handleSearch, searchParams]);

  return (
    <main
      className={styles.main}
      data-testid="home-page-client"
    >
      <div className={styles.main_container}>
        <div className={styles.search_container}>
          <div className={styles.search_bar}>
            <Image
              className={styles.search_icon}
              src="/search-icon.svg"
              alt="Search Icon"
              loading="eager"
              width={13}
              height={13}
            />
            <input
              data-testid="search-input"
              type="text"
              placeholder="SEARCH A CHARACTER..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span>
            {characters.length === 1
              ? `${characters.length} RESULT`
              : `${characters.length} RESULTS`}
          </span>
        </div>
        <div className={styles.results_container}>
          {characters.map((character) => (
            <div key={character.id}>
              <Card character={character} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
