export interface EventProps {
  id: number;
  image: string;
  date: string;
  title: string;
  time: string;
  venue: string;
  currentParticipants: number;
  maxParticipants: number;
}
export interface EventData {
  event_id: number;
  event_image: string;
  event_datetime: string;
  event_title: string;
  venue: string;
  users: Array<any>;
  max_participants: number;
}
