import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
export const Header = () => {
  return (
    <header>
      <nav className="dark:bg-gray-900">
        <div className="border-b border-slate-200 dark:border-b-0 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-3">
          <Link
            href="/"
            className="flex items-center"
            style={{ textDecoration: "none" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="currentColor"
            >
              <path d="M9.4 16.6L4.8 12l4.6-4.6-1.4-1.4L2 12l6 6 1.4-1.4z" />

              <path d="M14.6 7.4L19.2 12l-4.6 4.6 1.4 1.4 6-6-6-6-1.4 1.4z" />

              <path d="M13 4h-2l-2 16h2l2-16z" />
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              CodeBook
            </span>
          </Link>
          <div className="flex items-center relative">
            <span className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>
            <span className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-search"></span>
            <Link href="/cart" className="text-gray-700 dark:text-white mr-5">
              <span className="text-2xl bi bi-cart-fill relative">
                <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full ">
                  0
                </span>
              </span>
            </Link>
            <span className="bi bi-person-circle cursor-pointer text-2xl text-gray-700 dark:text-white"></span>
          </div>
        </div>
      </nav>
    </header>
  );
};
