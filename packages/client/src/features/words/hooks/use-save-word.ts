import { useNavigate } from 'react-router-dom';

import type { IWord } from '@learn-languages/common';
import { Language } from '@learn-languages/common';
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { App } from 'antd';

import { httpClient } from 'common/http-client';
import { WORDS_URL } from 'common/routes/routes-constants';
import { WORD_LIST_QUERY_KEY } from 'features/words/words-constants';

export const useSaveWord = (wordId?: string): UseMutationResult<IWord, Error, Partial<IWord>> => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  return useMutation<IWord, Error, Partial<IWord>>({
    mutationFn: ({ name, examples = [], description = [] }: Partial<IWord>) =>
      wordId
        ? httpClient
            .patch(`words/${wordId}`, {
              json: {
                ...(examples.length ? { examples } : undefined),
                ...(description.length ? { description } : undefined),
              },
            })
            .json<IWord>()
        : httpClient
            .post('words', {
              json: {
                description: description,
                examples: examples,
                lang: Language.EN,
                name: name,
              },
            })
            .json<IWord>(),
    onSuccess: (word: IWord) => {
      const { name } = word;
      void message.success(`Word "${name}"is saved.`);
      queryClint.setQueryData<IWord[]>(WORD_LIST_QUERY_KEY, (wordList) => {
        if (!wordList) return [word];
        return wordId
          ? wordList.map((value) => (value._id === wordId ? { ...value, ...word } : value))
          : [...wordList, word];
      });
      navigate(WORDS_URL);
    },
    onError: (e, { name }) => {
      void message.error(`Save word "${name}" error.`);
      console.log(e);
    },
  });
};
