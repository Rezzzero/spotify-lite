import { Link } from "react-router-dom";

export const LinksList = ({
  name,
  links,
}: {
  name: string;
  links: { name: string; path: string }[];
}) => {
  return (
    <div className="flex flex-col gap-1 w-[280px] pr-10">
      <h2 className="font-bold">{name}</h2>
      <ul className="flex flex-col gap-1 text-[#bababa]">
        {links.map((link) => (
          <li
            key={link.name}
            className="hover:text-white hover:underline cursor-pointer"
          >
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
