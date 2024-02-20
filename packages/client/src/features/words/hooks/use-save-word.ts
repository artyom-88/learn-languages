import { useNavigate } from 'react-router-dom';

import { gql, useMutation } from '@apollo/client';
import type { MutationTuple } from '@apollo/client/react/types/types';
import type { IWord } from '@learn-languages/common';
import { App } from 'antd';

import { WORDS_URL } from 'common/routes/routes-constants';
import { GET_DETAILED_WORD_LIST } from 'features/words/hooks/use-words-query';

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
  const isNew = wordId === undefined;
  return useMutation<IWord, { dto: Partial<IWord> }>(isNew ? CREATE_WORD : UPDATE_WORD, {
    onCompleted: (response) => {
      // TODO: fix response type types
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { name } = response[isNew ? 'createWord' : 'updateWord'];
      void message.success(`Word "${name}"is saved.`);
      navigate(WORDS_URL);
    },
    onError: (e) => {
      const messageText = e.message || `Save word "${e.name}" error.`;
      void message.error(messageText);
      console.log(e);
    },
    refetchQueries: [GET_DETAILED_WORD_LIST, 'GetWords'],
  });
};
