import { SwiperSlide } from "swiper/react";
import { usePopularArtists } from "../model/usePopularArtists";
import { BaseSwiper } from "@shared/ui/swiper/BaseSwiper";
import { Card } from "@shared/ui/card/Card";
import { Link } from "react-router-dom";

export const PopularArtistsList = () => {
  const { artists } = usePopularArtists();
  return (
    <div>
      <div className="flex items-center justify-between pr-12">
        <h2 className="font-bold text-2xl hover:underline cursor-pointer px-9 mb-2">
          Популярные исполнители
        </h2>
        <Link
          to={`/section/popular-artists`}
          className="text-[#bababa] font-bold text-sm hover:underline"
        >
          Показать все
        </Link>
      </div>
      <BaseSwiper>
        {artists.slice(0, 20).map((artist, index) => (
          <SwiperSlide key={index}>
            <Card
              item={artist}
              link={`/artist/${artist.id}`}
              cardType="artist"
            />
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
