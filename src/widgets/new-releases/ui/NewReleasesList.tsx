import { SwiperSlide } from "swiper/react";
import { useNewReleases } from "../model/useNewReleases";
import { BaseSwiper } from "@shared/ui/swiper/BaseSwiper";
import { Card } from "@shared/ui/card/Card";
import { Link } from "react-router-dom";

export const NewReleasesList = () => {
  const { releases } = useNewReleases();
  return (
    <div>
      <div className="flex items-center justify-between pr-12">
        <h2 className="font-bold text-2xl hover:underline cursor-pointer px-9 mb-2">
          Новые релизы
        </h2>
        <Link
          to={`/section/new-releases`}
          className="text-[#bababa] font-bold text-sm hover:underline"
        >
          Показать все
        </Link>
      </div>
      <BaseSwiper>
        {releases.slice(0, 20).map((release, index) => (
          <SwiperSlide key={index}>
            <Card item={release} link={`/`} cardType="album" />
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
