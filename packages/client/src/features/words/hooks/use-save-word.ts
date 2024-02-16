import { useNavigate } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';
import type { MutationTuple } from '@apollo/client/react/types/types';
import type { IWord } from '@learn-languages/common';
import { App } from 'antd';

import { WORDS_URL } from 'common/routes/routes-constants';

export const CREATE_WORD = gql`
  mutation CreateWord($dto: CreateWordDto!) {
    createWord(dto: $dto) {
      _id
      name
    }
  }
`;

export const UPDATE_WORD = gql`
  mutation UpdateWord($id: String!, $dto: UpdateWordDto!) {
    updateWord(id: $id, dto: $dto) {
      _id
      name
    }
  }
`;

export const useSaveWord = (wordId?: string): MutationTuple<IWord, { dto: Partial<IWord> }> => {
  const { message } = App.useApp();
  const navigate = useNavigate();

  return useMutation<IWord, { dto: Partial<IWord> }>(wordId ? UPDATE_WORD : CREATE_WORD, {
    onCompleted: (word) => {
      const { name } = word;
      void message.success(`Word "${name}"is saved.`);
      // TODO: update list data???
      navigate(WORDS_URL);
    },
    onError: (e) => {
      void message.error(`Save word "${e.name}" error.`);
      console.log(e);
    },
  });
};
