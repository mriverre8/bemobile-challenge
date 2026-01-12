'use client';

import Card from '@/components/card';
import styles from '@/css/home-page.module.css';
import Image from 'next/image';
import { useState } from 'react';

import { useStore } from '@/context/store';

export default function HomePageFavsClient() {
  const { likedItems } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = likedItems.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <main
      className={styles.main_favs}
      data-testid="home-page-favs-client"
    >
      <div className={styles.main_container}>
        <h2 className={styles.favorites_title}>FAVORITES</h2>
        <div className={styles.search_container_favs}>
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
              data-testid="search-input-favs"
              id="search-input-favs"
              name="search-input-favs"
              type="text"
              placeholder="SEARCH A CHARACTER..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <span>
            {filteredItems.length === 1
              ? `${filteredItems.length} RESULT`
              : `${filteredItems.length} RESULTS`}
          </span>
        </div>
        <div className={styles.results_container}>
          {filteredItems.map((character) => (
            <div key={character.id}>
              <Card character={character} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
