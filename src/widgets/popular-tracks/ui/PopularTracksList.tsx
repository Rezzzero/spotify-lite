import { SwiperSlide } from "swiper/react";
import { usePopularTracks } from "../model/usePopularTracks";
import { BaseSwiper } from "../../../shared/ui/swiper/BaseSwiper";
import { Card } from "../../../shared/ui/card/Card";
import { Link } from "react-router-dom";

export const PopularTracksList = () => {
  const { tracks } = usePopularTracks();
  return (
    <div>
      <div className="flex items-center justify-between pr-12">
        <h2 className="font-bold text-2xl hover:underline cursor-pointer px-9 mb-2">
          Популярные треки
        </h2>
        <Link
          to={`/section/popular-tracks`}
          className="text-[#bababa] font-bold text-sm hover:underline"
        >
          Показать все
        </Link>
      </div>
      <BaseSwiper>
        {tracks.slice(0, 20).map((track, index) => (
          <SwiperSlide key={index}>
            <Card
              item={{
                name: track.name,
                images: track.album.images,
                artists: track.artists,
              }}
              link={`/track/${track.id}`}
              cardType="track"
            />
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
