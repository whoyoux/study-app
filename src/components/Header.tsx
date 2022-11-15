import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();
  return (
    <header className="mx-auto flex min-w-full max-w-6xl flex-col items-center justify-between gap-5 border-b-2 bg-white py-5 text-2xl font-medium md:flex-row md:py-10 md:px-10">
      <Link href="/">Course app</Link>
      <div className="text-base font-normal">
        <SearchBar />
      </div>
      <div className="flex gap-5">
        {sessionData ? (
          <div className="flex gap-5">
            {sessionData?.user?.name}
            <button onClick={() => signOut()} className=" hover:text-blue-500">
              sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className=" hover:text-blue-500"
          >
            sign in
          </button>
        )}
      </div>
    </header>
  );
};

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const search = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if(query.trimStart().trimEnd().length === 0) return;
    console.log("searchig....");
    setQuery("");
  };

  return (
    <form className="relative min-w-[50vw]" onSubmit={search}>
      <input
        type="text"
        id="password"
        className="w-full rounded-xl border-2 border-gray-200 py-2 pl-3 pr-10 transition-colors hover:border-gray-300 focus:border-blue-500 focus:outline-none"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button
        className="leading-0 absolute top-2 right-2 block h-7 w-7 text-center text-xl text-gray-400 transition-colors hover:text-gray-900 focus:outline-none"
        type="submit"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </form>
  );
};

export default Header;
