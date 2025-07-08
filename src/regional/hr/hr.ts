import { Fyo } from 'fyo';

/**
* Generate Croatian PDV accounts and tax templates (25 %, 13 %, 5 %).
*/
export async function createCroatianRecords(fyo: Fyo) {
  const rates = [25, 13, 5];
  const parent = 'Duties and Taxes'; // already created by standard COA

  for (const rate of rates) {
    // 1️⃣ Ledger account (liability ➜ Tax)
    const accName = `VAT ${rate}%`;
    const acc = fyo.doc.getNewDoc('Account', {
      name: accName,
      parentAccount: parent,
      rootType: 'Liability',
      accountType: 'Tax',
      isGroup: false,
    });
    await acc.sync();

    // 2️⃣ Tax template
    const tax = fyo.doc.getNewDoc('Tax', {
      name: `VAT-${rate}`,
      details: [ { account: accName, rate } ],
    });
    await tax.sync();
  }
}