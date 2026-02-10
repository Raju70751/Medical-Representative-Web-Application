import Image from "next/image";
import HomePage from '@/app/components/homeComponent'
import { DBconnection } from '@/lib/db'


export default function Home() {
  DBconnection()
  return (
    <div className="flex min-h-full w-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HomePage />
    </div>
  );
}
