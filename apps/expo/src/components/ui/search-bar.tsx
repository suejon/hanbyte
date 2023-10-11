import React, { useCallback, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

const SearchBar = ({ onSearch }: { onSearch: (text: string) => void }) => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const debounce = (func: Function, delay: number) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((term: string) => {
    setDebouncedSearchTerm(term);
    handleSearch()
  }, 1000); // Adjust the debounce time as needed (in milliseconds)


  const handleSearch = useCallback(() => {
    onSearch(searchText);
  }, [onSearch, searchText]);

  useEffect(() => {
    debouncedSearch(searchText);
    // Cleanup the debounce on component unmount
    return () => {
      clearTimeout(debouncedSearch);
    };
  }, [searchText]);

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <TextInput
        className="h-10 w-full rounded-md border-2 border-gray-300 px-2 text-white"
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search"
      />
      <Text className="text-white">Debounced Search Term: {debouncedSearchTerm}</Text>
    </View>
  );
};

export default SearchBar;
