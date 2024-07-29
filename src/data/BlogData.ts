import { StaticImageData } from "next/image";

import blogThumb_1 from "@/assets/img/blog/blog_masonry01.jpg"
import blogThumb_2 from "@/assets/img/blog/blog_masonry02.jpg"
import blogThumb_3 from "@/assets/img/blog/blog_standard01.jpg"
import blogThumb_4 from "@/assets/img/blog/blog_standard02.jpg"

import blogAvatar_1 from "@/assets/img/blog/blog_author01.png"
import blogAvatar_2 from "@/assets/img/blog/blog_author02.png"
import blogAvatar_3 from "@/assets/img/blog/blog_author03.png"
import blogAvatar_4 from "@/assets/img/blog/blog_author04.png"

interface DataType {
   id: number;
   post: string;
   thumb: StaticImageData;
   date: string;
   comment: string;
   views: string;
   title: string;
   desc: string;
   author_avatar: StaticImageData;
   author_name: string;
}

const blog_data: DataType[] = [
   {
      id: 1,
      post: "masonry",
      thumb: blogThumb_1,
      date: "2024/03/15",
      comment: "07",
      views: "1,752Viewers",
      title: "The Power of Blockchain don't Miss Out on Our ICO",
      desc: "Our ICO presents a unique opportunity for you to be part of the digital revolution and tap into the immense potential of blockchain technology.",
      author_avatar: blogAvatar_1,
      author_name: "Tom Cruise",
   },
   {
      id: 2,
      post: "masonry",
      thumb: blogThumb_2,
      date: "2024/03/15",
      comment: "09",
      views: "1,762Viewers",
      title: "Invest in the Next Big Thing discover Our ICO Opportunity",
      desc: "Our ICO presents a unique opportunity for you to be part of the digital revolution and tap into the immense potential of blockchain technology.",
      author_avatar: blogAvatar_2,
      author_name: "Max Power",
   },
   {
      id: 3,
      post: "standard",
      thumb: blogThumb_3,
      date: "2024/03/15",
      comment: "14",
      views: "1,782Viewers",
      title: "Maximizing Potential discover the Benefits of Our ICO Investment",
      desc: "Our ICO presents a unique opportunity for you to be part of the digital revolution and tap into the immense potential of blockchain technology.",
      author_avatar: blogAvatar_3,
      author_name: "Liam James",
   },
   {
      id: 4,
      post: "standard",
      thumb: blogThumb_4,
      date: "2024/03/30",
      comment: "03",
      views: "1,732Viewers",
      title: "Tokenize Your Future explore Our ICO for Game-Changing Investments",
      desc: "Our ICO presents a unique opportunity for you to be part of the digital revolution and tap into the immense potential of blockchain technology.",
      author_avatar: blogAvatar_4,
      author_name: "Tom Cruise",
   },
   {
      id: 5,
      post: "masonry",
      thumb: blogThumb_2,
      date: "2024/03/20",
      comment: "09",
      views: "1,762Viewers",
      title: "Invest in the Next Big Thing discover Our ICO Opportunity",
      desc: "Our ICO presents a unique opportunity for you to be part of the digital revolution and tap into the immense potential of blockchain technology.",
      author_avatar: blogAvatar_2,
      author_name: "Max Power",
   },
   {
      id: 6,
      post: "standard",
      thumb: blogThumb_4,
      date: "2024/03/30",
      comment: "03",
      views: "1,732Viewers",
      title: "Tokenize Your Future explore Our ICO for Game-Changing Investments",
      desc: "Our ICO presents a unique opportunity for you to be part of the digital revolution and tap into the immense potential of blockchain technology.",
      author_avatar: blogAvatar_4,
      author_name: "Tom Cruise",
   },
]

export default blog_data;