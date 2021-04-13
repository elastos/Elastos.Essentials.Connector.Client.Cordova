import { Wallet as ConnectivityWallet } from "@elastosfoundation/elastos-connectivity-sdk-cordova";

declare let intentManager: IntentPlugin.IntentManager;

export class Wallet {
    static pay(query: ConnectivityWallet.PayQuery): Promise<ConnectivityWallet.TransactionResult> {
        return new Promise(async (resolve, reject)=>{
            let res: { result: ConnectivityWallet.TransactionResult };
            res = await intentManager.sendIntent("https://wallet.elastos.net/pay", query);

            if (!res || !res.result) {
                console.warn("Missing pay response. The operation was maybe cancelled.");
                resolve(null);
                return;
            }

            resolve(res.result);
        });
    }

    public static async sendSmartContractTransaction(payload: any): Promise<string> {
        let ret: { result: { status:string, txid: string }} =
        await intentManager.sendIntent("https://wallet.elastos.net/esctransaction", {
            payload: payload
        });

        if (ret && ret.result && ret.result.status === "published")
            return ret.result.txid;

        return null;
    }
}