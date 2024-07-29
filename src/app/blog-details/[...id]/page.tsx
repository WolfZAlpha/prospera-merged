import BlogDetailsArea from "@/component/blogs/blog-details/BlogDetailsArea";
import Breadcrumb from "@/component/common/Breadcrumb";
import DocumentArea from "@/component/common/DocumentArea";
import blog_data from "@/data/BlogData";
import Wrapper from "@/layouts/Wrapper";
import FooterThree from "@/layouts/footers/FooterThree";
import HeaderThree from "@/layouts/headers/HeaderThree";

export const metadata = {
   title: "Blog Details IKO - ICO & Crypto Landing Page Page React Next js Template",
};
const index = ({ params }: { params: { id: number } }) => {

   const single_blog = blog_data.find((item) => Number(item.id) === Number(params.id));

   return (
      <Wrapper>
         <main>
            <HeaderThree />
            <Breadcrumb title="Blog Details" />
            <BlogDetailsArea  single_blog={single_blog} key={single_blog?.id} />
            <DocumentArea />
            <FooterThree />
         </main>
      </Wrapper>
   )
}

export default index