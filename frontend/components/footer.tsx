import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0 w-full px-5">
      <ul className="flex justify-between space-x-4 py-2 px-4">
        <li className="text-center">
          <Link href="/">
            <HomeIcon className="h-5 w-5 m-auto" />
            <span className="text-xs">ホーム</span>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <MagnifyingGlassIcon className="h-5 w-5 m-auto" />
            <span className="text-xs">検索</span>
          </Link>
        </li>
        <li>
          <Link href="/mypage">
            <UserCircleIcon className="h-5 w-5 m-auto" />
            <span className="text-xs">マイページ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
