import React, { useCallback, useState } from "react";
import { Button, TextInput, View } from "react-native";

const SearchBar = ({ onSearch }: { onSearch: (text: string) => void }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = useCallback(() => {
    onSearch(searchText);
  }, [onSearch, searchText]);

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //   console.log('searching')
  //     handleSearch();
  //   }, 500); // debounce time in milliseconds

  //   return () => {
  //     clearTimeout(debounce);
  //   };
  // }, [handleSearch, searchText]);

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <TextInput
        className="h-10 w-full rounded-md border-2 border-gray-300 px-2 text-white"
        onChangeText={(text) => {
          setSearchText(text)
          // handleSearch()
        }}
        value={searchText}
        placeholder="Search"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default SearchBar;
