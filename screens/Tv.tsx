import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Hlist from "../components/HList";
import Loader from "../components/Loader";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
    hasNextPage: todayHasNextPage,
    fetchNextPage: todayFetchNextPage,
  } = useInfiniteQuery(["tv", "today"], tvApi.airingToday, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
    hasNextPage: topHasNextPage,
    fetchNextPage: topFetchNextPage,
  } = useInfiniteQuery(["tv", "top"], tvApi.topRated, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery(["tv", "trending"], tvApi.trending, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  const todayFetchMore = () => {
    if (todayHasNextPage) todayFetchNextPage();
  };
  const topFetchMore = () => {
    if (topHasNextPage) topFetchNextPage();
  };
  const trendingFetchMore = () => {
    if (trendingHasNextPage) trendingFetchNextPage();
  };

  const Loading = todayLoading || topLoading || trendingLoading;
  if (Loading) {
    return <Loader />;
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Hlist
        title={"Trending TV"}
        data={trendingData?.pages.map((page) => page.results).flat()}
        fetchMore={trendingFetchMore}
      />
      <Hlist
        title={"Airing Today"}
        data={todayData?.pages.map((page) => page.results).flat()}
        fetchMore={todayFetchMore}
      />
      <Hlist
        title={"Top rated Show"}
        data={topData?.pages.map((page) => page.results).flat()}
        fetchMore={topFetchMore}
      />
    </ScrollView>
  );
};

export default Tv;
