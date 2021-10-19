import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Dimensions, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { moviesApi, MovieResponse } from "../api";
import Loader from "../components/Loader";
import Hlist from "../components/HList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const HSeparator = styled.View`
  height: 20px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 10px;
`;

const Movie: React.FC<NativeStackScreenProps<any, "Home">> = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(["movies", "noPlaying"], moviesApi.nowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
    hasNextPage: upcomingHasNextPage,
    fetchNextPage: upcomingFetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "upcoming"],
    moviesApi.upcoming,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery<MovieResponse>(
    ["movies", "trending"],
    moviesApi.trending,
    {
      getNextPageParam: (currentPage) => {
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ? null : nextPage;
      },
    }
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const loading = nowPlayingLoading || trendingLoading || upcomingLoading;
  const trendingFetchMore = () => {
    if (trendingHasNextPage) {
      trendingFetchNextPage();
    }
  };
  const upcomingFetchMore = () => {
    if (upcomingHasNextPage) {
      upcomingFetchNextPage();
    }
  };
  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onEndReached={upcomingFetchMore}
      onEndReachedThreshold={0.5}
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 20,
            }}
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
          >
            {nowPlayingData?.results.map((movie) => {
              return (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path || ""}
                  posterPath={movie.poster_path || ""}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                  fullData={movie}
                />
              );
            })}
          </Swiper>
          {trendingData ? (
            <Hlist
              fetchMore={trendingFetchMore}
              title={"Trending Movies"}
              data={trendingData?.pages?.map((page) => page.results).flat()}
            />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      horizontal={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={HSeparator}
      data={upcomingData.pages.map((page) => page.results).flat()}
      renderItem={({ item }) => {
        return (
          <HMedia
            posterPath={item.poster_path || ""}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
          />
        );
      }}
    />
  ) : null;
};

export default Movie;
