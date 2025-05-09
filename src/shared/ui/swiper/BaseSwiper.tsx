import { Swiper } from "swiper/react";
import "swiper/css";
import { SwiperNavigation } from "./SwiperNavigation";
import { useState } from "react";

export const BaseSwiper = ({ children }: { children: React.ReactNode }) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className="relative"
    >
      <Swiper
        spaceBetween={-135}
        slidesPerView={7}
        slidesPerGroup={3}
        slidesOffsetBefore={25}
        slidesOffsetAfter={-100}
        allowTouchMove={false}
      >
        {children}
        {isHovering && <SwiperNavigation />}
      </Swiper>

      <>
        <div className="pointer-events-none absolute top-0 left-0 h-full w-22 z-10 bg-gradient-to-r from-black/40 to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-22 z-10 bg-gradient-to-l from-black/40 to-transparent" />
      </>
    </div>
  );
};
