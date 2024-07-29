import HeaderThree from "@/layouts/headers/HeaderThree"
import Breadcrumb from "../common/Breadcrumb"
import LogingArea from "../common/LoginArea"
import FooterThree from "@/layouts/footers/FooterThree"
import DocumentArea from "../common/DocumentArea"

const Login = () => {
   return (
      <main>
         <HeaderThree />
         <Breadcrumb title="Login" />
         <LogingArea style={false} />
         <DocumentArea />
         <FooterThree />
      </main>
   )
}

export default Login
