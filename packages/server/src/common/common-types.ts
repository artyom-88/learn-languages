import { Language } from '@learn-languages/common';
import { registerEnumType } from '@nestjs/graphql';

registerEnumType(Language, {
  name: 'Language',
});
