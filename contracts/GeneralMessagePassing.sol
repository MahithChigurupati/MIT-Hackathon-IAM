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

}

contract SenderReceiver is AxelarExecutable{}