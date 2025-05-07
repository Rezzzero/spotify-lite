import { SwiperSlide } from "swiper/react";
import { useNewReleases } from "../model/useNewReleases";
import { BaseSwiper } from "../../../shared/ui/swiper/BaseSwiper";
import { Link } from "react-router-dom";

export const NewReleasesList = () => {
  const { releases } = useNewReleases();
  return (
    <div>
      <h2 className="font-bold text-2xl hover:underline cursor-pointer px-8 mb-5">
        Новые релизы
      </h2>
      <BaseSwiper>
        {releases.slice(0, 20).map((release, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl cursor-pointer p-3 w-[192px] h-[255px] hover:bg-zinc-700"
            >
              <img
                src={release.images[0].url}
                alt={`${release.name} image`}
                className="rounded-xl w-42 h-42"
              />
              <Link to={`/`} className="hover:underline">
                {release.name}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
