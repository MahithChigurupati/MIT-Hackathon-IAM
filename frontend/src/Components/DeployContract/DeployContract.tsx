import "./DeployContract.css";
import React from "react";
import {ethers} from "ethers";
import ABI from '../../artifacts/contracts/USA_Government.sol/USA_Government.json';

// @ts-ignore
class DeployContract extends React.Component {
    deploy = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        try {

            const nameInput = document.getElementById("Name") as HTMLInputElement;
            const dobInput = document.getElementById("DOB") as HTMLInputElement;
            const homeInput = document.getElementById("Home") as HTMLInputElement;
            const ssnInput = document.getElementById("SSN") as HTMLInputElement;
            const passportInput = document.getElementById("Passport") as HTMLInputElement;

            const name = nameInput.value;
            const dob = dobInput.value;
            const home = homeInput.value;
            const ssn = ssnInput.value;
            const passport = passportInput.value;

            const usa_gov = new ethers.Contract(
                // @ts-ignore
                "0x549F7F3067bd57cb3bf52Fe43BdeCC5F17f74834",
                ABI.abi,
                signer
            );

            const status = await usa_gov.addCitizen(name,dob,home,ssn,passport);
            console.log(status);

        } catch (error: any) {
            window.alert(
                'Error!' + (error && error.reason ? `\n\n${error.reason}` : `${error.message}`)
            );
        }
    }

    render(){
        return (
            <section id="DeployContract" className="deploy-contract">

                <div className={"params"}>
                    <label htmlFor="Name" className="paramLabel">Name</label>
                    <input id="Name" type="text" placeholder="<Minimum price>" ></input>
                    <label htmlFor="DOB" className="paramLabel">DOB</label>
                    <input id="DOB" type="text" placeholder="<Tenure of Auction>" ></input>
                    <label htmlFor="Home" className="paramLabel">Home</label>
                    <input id="Home" type="text" placeholder="<Decrement by Block>" ></input>
                    <label htmlFor="SSN" className="paramLabel">SSN</label>
                    <input id="SSN" type="text" placeholder="<Decrement by Block>" ></input>
                    <label htmlFor="Passport" className="paramLabel">Passport</label>
                    <input id="Passport" type="text" placeholder="<Decrement by Block>" ></input>
                </div>

                <div>
                    <button onClick={this.deploy}> <a href="#DeployContract"> ADD Citizen </a></button>
                </div>
            </section>
        );
    }


}

export default DeployContract;
