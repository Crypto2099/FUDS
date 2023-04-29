# FUDS (Cardano Fungible Disclosure System)

> **Don't trust. Verify.**
>
> — Crypto Proverb

_A system for financial reporting and disclosures backed by the blockchain for Native Asset token projects on the
Cardano blockchain._

**Original Author: Adam K. Dean**

Welcome to FuDS, the Fungible Disclosure System (FUDS) for Cardano Native Assets. The goal of this repository is to
define a system that easily enables Fungible Token (FT) projects
[ref: [CIP-26](https://github.com/cardano-foundation/CIPs/blob/master/CIP-0026)]
on the Cardano Blockchain to publish data pertaining to the project's tokenomics, display, formatting, and supply data
for easy consumption by third parties such as investors, the public, auditors, explorers, and anyone else who may be
interested in project accountability.

## How it Works

We describe this system as a hybrid model as it combines both on-chain and off-chain data to utilize the benefits and
features of blockchain security, provenance, and immutability with the dynamism and flexibility of off-chain code that
can be more readily modified, updated, and changed to minimize on-ledger bloat.

The pieces detailed below describe what would be considered _"Self Reporting"_ for a token project where information is
provided by the project itself. Given enough details from the project, it should be possible for a third party to audit
the disclosure and _verify_ the information provided.

### Step 1: On-Chain Project Registration

The first step is for token projects to submit an on-chain registration
utilizing [CIP-88](https://github.com/cardano-foundation/CIPs/pull/467) for on-chain, verifiable
registration of the token project information.

### Step 2: Publishing Financial Disclosures

A URI and data hash stored in the on-chain registration points to a JSON-formatted financial disclosures document which
describes various informational pieces about a project including: formatting and display information, team and investor
allocation wallets, and funding round raise information.

Financial disclosure statements are included off-chain because in the case of complex projects most likely the dataset
involved will become large/bloated over time. By publishing a "proof" to the blockchain we can benefit from the
immutability of the blockchain without bloating the ledger with large-scale documents. Other decentralized or blockchain
solutions such as IPFS or Arweave are better suited to these use cases, and it is recommended that Disclosure Documents
be published on one of these solutions.

The financial disclosure document should follow the specification format found
in [CIP-????](https://github.com/cardano-foundation/CIPs/pull/495).

### Step 3: Host (or Utilize) an Off-Chain Oracle Solution

The first two steps contain mostly "static" information that is unlikely to change or change infrequently. Other
information about a token project, such as circulating or total supply, may change very frequently and is better suited
to a traditional API integration rather than being published constantly to the blockchain ledger.

### Step 4: Verify

The final step of the process will be for third parties to independently verify the information provided in the
project's self-reporting disclosures. This repository will also aim to provide tools and information for third parties
to build out their own systems and utilize this data efficiently.

## Methodology

The FUDS system was inspired by many similarly open-sourced CIPs and components of the Cardano Ecosystem including, but
not limited to:

* Cardano Stake Pool Registration + Metadata Certificates
* [CIP-36](https://github.com/cardano-foundation/CIPs/blob/master/CIP-0036) Catalyst/Voltaire Voter Registration
  Certificates
* [CIP-26](https://github.com/cardano-foundation/CIPs/blob/master/CIP-0026) Cardano Token Registry
* [Cardano-Signer](https://github.com/gitmachtl/cardano-signer) Library by Martin Lang
* [CIP-88](https://github.com/cardano-foundation/CIPs/pull/467) by Adam K. Dean

Where possible the metadata published to the Cardano blockchain (in JSON format) is attempted to be kept in a format
similar/compatible to CBOR notation. The rationale for this is to keep the data payload published to the blockchain as
small as possible while maintaining strong-typing syntax to ensure easy composability and interpretation on both sides
of the situation (token projects and data consumers).

## Copyright

The work herein is published under
[Creative Commons Version 4 Attribution License]((https://creativecommons.org/licenses/by/4.0/legalcode)) and is free
for any use, modification, or publication (commercial or private) as long as attribution to original author(s) is given.


