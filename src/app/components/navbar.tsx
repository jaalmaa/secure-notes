import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const Navbar = () => {
  const handleLogout = async () => {
    "use server";
    cookies().set("Authorization", "invalid");
    redirect("/login");
  };

  return (
    <>
      <div className="max-w-full bg-white rounded flex justify-between p-4 mx-1">
        <p className="text-xl font-semibold">Secure Notes</p>
        <form action={handleLogout}>
          <button type="submit" className="hover:text-blue-500">
            Logout
          </button>
        </form>
      </div>
    </>
  );
};
