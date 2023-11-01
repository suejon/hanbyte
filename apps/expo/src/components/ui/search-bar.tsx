import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

const SearchBar = ({ onSearch }: { onSearch: (text: string) => void }) => {
  const [searchText, setSearchText] = useState("");

  const debounceSearch = (text: string) => {
    clearTimeout(this.timer); // idk why "this" works inside functional components but it does
    this.timer = setTimeout(() => {
      // Perform the search operation using the 'text' variable
      onSearch(text);
    }, 300);
  };

  useEffect(() => {
    if (searchText === "") return;
    debounceSearch(searchText);
  }, [searchText]);

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <TextInput
        autoCapitalize="none"
        className="h-10 w-full rounded-md border-2 border-gray-300 px-2 text-white"
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search"
      />
    </View>
  );
};

export default SearchBar;
