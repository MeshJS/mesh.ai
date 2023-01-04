import { Transaction, KoiosProvider } from "@meshsdk/core";

export function dataToMesh(data?, wallet?): string {
  // const data = [
  //   {
  //     type: "new",
  //     var: "tx",
  //     mod: "Transaction",
  //     fn: [
  //       {
  //         fn: "sendLovelace",
  //         val: [
  //           "addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //           "1000000",
  //         ],
  //       },
  //       {
  //         fn: "sendAssets",
  //         val: [
  //           "addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //           [
  //             {
  //               unit: "64af286e2ad0df4de29d7dhd7sh5b3d27faecf4ab2757056d860a424d657368546f6b656e",
  //               quantity: "8",
  //             },
  //           ],
  //         ],
  //       },
  //     ],
  //   },
  // ];
  // const data = [
  //   { type: "new", var: "koios", mod: "KoiosProvider", val: ["api"] },
  //   {
  //     type: "new",
  //     var: "tx",
  //     mod: "Transaction",
  //     fn: [
  //       {
  //         fn: "sendLovelace",
  //         val: [
  //           {
  //             type: "fn",
  //             var: "koios",
  //             fn: "fetchHandleAddress",
  //             val: ["bob"],
  //           },
  //           "55000000",
  //         ],
  //       },
  //       {
  //         fn: "sendAssets",
  //         val: [
  //           {
  //             type: "fn",
  //             var: "koios",
  //             fn: "fetchHandleAddress",
  //             val: ["bob"],
  //           },
  //           [
  //             { unit: "67g3c03j909", quantity: "1" },
  //             { unit: "h8gd23hd7189h3", quantity: "1" },
  //           ],
  //         ],
  //       },
  //       {
  //         fn: "sendLovelace",
  //         val: [
  //           { type: "fn", var: "koios", fn: "fetchHandleAddress", val: ["cc"] },
  //           "88000000",
  //         ],
  //       },
  //       {
  //         fn: "sendLovelace",
  //         val: [
  //           "addr_0dks0dskh3fuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
  //           "1000000",
  //         ],
  //       },
  //     ],
  //   },
  // ];

  if (data == undefined) {
    return '';
  }

  data = JSON.parse(data);

  let trackTransactions = {};
  // let displayCodeImports = {};
  let displayCodeMain = ``;

  for (let itemI in data) {
    let api = data[itemI];
    if (api.type == "new") {
      if (api.mod == "Transaction") {
        trackTransactions[api.var] = true;
        displayCodeMain = createNewTransaction(displayCodeMain, api, wallet);
      }
      if (api.mod == "KoiosProvider") {
        displayCodeMain = createNewKoiosProvider(displayCodeMain, api);
      }
    }
  }

  return displayCodeMain;
}

function createNewTransaction(displayCode, api, wallet?) {
  displayCode += `const ${api.var} = new Transaction({ initiator: wallet })\n`;

  let tx: undefined | Transaction = undefined;
  if (wallet) {
    tx = new Transaction({ initiator: wallet });
  }

  for (let fnI in api.fn) {
    let thisFn = api.fn[fnI];
    if (thisFn.fn == "sendLovelace") {
      displayCode = sendLovelace(displayCode, thisFn, tx);
    }
    if (thisFn.fn == "sendAssets") {
      displayCode = sendAssets(displayCode, thisFn, tx);
    }
  }
  displayCode += `;\n\n`;

  displayCode += `const unsignedTx = await tx.build();\n`;
  displayCode += `const signedTx = await wallet.signTx(unsignedTx);\n`;
  displayCode += `const txHash = await wallet.submitTx(signedTx);\n`;

  displayCode = "```" + displayCode + "```";
  return displayCode;
}

function sendLovelace(displayCode, api, tx) {
  if (tx) {
    tx.sendLovelace();
  }
  displayCode += `  .sendLovelace(\n`;
  displayCode += `    ${getRecipient(api.val[0])},\n`;
  displayCode += `    '${api.val[1]}'\n`;
  displayCode += `  )\n`;
  return displayCode;
}

function sendAssets(displayCode, api, tx) {
  displayCode += `  .sendAssets(\n`;
  displayCode += `    ${getRecipient(api.val[0])},\n`;
  displayCode += `    ${JSON.stringify(api.val[1])}\n`;
  displayCode += `  )\n`;
  return displayCode;
}

function getRecipient(recipient) {
  if (typeof recipient === "string" || recipient instanceof String) {
    return `'${recipient}'`;
  } else if (recipient.fn) {
    return `await ${recipient.var}.${recipient.fn}('${recipient.val[0]}')`;
  }
}

function createNewKoiosProvider(displayCode, api) {
  displayCode += `const ${api.var} = new KoiosProvider('${api.val[0]}');\n\n`;
  return displayCode;
}
