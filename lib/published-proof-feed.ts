export type PublishedReceipt = {
  id: string;
  network: string;
  contract: string;
  transactionHash: string;
  blockNumber: string;
  verifierDecision: "accepted" | "challenged" | "pending";
  verifierQuorum: string;
  receiptHash: string;
  jobHash: string;
  evidenceRoot: string;
  modelTarget: string;
  jurisdiction: string;
  lastPublishedAt: string;
  publicationWindow: string;
};

export const publishedProofOverview = [
  {
    label: "Source of truth",
    value: "Horizen testnet",
    detail: "Smart contract receipts and verifier state are the record of publication.",
  },
  {
    label: "Publishing cadence",
    value: "Async daily/weekly",
    detail: "The website surfaces published snapshots after contract events are reviewed.",
  },
  {
    label: "Operational storage",
    value: "Deferred",
    detail: "The current MVP proof surface does not depend on Postgres for public state.",
  },
  {
    label: "Current mode",
    value: "Published proof feed",
    detail: "Read-only receipt console for reviewers, partners, and grant evaluators.",
  },
] as const;

export const publishedReceipts: PublishedReceipt[] = [
  {
    id: "receipt-001",
    network: "Horizen EON testnet",
    contract: "0x7c31f9f8d7aa67f2f6a524d8c91e1c3b17a8a0e2",
    transactionHash: "0x84f9b3c221d1f2780ed6125c701ef9db4cf7e6f7589a8127d37ca965bf109a11",
    blockNumber: "18,402,913",
    verifierDecision: "accepted",
    verifierQuorum: "3/3 accepted",
    receiptHash: "0xf4ea08a602f61bb44b132cdfc3b780611a05e2f4b2f108c956b514988f2307a9",
    jobHash: "0xc83441e55d2d072480ca65ee9f7bf9c36eaef4d802645566dcbbf1e49a9a0187",
    evidenceRoot: "0x0fe8d2a504f5c960cf31be4f2098a21b898f2d859614757026ad5a1f9a5b7504",
    modelTarget: "Qwen 7B policy QA baseline",
    jurisdiction: "Nigeria / controlled review region",
    lastPublishedAt: "2026-06-24 08:10 WAT",
    publicationWindow: "Daily snapshot",
  },
  {
    id: "receipt-002",
    network: "Horizen EON testnet",
    contract: "0x7c31f9f8d7aa67f2f6a524d8c91e1c3b17a8a0e2",
    transactionHash: "0x57dbb67f6383b8f66271042c1aa4f5fce028431e31a8f43aaf0ccb7cb44c9e80",
    blockNumber: "18,401,562",
    verifierDecision: "accepted",
    verifierQuorum: "2/2 accepted",
    receiptHash: "0x4134b32f3912ffb843a578a0b20dabcf3398b0b74d3647c066dc478b853e6dcc",
    jobHash: "0x88df70f94878a6df8905cf83c688890e9320c688efde75caab6eecc03757fc56",
    evidenceRoot: "0x2f1dc64e2e36ed268c50f8f1b59fa9c3e76df4b3d6ea1fed61101163a3f4cd8c",
    modelTarget: "Mistral 7B adaptation check",
    jurisdiction: "Permissioned review lane",
    lastPublishedAt: "2026-06-23 17:45 WAT",
    publicationWindow: "Daily snapshot",
  },
  {
    id: "receipt-003",
    network: "Horizen EON testnet",
    contract: "0x7c31f9f8d7aa67f2f6a524d8c91e1c3b17a8a0e2",
    transactionHash: "0x0d57d5feaef7a7df5930e8fa104c75cb3c6d4ffef49c27e4870f3e4a1b96675b",
    blockNumber: "18,399,880",
    verifierDecision: "pending",
    verifierQuorum: "1/3 published",
    receiptHash: "0x4e5451a85d29e0d4b693f0b7b573d3cfe4c8c6cefec2de8cc4d0b36a0901d34c",
    jobHash: "0xff2457810df1cf2f6c08ef6dc7ae4d7dc4cf697081784ca14a9cfaeff2f8e2a4",
    evidenceRoot: "0x6e98c545266b0ca4d24557738c4fb61832bd90db450a485c3f79b1fa610fcf2f",
    modelTarget: "Bedrock Qwen3-Coder procurement baseline",
    jurisdiction: "Evidence review queue",
    lastPublishedAt: "2026-06-22 11:20 WAT",
    publicationWindow: "Weekly batch",
  },
];

export const publishingModel = [
  {
    title: "Published asynchronously",
    body: "OSCIRIS does not promise live operational state on the website. Published receipts appear after contract events are reviewed and promoted.",
  },
  {
    title: "Blockchain-backed",
    body: "Job hashes, receipt hashes, verifier decisions, contract addresses, transaction hashes, and block references are treated as the public proof surface.",
  },
  {
    title: "Private operations deferred",
    body: "Private orchestration, drafts, and internal reviewer state can remain off the public path until the protocol surface is ready to expose them.",
  },
] as const;
