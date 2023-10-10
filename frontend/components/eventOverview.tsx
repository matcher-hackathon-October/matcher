import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@/components/material";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type EventSummaryProps = {
  event_id: number;
  event_image: string;
  event_title: string;
  event_description: string;
  max_participants: number;
  venue: string;
  address: string;
  event_datetime: string;
  is_online: boolean;
  language: object;
  tag: object;
  category: object;
};

function formDate(isoString: String) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
}

export default function EventSummary(allprops: EventSummaryProps) {
  return (
    <Card key={allprops.event_id} className="w-full max-w-[48rem] flex-row m-6">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none flex flex-col items-center"
      >
        <Typography variant="h6" color="gray" className="mb-4">
          {formDate(allprops.event_datetime)}
        </Typography>
        <Image
          src={"/vercel.svg"}
          alt={allprops.event_title}
          width={100}
          height={100}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4">
          startups
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {allprops.event_title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {allprops.event_description.length > 100
            ? allprops.event_description.slice(0, 100) + "..."
            : allprops.event_description}
        </Typography>
        <a
          href={`/events/${allprops.event_id}`}
          className="flex justify-end mr-2 mb-2"
        >
          <Button variant="text" className="gap-2">
            詳細を見る
          </Button>
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </CardBody>
    </Card>
  );
}
