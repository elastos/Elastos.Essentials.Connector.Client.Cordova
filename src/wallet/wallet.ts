import { PayQuery, TransactionResult } from "@elastosfoundation/elastos-connectivity-sdk-cordova/dist/wallet";

declare let intentPlugin: IntentPlugin.Intent;

export class Wallet {
    static pay(query: PayQuery): Promise<TransactionResult> {
        return new Promise(async (resolve, reject)=>{
            let res: { result: TransactionResult };
            res = await intentPlugin.sendIntent("https://wallet.elastos.net/pay", query);

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
        await intentPlugin.sendIntent("https://wallet.elastos.net/esctransaction", {
            payload: payload
        });

        if (ret && ret.result && ret.result.status === "published")
            return ret.result.txid;

        return null;
    }
}