import Brand from "./Brand"
import ChooseArea from "./ChooseArea"
import FaqArea from "./FaqArea"
import Hero from "./Hero"
import IntroArea from "./IntroArea"
import OtherCrypto from "./OtherCrypto"
import RoadMap from "./RoadMap"
import HeaderThree from "@/layouts/headers/HeaderThree"
import FooterTwo from "@/layouts/footers/FooterTwo"

const HomeOne = () => {
  return (
    <div className="home-purple-gradient">
      <HeaderThree />
      <Hero />
      <OtherCrypto />
      <ChooseArea />
      <IntroArea />
      <RoadMap />
      <FaqArea />
      <Brand />
      < br />
      <FooterTwo />
    </div>
  )
}

export default HomeOne
