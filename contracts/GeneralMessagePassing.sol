// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import { AxelarExecutable } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol';
import { IAxelarGateway } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol';
import { IAxelarGasService } from '@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol';

interface IGovernment {

    struct citizen {
        string name;
        string dob;
        string home;
        uint ssn;
        string passport;
    }

    function getCitizen(uint256 id) external view returns(citizen memory data);

    function setAbroadCitizen(citizen memory datafromAbroad ) external view;

}

contract SenderReceiver is AxelarExecutable{
    IAxelarGasService public immutable gasService;
    IGovernment public government;
    address localChainGovernmentContract;

    constructor(address gateway_, address gasService_) AxelarExecutable(gateway_) {
        gasService = IAxelarGasService(gasService_);
    }

    function sendMessage(
        string calldata destinationChain,
        string calldata destinationAddress,
        uint256 message_
    ) external payable {
        bytes memory payload = abi.encode(message_);
        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway.callContract(destinationChain, destinationAddress, payload);

    }

    function sendResponse(
        string calldata destinationChain,
        string calldata destinationAddress,
        IGovernment.citizen memory message_
    ) public payable {
        bytes memory payload = abi.encode(message_);
        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );

        gateway.callContract(destinationChain, destinationAddress, payload);

    }

    function setGovernment(address addy) public {
        localChainGovernmentContract = addy;
    }

    function _execute(
        string calldata sourceChain,
        string calldata sourceAddress,
        bytes calldata payload_
    ) internal override {

        government = IGovernment(localChainGovernmentContract);

        if(payload_.length > 0 && payload_[0] < 0x80){
            uint256 message = abi.decode(payload_, (uint256));

            IGovernment.citizen memory info = getDataFromGovernment(message);

            sendResponse(sourceChain,sourceAddress,info);

        }else{
            IGovernment.citizen memory message = abi.decode(payload_, (IGovernment.citizen));
            government.setAbroadCitizen(message);

        }


    }

    function getDataFromGovernment(uint msge) public view returns(IGovernment.citizen memory data){

        data = government.getCitizen(msge);
        return data;
    }
}






