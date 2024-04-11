import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="flex h-16 w-full bg-gray-700 bg-opacity-40 items-center justify-between  fixed top-0 px-3 py-2">
       <Link href="/"> <Image
          className="relative "
          src="/morph.png"
          alt="Next.js Logo"
          width={140}
          height={37}
          priority
        />
        </Link>

        <div>
          <ConnectButton />
        </div>
      </div>
  );
}
