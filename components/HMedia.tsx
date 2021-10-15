import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";

const HMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  margin-bottom: 30px;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 1);
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  opacity: 1;
  font-size: 12px;
  margin-vertical: 10px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

const HMedia: React.FC<HMediaProps> = ({
  posterPath,
  originalTitle,
  overview,
  releaseDate,
  voteAverage,
}) => {
  return (
    <HMovie>
      <Poster path={posterPath}></Poster>
      <HColumn>
        <Title>{originalTitle}</Title>
        <Release>
          {new Date(releaseDate).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </Release>
        <Overview>
          {overview !== "" && overview.length > 140
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </HColumn>
    </HMovie>
  );
};

export default HMedia;
