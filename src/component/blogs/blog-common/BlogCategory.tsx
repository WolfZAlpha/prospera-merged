import Link from "next/link";

interface DataType {
   id: number;
   title: string;
   count: string;
}
const category_data: DataType[] = [
   { id: 1, title: "Blockchain", count: "05" }, { id: 2, title: "Web Development", count: "03" },
   { id: 1, title: "Cryptocurrency", count: "05=6" }, { id: 1, title: "Branding Design", count: "05" },
   { id: 1, title: "Uncategorized", count: "02" }, { id: 1, title: "UI/UX Design", count: "04" }, { id: 1, title: "Email Marketing", count: "05" },
]
const BlogCategory = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Categories</h4>
         <div className="sidebar-cat-list">
            <ul className="list-wrap">
               {category_data.map((category, index) => (
                  <li key={index}><Link href="#">{category.title} <span>{category.count}</span></Link></li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default BlogCategory
