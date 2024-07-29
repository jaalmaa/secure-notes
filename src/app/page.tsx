import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24 h-full">
      <div className="m-auto">
        <h1 className="text-5xl">Secure Notes</h1>
        <div className="flex justify-center my-8 w-full">
          <Link
            href="/notes"
            className="text-white bg-gray-600 hover:bg-gray-800 rounded-lg py-2 px-4"
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
}
