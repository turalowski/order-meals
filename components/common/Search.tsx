import { LocationContext } from "@/features/restaurants/context/LocationContext";
import { useContext,  useState } from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const SearchContainer = styled.View`
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.secondary};
`;

const StyledSearchBar = styled(Searchbar)`
  background-color: ${props => props.theme.colors.bg.primary};
`;

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { search} = useContext(LocationContext);

  return (
    <SearchContainer>
      <StyledSearchBar
        placeholder="Search for a location"
        onChangeText={(text: string) => setSearchQuery(text)}
        value={searchQuery}
        onSubmitEditing={() => {
          search(searchQuery);
        }}
      />
    </SearchContainer>
  );
}