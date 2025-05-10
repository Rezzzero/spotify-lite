import { SwiperSlide } from "swiper/react";
import { usePopularArtists } from "../model/usePopularArtists";
import { BaseSwiper } from "../../../shared/ui/swiper/BaseSwiper";
import { Card } from "../../../shared/ui/card/Card";

export const PopularArtistsList = () => {
  const { list } = usePopularArtists();
  return (
    <div>
      <h2 className="font-bold text-2xl hover:underline cursor-pointer px-9 mb-2">
        Популярные исполнители
      </h2>
      <BaseSwiper>
        {list.slice(0, 20).map((artist, index) => (
          <SwiperSlide key={index}>
            <Card
              image={artist.images[0].url}
              name={artist.name}
              link={`/artist/${artist.id}`}
              isRoundedFull={true}
            />
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
