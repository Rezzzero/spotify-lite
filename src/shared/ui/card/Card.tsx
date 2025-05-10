import { Link } from "react-router-dom";

export const Card = ({
  image,
  name,
  link,
  isRoundedFull,
}: {
  image: string;
  name: string;
  link: string;
  isRoundedFull?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-md cursor-pointer p-3 w-[192px] h-[255px] hover:bg-[#1d1e1f]">
      <img
        src={image}
        alt={`${name} image`}
        className={`${isRoundedFull ? "rounded-full" : "rounded-xl"} w-42 h-42`}
      />
      <Link to={link} className="hover:underline">
        {name}
      </Link>
    </div>
  );
};
