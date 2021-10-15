import React from "react";
import styled from "styled-components/native";
import Poster from "./Poster";
import Votes from "./Votes";

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  return (
    <Movie>
      <Poster path={posterPath}></Poster>
      <Title>
        {originalTitle.slice(0, 13)}
        {originalTitle.length > 13 ? "..." : null}
      </Title>
      <Votes voteAverage={voteAverage} />
    </Movie>
  );
};

export default VMedia;
