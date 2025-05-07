import { SwiperSlide } from "swiper/react";
import { usePopularArtists } from "../model/usePopularArtists";
import { BaseSwiper } from "../../../shared/ui/swiper/BaseSwiper";
import { Link } from "react-router-dom";

export const PopularArtistsList = () => {
  const { list } = usePopularArtists();
  return (
    <div>
      <h2 className="font-bold text-2xl hover:underline cursor-pointer px-8 mb-5">
        Популярные исполнители
      </h2>
      <BaseSwiper>
        {list.slice(0, 20).map((artist, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl cursor-pointer p-3 w-[192px] h-[255px] hover:bg-zinc-800"
            >
              <img
                src={artist.images[0].url}
                alt={`${artist.name} image`}
                className="rounded-full w-42 h-42"
              />
              <Link to={`/artist/${artist.id}`} className="hover:underline">
                {artist.name}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
