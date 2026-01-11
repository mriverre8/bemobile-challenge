export interface Character {
  id: number;
  name: string | null;
  image: {
    super_url: string;
  };
}

export interface CharacterInfo extends Character {
  deck: string | null;
  issue_credits: Array<{
    id: number;
  }> | null;
}
