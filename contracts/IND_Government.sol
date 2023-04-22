// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IGMP {

    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        uint message_
    ) external payable;
}

contract IND_Government{

    IGMP public sendReceiveMessage;
    address localGMP;
    uint256 UID = 0;
    uint256 f_UID = 0;

    struct governmentList{
        string chain;
        string governmentGMPContract;
    }

    struct citizen {
        string name;
        string dob;
        string home;
        uint ssn;
        string passport;
    }

    mapping(uint => citizen) public localCitizens;
    mapping(uint => citizen) public abroadCitizens;
    mapping(string => governmentList) public internationalChains;

    constructor(address GMP){
        localGMP = GMP;
        sendReceiveMessage = IGMP(localGMP);
    }

    function addCountry(string memory country, string memory countryChain, string memory countryGMPContract) public {
        governmentList memory government = governmentList(countryChain,countryGMPContract);
        internationalChains[country] = government;
    }

    function addCitizen(string memory name, string memory dob, string memory home, uint ssn, string memory passport) public {
        UID++;
        citizen memory newCitizen = citizen(name, dob, home, ssn, passport);
        localCitizens[UID] = newCitizen;
    }

    function getCitizen(uint256 id) public view returns(citizen memory){
        return localCitizens[id];
    }

    function getCitizenAbroad(uint256 citizenUid, string memory countryCode) public{
        governmentList memory gov = internationalChains[countryCode];
        string memory destinationChain = gov.chain;
        string memory destinationAddress = gov.governmentGMPContract;

        sendReceiveMessage.sendMessage(destinationChain, destinationAddress, citizenUid);
    }

    function setAbroadCitizen(citizen memory datafromAbroad ) public {
        f_UID++;
        abroadCitizens[f_UID] = datafromAbroad;
    }
}






