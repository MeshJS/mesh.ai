import SearchInputNavbar from "./input";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Button from "@components/ui/button";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import useUser from "@contexts/user";
import ProfileImage from "@components/user/profileImage";
import Drawer from "@components/ui/drawer";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="fixed z-30 w-full">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5 fixed z-30 w-full border-b dark:border-gray-700 bg-white/80 backdrop-blur dark:bg-gray-800/80">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center w-full">
            <Link href="/" className="flex mr-4 cursor-pointer">
              <img
                src="https://meshjs.dev/logo-mesh/black/logo-mesh-black-64x64.png"
                className="mr-3 h-8"
                alt="Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white hidden sm:block">
                Mesh AI
              </span>
              <span className="text-sm text-gray-500">(beta)</span>
            </Link>
            <div className="flex-1 max-w-screen-lg">
              {router.pathname !== "/" && <SearchInputNavbar />}
            </div>

            <div className="flex-1 hidden lg:block"></div>

            <div className="flex items-center lg:order-2">
              {/* <button
                type="button"
                data-dropdown-toggle="apps-dropdown"
                className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <span className="sr-only">Apps</span>
                <Squares2X2Icon className="w-6 h-6" />
              </button>

              <AppsMenu /> */}

              <UserButton />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function UserButton() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const { user } = useUser();
  const session = useSession();

  return (
    <>
      {session ? (
        <>
          <button
            type="button"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0"
            onClick={() => setShowSubmenu(!showSubmenu)}
          >
            <span className="sr-only">Open user menu</span>
            <ProfileImage
              className="w-8 h-8 rounded-full"
              id={user?.full_name ? user.full_name : session.user.id}
            />
          </button>
          <UserMenu showSubmenu={showSubmenu} setShowSubmenu={setShowSubmenu} />
        </>
      ) : (
        <>
          <Button onClick={() => setShowSubmenu(!showSubmenu)}>Sign In</Button>
          <UserLogin showSubmenu={showSubmenu} />
        </>
      )}
    </>
  );
}

function UserLogin({ showSubmenu }) {
  const supabase = useSupabaseClient();
  return (
    <>
      <div
        className={`${
          !showSubmenu && "hidden"
        } block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 fixed top-12 right-4 w-96`}
      >
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["twitter"]}
        />
      </div>
    </>
  );
}

function UserMenu({ showSubmenu, setShowSubmenu }) {
  const supabase = useSupabaseClient();
  const { user, updateProfile } = useUser();
  const session = useSession();
  const [showUserProfileDrawer, setShowUserProfileDrawer] =
    useState<boolean>(false);

  function showUserProfile() {
    setShowUserProfileDrawer(!showUserProfileDrawer);
    setShowSubmenu(false);
  }

  const [userFullName, setUserFullName] = useState<string>("");
  const [userBio, setUserBio] = useState<string>("");
  const [showUpdated, setShowUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (user?.full_name) {
      setUserFullName(user.full_name);
    }
    if (user?.bio) {
      setUserBio(user.bio);
    }
  }, [user]);

  useEffect(() => {
    setShowUpdated(false);
  }, []);

  async function updateThisProfile() {
    if (session) {
      const thisProfile = {
        id: session?.user.id,
        full_name: userFullName,
        bio: userBio,
      };
      const res = await updateProfile(thisProfile);
      setShowUpdated(true);
    }
  }

  return (
    <>
      <Drawer showDrawer={showUserProfileDrawer} maxSize="max-w-md">
        <>
          <div className="absolute top-2.5 right-2.5">
            <button
              type="button"
              onClick={() => setShowUserProfileDrawer(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <XMarkIcon className="w-5 h-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <ProfileImage
                className="w-32 h-32 rounded-full"
                id={userFullName}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Display Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => setUserFullName(e.target.value)}
                value={userFullName}
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Bio
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => setUserBio(e.target.value)}
                value={userBio}
                placeholder="Bio"
              />
            </div>

            <Button onClick={() => updateThisProfile()}>Update profile</Button>
            {showUpdated && (
              <p className="text-sm text-gray-500 mt-4">Profile updated</p>
            )}
          </div>
        </>
      </Drawer>
      <div
        className={`${
          !showSubmenu && "hidden"
        } z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 fixed top-12 right-4`}
      >
        {user?.full_name && (
          <div className="py-3 px-4">
            <span className="block text-sm font-semibold text-gray-900 dark:text-white">
              {user?.full_name}
            </span>
          </div>
        )}

        <ul
          className="py-1 font-light text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          <li>
            <button
              onClick={() => showUserProfile()}
              className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              My Profile
            </button>
          </li>
          {/* <li>
            <button
              // onClick={() => supabase.auth.signOut()}
              className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Account settings
            </button>
          </li> */}
        </ul>
        <ul
          className="py-1 font-light text-gray-500 dark:text-gray-400"
          aria-labelledby="dropdown"
        >
          {/* <li>
          <a
            href="#"
            className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="mr-2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>{" "}
            My likes
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="mr-2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>{" "}
            Collections
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <span className="flex items-center">
              <svg
                aria-hidden="true"
                className="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clip-rule="evenodd"
                ></path>
              </svg>{" "}
              Pro version
            </span>
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li> */}
        </ul>
        <ul className="py-1 font-light text-gray-500 dark:text-gray-400">
          <li>
            <button
              onClick={() => supabase.auth.signOut()}
              className="w-full text-left block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

function AppsMenu() {
  return (
    <div
      className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600"
      id="apps-dropdown"
    >
      <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        Apps
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Sales</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Users</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Inbox</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Profile</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Settings</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
            <path
              fill-rule="evenodd"
              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Products</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Pricing</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Billing</div>
        </a>
        <a
          href="#"
          className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
        >
          <svg
            aria-hidden="true"
            className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            ></path>
          </svg>
          <div className="text-sm text-gray-900 dark:text-white">Logout</div>
        </a> */}
      </div>
    </div>
  );
}
