# FuDS

_A system for financial reporting and disclosures backed by the blockchain for Native Asset token projects on the 
Cardano blockchain. By Adam K. Dean_

Welcome to FuDS, the Fungible Disclosure System (FuDS) for Cardano Native Assets. The goal of this repository is to
define a system that easily enables Fungible Token (FT) projects on the Cardano Blockchain to publish data pertaining
to the project's tokenomics, display, formatting, and supply data for easy consumption by third parties such as
investors, the public, auditors, explorers, and anyone else who may be interested in project accountability.

## How it Works

We describe this system as a hybrid model as it combines both on-chain and off-chain data to utilize the benefits and
features of blockchain security, provenance, and immutability with the dynamism and flexibility of off-chain code that
can be more readily modified, updated, and changed to minimize on-ledger bloat.

The pieces detailed below describe what would be considered _"Self Reporting"_ for a token project where information is
provided by the project itself. Given enough details from the project, it should be possible for a third party to audit
the disclosure and _verify_ the information provided.

> **Don't trust. Verify.**
> 
> — Crypto Proverb

### Step 1: On-Chain Project Registration

The first step is for token projects to submit an on-chain registration utilizing [CIP-867]() for on-chain, verifiable
registration of the token project details.

### Step 2: Publishing Financial Disclosures

A URI and data hash stored in the on-chain registration points to a JSON-formatted financial disclosures document which
describes various informational pieces about a project including: formatting and display information, team and investor
allocation wallets, and funding round raise information.

### Step 3: Host (or Utilize) an Off-Chain Oracle Solution

The first two steps contain mostly "static" information that is unlikely to change or change infrequently. Other
information about a token project, such as circulating or total supply, may change very frequently and is better suited
to a traditional API integration rather than being published constantly to the blockchain ledger.
