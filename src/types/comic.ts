export interface Comic {
  cover_date: string | null;
  id: number;
  image: {
    super_url: string;
  };
  name: string | null;
}
