export interface Entry {
  _id: string;
  english: {
    word: string;
    definition: string;
  };
  korean: {
    word: string;
    definition: string;
    examples: {
      type: string;
      value: string;
    }[]
  };
}
