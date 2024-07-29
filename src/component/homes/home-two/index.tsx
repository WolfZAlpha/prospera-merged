import FooterTwo from "@/layouts/footers/FooterTwo"
import Brand from "./Brand"
import CtaArea from "./CtaArea"
import CtaAreaTwo from "./CtaAreaTwo"
import FaqArea from "./FaqArea"
import FeatureArea from "./FeatureArea"
import FeatureAreaThree from "./FeatureAreaThree"
import FeatureAreaTwo from "./FeatureAreaTwo"
import HeroArea from "./HeroArea"
import Testimonia from "./Testimonia"
import HeaderTwo from "@/layouts/headers/HeaderTwo"

const HomeTwo = () => {
  return (
    <div className="home-purple-gradient">
      <HeaderTwo />
      <HeroArea />
      <Brand />
      <FeatureArea />
      <FeatureAreaTwo />
      <FeatureAreaThree />
      <Testimonia />
      <CtaArea />
      <FaqArea />
      <CtaAreaTwo />
      <FooterTwo />
    </div>
  )
}

export default HomeTwo
