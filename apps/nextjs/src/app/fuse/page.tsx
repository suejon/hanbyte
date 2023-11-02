"use client";

import { useState } from "react";
import Fuse from "fuse.js";
// import entries from "public/entry.json";

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
    }[];
  };
}
const fuseOptions = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 1,
  // location: 0,
  threshold: 0.2,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "english.word",
    // "korean.word",
    // "english.definition"
  ],
};
// const fuse = new Fuse(entries as Entry[], fuseOptions);

const FusePlayground = () => {
  const [results, setResults] = useState<Entry[]>([]);
  return (
    <>
      <h1>Fuse</h1>

      <input
        className="border-2 border-gray-300"
        type="text"
        placeholder="Search"
        onChange={(e) => {
          // const start = performance.now();
          // const results = fuse.search<Entry>(e.target.value);
          // const end = performance.now();
          // console.log(`fuse search took ${end - start}ms`);
          //
          // const slicestart = performance.now();
          // const r = results.slice(0, 10).map((r) => r.item);
          // const sliceend = performance.now();
          // console.log(`fuse slice took ${sliceend - slicestart}ms`);
          //
          setResults([]);
        }}
      />
      <ol>
        {results.map((r) => (
          <li>
            {r.english.word} {r.korean.word}
          </li>
        ))}
      </ol>
    </>
  );
};
export default FusePlayground;
