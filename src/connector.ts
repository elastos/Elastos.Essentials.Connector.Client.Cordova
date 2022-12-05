import { DID as ConnectivityDID, Interfaces, Wallet as ConnectivityWallet } from "@elastosfoundation/elastos-connectivity-sdk-cordova";
import { DID } from "./did/did";
import { Wallet } from "./wallet/wallet";

export class EssentialsConnector implements Interfaces.Connectors.IConnector {
    public name: string = "essentials";

    async getDisplayName(): Promise<string> {
        return "Elastos Essentials";
    }

    /**
     * DID API
     */

    getCredentials(query: ConnectivityDID.GetCredentialsQuery): Promise<DIDPlugin.VerifiablePresentation> {
        return DID.getCredentials(query);
    }

    requestCredentials(request: ConnectivityDID.CredentialDisclosureRequest): Promise<DIDPlugin.VerifiablePresentation> {
        return DID.requestCredentials(request);
    }

    generateAppIdCredential(appInstanceDID: string, appDID: string): Promise<DIDPlugin.VerifiableCredential> {
        return DID.generateAppIDCredential(appInstanceDID, appDID);
    }

    /**
     * Wallet API
     */

    async pay(query: ConnectivityWallet.PayQuery): Promise<ConnectivityWallet.TransactionResult> {
        return Wallet.pay(query);
    }

    async voteForDPoS() {
        throw new Error("Method not implemented.");
    }

    async voteForCRCouncil() {
        throw new Error("Method not implemented.");
    }

    async voteForCRProposal() {
        throw new Error("Method not implemented.");
    }

    sendSmartContractTransaction(payload: any) {
        return Wallet.sendSmartContractTransaction(payload);
    }
}