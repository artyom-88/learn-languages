export interface ContentType {
  description: string;
  title: string;
}

export interface ContentTypesResponse {
  content_types?: ContentType[];
  content_fields?: unknown[];
}
