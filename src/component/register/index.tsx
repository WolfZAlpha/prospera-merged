import HeaderThree from "@/layouts/headers/HeaderThree"
import Breadcrumb from "../common/Breadcrumb"
import LogingArea from "../common/LoginArea"
import DocumentArea from "../common/DocumentArea"
import FooterThree from "@/layouts/footers/FooterThree"

const Register = () => {
   return (
      <main>
         <HeaderThree />
         <Breadcrumb title="Register" />
         <LogingArea style={true} />
         <DocumentArea />
         <FooterThree />
      </main>
   )
}

export default Register
