import { SwiperSlide } from "swiper/react";
import { usePopularTracks } from "../model/usePopularTracks";
import { BaseSwiper } from "../../../shared/ui/swiper/BaseSwiper";
import { Card } from "../../../shared/ui/card/Card";

export const PopularTracksList = () => {
  const { list } = usePopularTracks();
  return (
    <div>
      <h2 className="font-bold text-2xl hover:underline cursor-pointer px-9 mb-2">
        Популярные треки
      </h2>
      <BaseSwiper>
        {list.slice(0, 20).map((track, index) => (
          <SwiperSlide key={index}>
            <Card
              item={{
                name: track.track.name,
                images: track.track.album.images,
              }}
              link={`/track/${track.track.id}`}
              cardType="track"
            />
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
