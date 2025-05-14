import { SwiperSlide } from "swiper/react";
import { useNewReleases } from "../model/useNewReleases";
import { BaseSwiper } from "../../../shared/ui/swiper/BaseSwiper";
import { Card } from "../../../shared/ui/card/Card";

export const NewReleasesList = () => {
  const { releases } = useNewReleases();
  return (
    <div>
      <h2 className="font-bold text-2xl hover:underline cursor-pointer px-9 mb-2">
        Новые релизы
      </h2>
      <BaseSwiper>
        {releases.slice(0, 20).map((release, index) => (
          <SwiperSlide key={index}>
            <Card item={release} link={`/`} />
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
