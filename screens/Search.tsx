import React, { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import Hlist from "../components/HList";
import Loader from "../components/Loader";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
    hasNextPage: movieHasNextPage,
    fetchNextPage: movieFetchNextPage,
  } = useInfiniteQuery(["searchMovies", query], moviesApi.search, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
    hasNextPage: tvHasNextPage,
    fetchNextPage: tvFetchNextPage,
  } = useInfiniteQuery(["searchTv", query], tvApi.search, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
    enabled: false,
  });

  const movieFetchMore = () => {
    if (movieHasNextPage) movieFetchNextPage();
  };
  const tvFetchMore = () => {
    if (tvHasNextPage) tvFetchNextPage();
  };

  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query == "") {
      return;
    }
    searchMovies();
    searchTv();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or Tv show"
        placeholderTextColor="gray"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}

      {moviesData ? (
        <Hlist
          title={"Movie Results"}
          data={moviesData.pages.map((page) => page.results).flat()}
          fetchMore={movieFetchMore}
        />
      ) : null}
      {tvData ? (
        <Hlist
          title={"TV Results"}
          data={tvData.pages.map((page) => page.results).flat()}
          fetchMore={tvFetchMore}
        />
      ) : null}
    </Container>
  );
};

export default Search;
