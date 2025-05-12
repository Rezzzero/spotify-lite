import { FooterLinks } from "../../../shared/constants/constants";
import { LinksList } from "./LinksList";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="flex flex-col gap-10 px-4 pb-16">
      <div className="flex border-b border-zinc-800 pb-8">
        <LinksList
          name={FooterLinks.Company.name}
          links={FooterLinks.Company.links}
        />
        <LinksList
          name={FooterLinks.Communities.name}
          links={FooterLinks.Communities.links}
        />
        <LinksList
          name={FooterLinks.UsefullLinks.name}
          links={FooterLinks.UsefullLinks.links}
        />
        <LinksList
          name={FooterLinks.SpotifyLitePlans.name}
          links={FooterLinks.SpotifyLitePlans.links}
        />
        <ul className="flex items-start gap-2 ml-auto">
          {FooterLinks.Socials.links.map((link) => (
            <li
              key={link.name}
              className="bg-[#262729] hover:bg-zinc-400 rounded-full p-3"
            >
              <Link to={link.path} className="cursor-default">
                <img
                  src={link.image}
                  alt={`${link.name} image`}
                  className="w-4 h-4"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-zinc-400">© 2025 Spotify AB</p>
    </div>
  );
};
