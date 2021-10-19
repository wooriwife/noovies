import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
  margin-bottom: 15px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HListSeparator = styled.View`
  width: 20px;
`;

interface HListProps {
  title: string;
  data: any[];
  fetchMore: () => void;
}

const Hlist: React.FC<HListProps> = ({ title, data, fetchMore }) => {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        contentContainerStyle={{ paddingLeft: 15 }}
        data={data}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default Hlist;
