const {ElvClient} = require("elv-client-js");
const fs = require("fs");


const AddMezWatermark = async (mezLibId, mezObjectId, watermarkJson, offeringId) => {

  const client = await ElvClient.FromConfigurationUrl({
    configUrl: process.env.FABRIC_CONFIG_URL
  });

  // client.ToggleLogging(true);

  let wallet = client.GenerateWallet();
  let signer = wallet.AddAccount({
    privateKey: process.env.PRIVATE_KEY
  });
  await client.SetSigner({signer});

  console.log("Retrieving mezzanine metadata...");

  metadata = await client.ContentObjectMetadata({libraryId: mezLibId, objectId: mezObjectId});

  // read from metadata top level key 'offerings'
  if (!metadata.offerings) {
    console.log(`top level metadata key "offerings" not found`);
  }

  if (!metadata.offerings[offeringId]) {
    console.log(`top level metadata key "offerings" does not contain a "` + offeringId + `" offering`);
  }

  metadata.offerings[offeringId].simple_watermark = watermarkJson;
  console.log("");
  console.log("Writing metadata back to object.");
  const {write_token} = await client.EditContentObject({
    libraryId: mezLibId,
    objectId: mezObjectId
  });
  response = await client.ReplaceMetadata({
    metadata: metadata,
    libraryId: mezLibId,
    objectId: mezObjectId,
    writeToken: write_token
  });
  response = await client.FinalizeContentObject({libraryId: mezLibId, objectId: mezObjectId, writeToken: write_token});

  console.log("");
  console.log("Done with AddMezWatermark call.");
  console.log("");
};

const mezLibId = process.argv[2];
const mezObjectId = process.argv[3];
const watermarkJsonPath = process.argv[4];
const offeringId = process.argv[5] || "default";

if (!mezLibId || !mezObjectId || !watermarkJsonPath) {
  console.error(`
Usage: node add_mez_watermark.js mezLibId mezObjectId pathToWatermarkJsonFile [offeringId]
  
  Sample WatermarkJsonFile contents:
 
    {
      "font_color": "white@0.5",
      "font_relative_height": 0.05,
      "shadow": true,
      "shadow_color": "black@0.5",
      "template": "DO NOT DISTRIBUTE",
      "x": "(w-tw)/2",
      "y": "h-(2*lh)"
    }
`);
  return;
}

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.error(`
PRIVATE_KEY environment variable must be specified
`);
  return;
}

const configUrl = process.env.FABRIC_CONFIG_URL;
if (!configUrl) {
  console.error(`
FABRIC_CONFIG_URL environment variable must be specified, e.g. for test fabric, export FABRIC_CONFIG_URL=https://main.net955210.contentfabric.io/config
`);
  return;
}

const watermarkJson = JSON.parse(fs.readFileSync(watermarkJsonPath));


AddMezWatermark(
  mezLibId,
  mezObjectId,
  watermarkJson,
  offeringId
);
