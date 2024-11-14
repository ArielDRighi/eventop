// import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
// import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
// import { redirect } from "next/navigation";

// export default withPageAuthRequired(
//   async function () {
//     const user: UserProfile = await useUser();
//     console.log(user)

//     const role = user.user["/roles"][0];

//     if (role == null ) redirect("/");
//     else if (role == "Admin") redirect("/admin");
   
//     return <></>;
//   },
//   { returnTo: "/admin" }
// );
