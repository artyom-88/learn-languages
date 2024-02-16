import type { QueryResult } from '@apollo/client';
import { gql, useQuery } from '@apollo/client';
import type { IWord } from '@learn-languages/common';

export const GET_SIMPLE_WORD_LIST = gql`
  query GetWords {
    words {
      name
    }
  }
`;

export const GET_DETAILED_WORD_LIST = gql`
  query GetWords {
    words {
      _id
      name
      lang
      description
      examples
    }
  }
`;

export interface WordsData {
  words: IWord[];
}

export interface WordsQueryResult extends Omit<QueryResult<WordsData>, 'data'> {
  words: IWord[];
}

const emptyWords: IWord[] = [];

const defaultData: WordsData = { words: emptyWords };

export const useWordsQuery = (query = GET_SIMPLE_WORD_LIST): WordsQueryResult => {
  const { data = defaultData, ...rest } = useQuery<WordsData>(query);
  const { words = [] } = data;
  return {
    ...rest,
    words,
  };
};
