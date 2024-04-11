export const QOTD_CONTRACT_ABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "quoteOfTheDay",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setQuoteOfTheDay",
    inputs: [{ name: "_quote", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "payable",
  },
];

export const MORPH_QOTD_CONTRACT_ADDRESS =
  "0xa84641aced4c404c58E8350AfD3F75bb183Bf77d";

//enter your locally deployed contract's address here
// export const LOCAL_QOTD_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
export const LOCAL_QOTD_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
