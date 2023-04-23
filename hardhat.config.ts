import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";



const config: HardhatUserConfig = {

  solidity: "0.8.17",
  paths:{
    artifacts:'./frontend/src/artifacts',
  }

};


export default config;