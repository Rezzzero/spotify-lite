import { useSwiper } from "swiper/react";
import { useEffect, useState } from "react";
import prevIcon from "./assets/arrow-prev.svg";
import nextIcon from "./assets/arrow-next.svg";

export const SwiperNavigation = () => {
  const swiper = useSwiper();
  const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);
  const [isEnd, setIsEnd] = useState(swiper.isEnd);

  useEffect(() => {
    const update = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    swiper.on("slideChange", update);
    swiper.on("reachBeginning", update);
    swiper.on("reachEnd", update);

    return () => {
      swiper.off("slideChange", update);
      swiper.off("reachBeginning", update);
      swiper.off("reachEnd", update);
    };
  }, [swiper]);

  return (
    <>
      {!isBeginning && (
        <button
          type="button"
          onClick={() => swiper.slidePrev()}
          className="absolute top-1/2 -translate-y-1/2 left-2 z-20 cursor-pointer bg-[#1b1c1c] rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-800 duration-300"
        >
          <img src={prevIcon} alt="swiper prev icon" />
        </button>
      )}
      {!isEnd && (
        <button
          type="button"
          onClick={() => swiper.slideNext()}
          className="absolute top-1/2 -translate-y-1/2 right-2 z-30 cursor-pointer bg-[#1b1c1c] rounded-full w-8 h-8 flex items-center justify-center hover:bg-zinc-800 duration-300"
        >
          <img src={nextIcon} alt="swiper next icon" />
        </button>
      )}
    </>
  );
};
