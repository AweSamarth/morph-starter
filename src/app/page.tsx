"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { morphSepolia } from "viem/chains";
import { useChainId, useSwitchChain, useAccount } from "wagmi";
import { queryClient } from "./providers";

export default function Home() {
  queryClient.invalidateQueries()
  console.log(queryClient)

  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();
  const account = useAccount();
  console.log(account)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Navbar />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p
          className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800
         dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
        >
          Start building on Morph with Nextjs and Foundry!
        </p>
      </div>

      <div
        className="relative flex place-items-center mt-14   before:absolute before:h-[300px] 
      before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full 
      before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] 
      after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 
      after:bg-gradient-conic after:from-purple-200 after:via-violet-200 after:blur-2xl after:content-[''] 
      before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-violet-600 before:dark:opacity-10
       after:dark:from-purple-900 after:dark:via-[#5945d2] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] "
          src="/morph.png"
          alt="Morph Logo"
          width={300}
          height={37}
          priority
        />
      </div>
      <div className="w-[80%] text-lg text-center  mt-8 mb-1">
        Watch this page update as you edit <code>src/page.tsx</code>.<br />{" "}
        {!account.address&&<div>Connect your wallet to unlock a not-so-secret page where you can <br/> start
        interacting with smart contracts right away :&#41;</div>}{" "}
        {account.address&&chainId==morphSepolia.id&&<div>Not-so-secret page unlocked! 👇</div>}
      </div>

      {account.address ? chainId == morphSepolia.id ? (
          <Link href="/qotd">
            <button className="-mt-3 bg-[#00ff98] text-gray-900 px-5 py-2 rounded-md hover:bg-[#00ff99b5] transition-all hover:text-gray-200 ">
              QOTD
            </button>
            </Link>
          )
        : <div>Almost there! <span className="text-[#00ff99e3] hover:cursor-pointer" onClick={()=>{switchChain({chainId:morphSepolia.id})}}>Switch to Morph Sepolia</span> to unlock the page!</div>:""}

      <div className="  -mb-10  grid text-center lg:max-w-5xl lg:w-full  lg:grid-cols-4 lg:text-left">
        <a
          href="https://docs.morphl2.io/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Find in-depth information about Morph.
          </p>
        </a>

        <a
          href="https://learnweb3.io/faucets/sepolia/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Faucet{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Get testnet ETH on Sepolia with the help of this faucet
          </p>
        </a>

        <a
          href="https://bridge-testnet.morphl2.io/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Bridge{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Deposit from Sepolia to Morph Testnet
          </p>
        </a>

        <a
          href="https://morphl2.io/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Explore{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Learn more about the Morph ecosystem
          </p>
        </a>
      </div>
    </main>
  );
}
