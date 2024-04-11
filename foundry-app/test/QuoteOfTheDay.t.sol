// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Test, console} from "forge-std/Test.sol";
import {QuoteOfTheDay} from "../src/QuoteOfTheDay.sol";

contract QuoteTest is Test {
    QuoteOfTheDay public quoteOfTheDay;

    function setUp() public {
        quoteOfTheDay = new QuoteOfTheDay();
        
    }
    function test_SetterWithoutEth() public {
        string memory testString  = "this should not get set";
        quoteOfTheDay.setQuoteOfTheDay(testString);

        //the line below will assert that quoteOfTheDay is NOT EQUAL to testString
        assertNotEq(quoteOfTheDay.quoteOfTheDay(), testString);
    }
    function test_SetterWithEth() public {
        string memory testString = "hi is this working?";
        quoteOfTheDay.setQuoteOfTheDay{value: 0.0001 ether}(testString);

        //the line below will assert that quoteOfTheDay is EQUAL to testString
        assertEq(quoteOfTheDay.quoteOfTheDay(), "hi is this working?");
    }




}
