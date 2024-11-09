import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default withPageAuthRequired(
  async function () {
    const user: any = await getSession();
    console.log(user)

    const role = user.user["/roles"][0];

    if (role == null ) redirect("/");
    else if (role == "Admin") redirect("/admin");
   
    return <></>;
  },
  { returnTo: "/admin" }
);
