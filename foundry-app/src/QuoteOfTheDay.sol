// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract QuoteOfTheDay {
    
    string public quoteOfTheDay;


    constructor() {
        quoteOfTheDay="choccy milk is goated";
    }

    function setQuoteOfTheDay(string memory _quote) external payable {
        if(msg.value>=0.0001 ether){
        quoteOfTheDay = _quote;
        }

    }

    receive() external payable{}
    fallback() external payable{}
}
