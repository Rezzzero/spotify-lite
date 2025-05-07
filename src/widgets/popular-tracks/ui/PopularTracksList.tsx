import { SwiperSlide } from "swiper/react";
import { usePopularTracks } from "../model/usePopularTracks";
import { BaseSwiper } from "../../../shared/ui/swiper/BaseSwiper";
import { Link } from "react-router-dom";

export const PopularTracksList = () => {
  const { list } = usePopularTracks();
  return (
    <div>
      <h2 className="font-bold text-2xl hover:underline cursor-pointer px-8 mb-5">
        Популярные треки
      </h2>
      <BaseSwiper>
        {list.slice(0, 20).map((track, index) => (
          <SwiperSlide key={index}>
            <div
              key={index}
              className="flex flex-col gap-3 rounded-xl cursor-pointer p-3 w-[192px] h-[255px] hover:bg-zinc-800"
            >
              <img
                src={track.track.album.images[0].url}
                alt={`${track.track.name} image`}
                className="rounded-xl w-42 h-42"
              />
              <Link to={`/track/${track.track.id}`} className="hover:underline">
                {track.track.name}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </BaseSwiper>
    </div>
  );
};
