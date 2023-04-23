import "./InteractwithContract.css";

import React from "react";
import {ethers} from "ethers";

import ABI from "../../artifacts/contracts/IND_Government.sol/IND_Government.json";

// @ts-ignore
class InteractWithContract extends React.Component{

    getInfo = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const adr = "d0x549F7F3067bd57cb3bf52Fe43BdeCC5F17f74834"

        const info_status = document.getElementById("info-status") as HTMLElement;
        info_status.textContent = `Please wait...`;

        try{

            const usa_government = new ethers.Contract(
                // @ts-ignore
                "0x549F7F3067bd57cb3bf52Fe43BdeCC5F17f74834",
                ABI.abi,
                signer
            );

            const status = await usa_government.getCitizen(parseInt(adr, 10));


            const statusElement = document.getElementById('state');
            const priceElement = document.getElementById('price');
            const sellerElement = document.getElementById('seller');
            const buyerElement = document.getElementById('buyer');
            const contractElement = document.getElementById('contract');
            const basePrice = document.getElementById('basePrice');
            const tenure = document.getElementById('tenure');
            const decrement = document.getElementById('decrement');




        }catch (error: any) {
            window.alert(
                'Error!' + (error && error.reason ? `\n\n${error.reason}` : `${error.message}`)
            );
            info_status.textContent = error.reason;
        }
    }

    bid = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const adr = document.getElementById('Contract Address') as HTMLInputElement

        try {

            const bidInput = document.getElementById("Bid Price") as HTMLInputElement;
            const bidValue = bidInput.value;

            const deployed = document.getElementById("winner") as HTMLElement;
            deployed.textContent = `Please wait... Processing transaction`;

            const basicDutchAuction = new ethers.Contract(
                adr.value.toString(),
                ABI.abi,
                signer
            );

            const biding = await basicDutchAuction.bid({value: `${bidValue}`});
            const receipt = await biding.wait();
            window.alert(`You are the winner and your tx hash is ${receipt.transactionHash}`);
            deployed.textContent = `You are the Winner`;

        } catch (error: any) {
            window.alert(
                'Error!' + (error && error.reason ? `\n\n${error.reason}` : `${error.message}`)
            );
            const deployed = document.getElementById("winner") as HTMLElement;
            deployed.textContent = error.reason.split(": ")[1];
        }
    }

    render() {
        return (
            <section id={"InteractWithContract"} className={"InteractWithContract"}>
            <div className={"infoStat"}>
                <div className={"params-outline"}>
                    <div className="params">
                        <label htmlFor="Contract Address" className="paramLabel">Local Citizen ID</label>
                        <input id="Contract Address" type="text" placeholder="<Contract Address>"></input>
                    </div>

                    <div className="deploy-btn">
                        <button onClick={this.getInfo}>Get Info</button>
                    </div>

                </div>
            </div>

                <ul className="info">
                        <li className={"label"}>Name</li>
                        <li id="state"></li>
                        <li className={"label"}>DOB </li>
                        <li id="price"></li>
                        <li className={"label"}>Home</li>
                        <li id="contract"></li>
                </ul>
                <ul className="info">
                    <li className={"label"}>SSN</li>
                    <li id="basePrice"></li>
                    <li className={"label"}>Passport</li>
                    <li id="tenure"></li>
                </ul>



                <div className={"infoStat"}>
                    <div className={"params-outline"}>
                        <div className="params">
                            <label htmlFor="Contract Address" className="paramLabel">Abroad Citizen ID</label>
                            <input id="Contract Address" type="text" placeholder="<Contract Address>"></input>
                        </div>

                        <div className="deploy-btn">
                            <button onClick={this.getInfo}>Get Info</button>
                        </div>

                    </div>
                </div>

                <ul className="info">
                    <li className={"label"}>Name</li>
                    <li id="state"></li>
                    <li className={"label"}>DOB </li>
                    <li id="price"></li>
                    <li className={"label"}>Home</li>
                    <li id="contract"></li>
                </ul>
                <ul className="info">
                    <li className={"label"}>SSN</li>
                    <li id="basePrice"></li>
                    <li className={"label"}>Passport</li>
                    <li id="tenure"></li>
                </ul>
            </section>


        );
    }
}

export default InteractWithContract;
