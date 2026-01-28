import Link from "next/link";

import FacebookSvg from "@/assets/svg/FacebookSvg";
import InstagramSvg from "@/assets/svg/InstagramSvg";
import XSvg from "@/assets/svg/XSvg";
import YoutubeSvg from "@/assets/svg/YoutubeSvg";

const Footer = () => {
  return (
    <footer className="typo-13-m h-29 border-t border-gray-100 px-6 md:h-35 md:px-10">
      <div
        className="mx-auto flex h-full max-w-380 flex-wrap content-between items-center
          justify-between py-7.5 md:flex-nowrap md:py-15"
      >
        <div className="order-2 text-gray-400 md:order-1">
          <p>©codeit - 2023</p>
        </div>
        <div className="order-1 flex w-full justify-center text-gray-600 md:order-2 md:w-fit">
          <div className="flex w-38.5 justify-between">
            <p>Privacy Policy</p>
            <p>∙</p>
            <p>FAQ</p>
          </div>
        </div>
        <ul className="order-3 flex gap-4 text-gray-400">
          <li className="hover:text-gray-700">
            <Link href="https://www.facebook.com/?locale=ko_KR">
              <FacebookSvg />
            </Link>
          </li>
          <li className="hover:text-gray-700">
            <Link href="https://www.instagram.com/">
              <InstagramSvg />
            </Link>
          </li>
          <li className="hover:text-gray-700">
            <Link href="https://www.youtube.com/">
              <YoutubeSvg />
            </Link>
          </li>
          <li className="hover:text-gray-700">
            <Link href="https://x.com/">
              <XSvg />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
