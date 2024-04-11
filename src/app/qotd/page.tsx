"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";
import { foundry, morphSepolia } from "viem/chains";
import { useChainId, useSwitchChain, useReadContract, useWriteContract } from "wagmi";
import {
  LOCAL_QOTD_CONTRACT_ADDRESS,
  MORPH_QOTD_CONTRACT_ADDRESS,
  QOTD_CONTRACT_ABI,
} from "@/constants/constants";
import { Address, parseEther } from "viem";
import Loader from "@/components/Loader";

export default function QOTD() {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [userQuote, setUserQuote] = useState("");
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [contractAddressToUse, setContractAddressToUse] = useState<Address>(
    MORPH_QOTD_CONTRACT_ADDRESS
  );

  const { chains, switchChain } = useSwitchChain();
  const chainId = useChainId();
  const {data:hash, writeContractAsync } = useWriteContract()
  const result = useReadContract({
    abi: QOTD_CONTRACT_ABI,
    address: contractAddressToUse,
    functionName: "quoteOfTheDay",
  });
  const quoteOfTheDay = result.data as string;


  useEffect(() => {
    if (chainId == morphSepolia.id) {
      setContractAddressToUse(MORPH_QOTD_CONTRACT_ADDRESS);
    } else if (chainId == foundry.id) {
      setContractAddressToUse(LOCAL_QOTD_CONTRACT_ADDRESS);
    }
  }, [chainId]);

  const back = () =>{
    setEditMode(false);
    if (quoteRef.current) {
      quoteOfTheDay
        ? (quoteRef.current.innerText = quoteOfTheDay)
        : (quoteRef.current.innerText = "");
    }
    console.log("");
    setUserQuote("");
  

  }

  const submit = async() =>{
    
    try {
      if(quoteRef.current){
        setIsLoading(true)
        await writeContractAsync({
          abi: QOTD_CONTRACT_ABI,
          address: contractAddressToUse,
          functionName: "setQuoteOfTheDay",
          args:[quoteRef.current.innerText],
          value: parseEther("0.0001")
        
        })
        
      }
      setEditMode(false);
    } catch (error) {
      //you can apply your error handling logic here
    }
    setIsLoading(false)

  }

  useEffect(()=>{
    console.log(userQuote)
  },[ userQuote])
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-10 p-24 ">
      <Navbar />
      <div className="text-5xl font-mono tracking-wide">
        <span className="text-[#00ff98] ">Quote</span> Of The Day
      </div>
      <div className=" w-96 text-lg border border-gray-500 h-14 flex gap-1  items-center justify-center   rounded-md">
        <button
          className={`py-2 h-full w-[50%] rounded-md ${
            chainId == morphSepolia.id && "bg-violet-600 "
          } `}
          onClick={() => {
            switchChain({ chainId: morphSepolia.id });
          }}
        >
          Morph
        </button>
        <button
          className={`py-2 h-full w-[50%] rounded-md ${
            chainId == foundry.id && "bg-violet-600 "
          } `}
          onClick={() => {
            switchChain({ chainId: foundry.id });
          }}
        >
          Local
        </button>
      </div>

      {!quoteOfTheDay && chainId == foundry.id ? (
        <div className="w-[28rem] mt-24 text-center">
          Contract not found. To set up a local blockchain node and
          deploy your contract to it, refer to the README file of this app. Make sure you keep this node running.
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
        <div
          className={`min-h-40 min-w-[30rem] z-10  text-center max-w-5xl  w-full  flex items-center  border-b tracking-wider mx-60
        text-lg border-gray-300 bg-gradient-to-b  from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 
        dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border  lg:p-4  justify-center 
        font-serif ${editMode ? "bg-zinc-800/30" : "bg-zinc-600/30"}`}
        >
          <span
            className={`py-5 text-xl  px-12 break-words outline-none max-w-full ${
              editMode
                ? "text-white "
                : `text-gray-300 before:content-['"'] after:content-['"'] italic `
            } `}
            contentEditable={editMode}
            suppressContentEditableWarning
            ref={quoteRef}
            // onInput={(e) => {
            //   setUserQuote((e.target as HTMLInputElement).innerText);
            // }}
          >
            {quoteOfTheDay}
          </span>
        </div>
        {editMode ? (
          <div className="flex gap-2">
            <button
              className=" bg-red-700 w-44 px-4 h-10 rounded-md hover:bg-red-800 disabled:bg-red-900 disabled:cursor-not-allowed"
              onClick={back}
              disabled={isLoading}
            >
              Back
            </button>
            <button
              className=" bg-[#00ff98] hover:bg-[#00d67f] h-10 w-48 text-black px-4 py-2 rounded-md flex justify-center items-center disabled:bg-[#00ab66] disabled:cursor-not-allowed"
              onClick={submit}
              disabled={isLoading}
            >
              {isLoading?<Loader />:"Submit (0.0001 ETH)"}
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className=" bg-[#00ff98] text-black px-4  py-2 rounded-md"
              onClick={() => {
                setEditMode(true);
              }}
            >
              Change it!
            </button>
          </div>
        )}
      </div>
      )}


    </main>
  );
}
