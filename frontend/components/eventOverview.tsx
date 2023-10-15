import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@/components/material";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { EventProps } from "@/types";

export default function EventSummary(allprops: EventProps) {
  return (
    <Card key={allprops.id} className="w-full max-w-[48rem] flex-row m-6">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none flex flex-col items-center"
      >
        <Typography variant="h6" color="gray" className="mb-4">
          {allprops.date}
        </Typography>
        <Image
          src={"/vercel.svg"}
          alt={allprops.title}
          width={100}
          height={100}
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="gray" className="mb-4">
          startups
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {allprops.title}
        </Typography>
        {/* <Typography color="gray" className="mb-8 font-normal">
          {allprops.description.length > 100
            ? allprops.description.slice(0, 100) + "..."
            : allprops.description}
        </Typography> */}
        <a
          href={`/events/${allprops.id}`}
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
