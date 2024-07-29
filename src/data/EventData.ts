import { StaticImageData } from "next/image";

import event_thumb_1 from "@/assets/img/update/event/1-1.png"
import event_thumb_2 from "@/assets/img/update/event/1-2.png"
import event_thumb_3 from "@/assets/img/update/event/1-3.png"
import event_thumb_4 from "@/assets/img/update/event/1-4.png"
import event_thumb_5 from "@/assets/img/update/event/1-5.png"
import event_thumb_6 from "@/assets/img/update/event/1-6.png"
import event_thumb_7 from "@/assets/img/update/event/1-7.png"
import event_thumb_8 from "@/assets/img/update/event/1-8.png"

interface DataType {
   id: number;
   thumb: StaticImageData;
   title: string;
   country: string;
   date: string;
}[];

const event_data: DataType[] = [
   {
      id: 1,
      thumb: event_thumb_1,
      title: "BlockVienna",
      country: "Venna",
      date: "August 17, 2024",
   },
   {
      id: 2,
      thumb: event_thumb_2,
      title: "Summit Summits",
      country: "USA",
      date: "June 12, 2024",
   },
   {
      id: 3,
      thumb: event_thumb_3,
      title: "Blockchain Summit",
      country: "America",
      date: "July 05, 2024",
   },
   {
      id: 4,
      thumb: event_thumb_4,
      title: "Economy ICO 2024",
      country: "Costa Rica",
      date: "September 09, 2024",
   },
   {
      id: 5,
      thumb: event_thumb_5,
      title: "Blockchain summit",
      country: "Brazil",
      date: "September 14, 2024",
   },
   {
      id: 6,
      thumb: event_thumb_6,
      title: "Blockchain & bitcoin",
      country: "Argentina",
      date: "August 14, 2024",
   },
   {
      id: 7,
      thumb: event_thumb_7,
      title: "Money conference",
      country: "Franch",
      date: "May 24, 2024",
   },
   {
      id: 8,
      thumb: event_thumb_8,
      title: "Crypto Economy",
      country: "Saudi Arabia",
      date: "May 24, 2024",
   },
];

export default event_data;