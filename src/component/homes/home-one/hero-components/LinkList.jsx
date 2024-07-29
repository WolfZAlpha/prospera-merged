import React from 'react'
import ButtonCard from './ButtonCard';
import BlueSvg from './BlueSvg';
import BlackSvg from './BlackSvg';

const LinkList = () => {
    const features = [
      { href: "#", text: "TOKEN PRESALE", isActive: true },
      { href: "#", text: "NFT PURCHASE", isActive: false },
      { href: "#", text: "CLAIM REWARD", isActive: false },
    ];
  
    return (
      <div className="flex gap-5 px-5 font-semibold leading-7 text-center uppercase whitespace-nowrap max-md:flex-wrap">
        {features.map((feature, index) => (
          <ButtonCard key={index} href={feature.href} BlueSvg={BlueSvg} BlackSvg={BlackSvg} text={feature.text} isActive={feature.isActive} />
        ))}
      </div>
    );
  };

export default LinkList