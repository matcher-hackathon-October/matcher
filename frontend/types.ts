interface EventProps {
  id: number;
  image: string;
  date: string;
  title: string;
  time: string;
  venue: string;
  currentParticipants: number;
  maxParticipants: number;
}
interface EventData {
  event_id: number;
  event_image: string;
  event_datetime: string;
  event_title: string;
  venue: string;
  users: Array<any>;
  max_participants: number;
}

interface Tags {
  id: number;
  name: string;
}

interface Languages {
  id: number;
  name: string;
}

interface Categories {
  id: number;
  name: string;
}

interface SearchEventProps {
  free_text: string;
  tags: Array<number>;
  languages: Array<number>;
  categories: Array<number>;
}

export type {
  EventProps,
  EventData,
  Tags,
  Languages,
  Categories,
  SearchEventProps,
};
