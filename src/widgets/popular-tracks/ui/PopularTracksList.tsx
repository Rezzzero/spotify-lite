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
              image={track.track.album.images[0].url}
              name={track.track.name}
              link={`/track/${track.track.id}`}
            />
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
