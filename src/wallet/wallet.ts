declare let intentPlugin: IntentPlugin.Intent;

export class Wallet {
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