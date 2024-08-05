import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const Navbar = () => {
  const handleLogout = async () => {
    "use server";
    cookies().delete("Authorization");
    redirect("/login");
  };

  return (
    <>
      <div className="bg-white rounded flex justify-between p-4">
        <Link href="/" className="text-xl font-semibold">
          Secure Notes
        </Link>
        <form action={handleLogout}>
          <button type="submit" className="hover:text-blue-500">
            Logout
          </button>
        </form>
      </div>
    </>
  );
};
