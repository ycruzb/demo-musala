import Link from "next/link";

function Header() {
  return (
    <header className="w-full px-5 h-16 sticky bg-white shadow-md top-0 text-gray-900 text-2xl text-center flex items-center justify-between">
      <Link href="/">
        <a>Demo</a>
      </Link>
      <Link href="/gateway/add">
        <a title="Add a new gateway">
          <img className="w-6" src="/add-to-list.svg" alt="Add a new gateway" />
        </a>
      </Link>
    </header>
  );
}

export default Header;
