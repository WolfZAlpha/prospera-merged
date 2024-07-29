import { StaticImageData } from "next/image";

import team_1 from "@/assets/img/update/team/team-1-1.png"
import team_2 from "@/assets/img/update/team/team-1-2.png"
import team_3 from "@/assets/img/update/team/team-1-3.png"
import team_4 from "@/assets/img/update/team/team-1-4.png"
import team_5 from "@/assets/img/update/team/team-1-5.png"
import team_6 from "@/assets/img/update/team/team-1-6.png"
import team_7 from "@/assets/img/update/team/team-1-7.png"
import team_8 from "@/assets/img/update/team/team-1-8.png"
import team_9 from "@/assets/img/update/team/team-1-9.png"
import team_10 from "@/assets/img/update/team/team-1-10.png"

interface DataType {
   id: number,
   category: string;
   team_data: {
      id: number;
      thumb: StaticImageData;
      name: string;
   }[];
}[];

const team_data: DataType[] = [
   {
      id: 1,
      category: "cat1",
      team_data: [
         {
            id: 1,
            thumb: team_1,
            name: "Jacob Jones",
         },
         {
            id: 2,
            thumb: team_2,
            name: "Albert Flores",
         },
         {
            id: 3,
            thumb: team_3,
            name: "Devon Lane",
         },
         {
            id: 4,
            thumb: team_4,
            name: "Jacob Jones",
         },
         {
            id: 5,
            thumb: team_5,
            name: "Jacob Jones",
         },
         {
            id: 6,
            thumb: team_6,
            name: "Jacob Jones",
         },
         {
            id: 7,
            thumb: team_7,
            name: "Albert Flores",
         },
         {
            id: 8,
            thumb: team_8,
            name: "Devon Lane",
         },
         {
            id: 9,
            thumb: team_9,
            name: "Jacob Jones",
         },
         {
            id: 10,
            thumb: team_10,
            name: "Jacob Jones",
         },
      ]
   },
   {
      id: 2,
      category: "cat2",
      team_data: [
         {
            id: 1,
            thumb: team_4,
            name: "Jacob Jones",
         },
         {
            id: 2,
            thumb: team_3,
            name: "Devon Lane",
         },
         {
            id: 3,
            thumb: team_5,
            name: "Jacob Jones",
         },
         {
            id: 4,
            thumb: team_6,
            name: "Jacob Jones",
         },
         {
            id: 5,
            thumb: team_7,
            name: "Albert Flores",
         },
         {
            id: 6,
            thumb: team_2,
            name: "Albert Flores",
         },
         {
            id: 7,
            thumb: team_8,
            name: "Devon Lane",
         },
         {
            id: 8,
            thumb: team_1,
            name: "Jacob Jones",
         },
         {
            id: 9,
            thumb: team_9,
            name: "Jacob Jones",
         },
         {
            id: 10,
            thumb: team_10,
            name: "Jacob Jones",
         },
      ]
   },
   {
      id: 3,
      category: "cat3",
      team_data: [
         {
            id: 1,
            thumb: team_1,
            name: "Jacob Jones",
         },
         {
            id: 2,
            thumb: team_2,
            name: "Albert Flores",
         },
         {
            id: 3,
            thumb: team_3,
            name: "Devon Lane",
         },
         {
            id: 4,
            thumb: team_4,
            name: "Jacob Jones",
         },
         {
            id: 5,
            thumb: team_5,
            name: "Jacob Jones",
         },
         {
            id: 6,
            thumb: team_6,
            name: "Jacob Jones",
         },
         {
            id: 7,
            thumb: team_7,
            name: "Albert Flores",
         },
         {
            id: 8,
            thumb: team_8,
            name: "Devon Lane",
         },
         {
            id: 9,
            thumb: team_9,
            name: "Jacob Jones",
         },
         {
            id: 10,
            thumb: team_10,
            name: "Jacob Jones",
         },
      ]
   },
];

export default team_data;