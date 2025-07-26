import { Link } from "react-router-dom";
import { useFollowersInfo } from "../model/useFollowersInfo";

export const FollowersInfo = () => {
  const { userFollowers } = useFollowersInfo();
  return (
    <div className="flex flex-col gap-5 px-3 pt-18">
      <h1 className="text-3xl font-bold px-2 mb-3">Подписчики</h1>
      <div className="flex gap-3">
        {userFollowers.map((follower) => (
          <Link
            key={follower.id}
            to={`/user/${follower.id}`}
            className="flex flex-col gap-2 hover:bg-[#242426] p-2 rounded-md"
          >
            <img
              key={follower.id}
              className="w-[175px] h-[175px] rounded-full"
              src={follower.avatar_url}
            />
            <p className="font-normal hover:underline">{follower.name}</p>
            <p className="text-gray-400 text-sm">Профиль</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
