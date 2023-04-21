// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IGMP {

    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        uint message_
    ) external payable;
}

contract IND_Government{}