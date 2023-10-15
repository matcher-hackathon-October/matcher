import { EventProps } from "@/types";
import Image from "next/image";

export default function Event({
  id,
  image,
  date,
  title,
  time,
  venue,
  currentParticipants,
  maxParticipants,
}: EventProps) {
  return (
    <div className="p-4 m-5 flex  justify-center  md:mx-20 border-4 border-cyan-400  rounded-md">
      <div className="mb-0 p-2 mr-10 md:mb-4 md:mr-4">
        <div className="mb-2 p-1 ">{date}</div>
        <Image
          src="/next.svg"
          width={100}
          height={100}
          alt="イベント画像"
          className=""
        />
      </div>

      <div>
        <div className="text-2xl md:text-4xl mt-2 text-slate-900 font-bold md:mb-2 ">
          <h3 className="mb-1">{title}</h3>
        </div>

        <div className="flex flex-col md:flex-row space-x-2 items-start md:items-center text-xs md:text-sm">
          <div className="flex border m-2 border-gray-500 p-1 rounded space-x-1 md:space-x-2">
            <div className=" flex ">
              <p>時間:</p>
              {time}
            </div>
            <div className=" flex ">
              <p>場所:</p>
              {venue}
            </div>
          </div>

          <div className="flex">
            <p>参加人数:</p>
            <div>
              {currentParticipants}/{maxParticipants}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
