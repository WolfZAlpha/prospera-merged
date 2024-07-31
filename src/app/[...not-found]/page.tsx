import Error from "@/component/error/Index";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "404 Error || ICO & Crypto Landing Page React Next.js Template",
};

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Error />
    </Wrapper>
  );
};

export default NotFoundPage;

export async function generateStaticParams() {
  return [];
}