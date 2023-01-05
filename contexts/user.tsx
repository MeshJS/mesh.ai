import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { getUserProfile, updateUserProfile } from "@lib/supabase";
import { Profile } from "types";

const UserContext = createContext<{
  user: Profile | undefined;
  updateProfile: (user: {}) => boolean;
  getUser: (uid) => Profile;
  allUsers: Profile[];
}>({
  user: undefined,
  updateProfile: (user: {}) => true,
  //@ts-ignore
  getUser: (uid: string) => {},
  allUsers: [],
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<Profile | undefined>(undefined);
  const session = useSession();
  const [allUsers, setAllUsers] = useState({});
  const refUsers = useRef({});

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    if (session) {
      try {
        const data = await getUserProfile(session?.user.id);
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
      }
    }
  }

  async function updateProfile(updatedProfile) {
    const res = await updateUserProfile(updatedProfile);
    //@ts-ignore
    setUser(res[0]);
    return true;
  }

  async function getUserProfileInner(uid) {
    if (refUsers.current[uid] === false) {
      // console.log("getting user", uid);
      const res = await getUserProfile(uid);
      if (res) {
        // console.log("gotten user", res);
        refUsers.current[uid] = res;
        setAllUsers(refUsers.current);
      }
    }
    return true;
  }

  function getUser(uid) {
    if (refUsers.current[uid] === undefined) {
      refUsers.current[uid] = false;
      getUserProfileInner(uid);
    }
    return allUsers[uid];
  }

  const memoedValue = useMemo(
    () => ({
      user,
      updateProfile,
      getUser,
      allUsers,
    }),
    [user, allUsers]
  );

  return (
    //@ts-ignore
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

export default function useUser() {
  return useContext(UserContext);
}
