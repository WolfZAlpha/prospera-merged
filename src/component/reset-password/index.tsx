import HeaderThree from "@/layouts/headers/HeaderThree"
import Breadcrumb from "../common/Breadcrumb"
import ForgotForm from "../forms/ForgotForm"
import DocumentArea from "../common/DocumentArea"
import FooterThree from "@/layouts/footers/FooterThree"

const ResetPassWord = () => {
   return (
      <main>
         <HeaderThree />
         <Breadcrumb title="Reset PassWord" />
         <ForgotForm />
         <DocumentArea />
         <FooterThree />
      </main>
   )
}

export default ResetPassWord
