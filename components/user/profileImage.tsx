import { getProfileImage } from "@backend/user";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function ProfileImage({
  className,
  id,
}: {
  className: string;
  id?;
}) {
  const session = useSession();

  const [image, setImage] = useState<any>(null);
  useEffect(() => {
    async function get() {
      if (id == undefined && session) {
        id = session?.user.id;
      }
      setImage(await getProfileImage({ id: id }));
    }
    get();
  }, [id]);

  return (
    <>
      <div className={className} dangerouslySetInnerHTML={{ __html: image }} />
    </>
  );
}
