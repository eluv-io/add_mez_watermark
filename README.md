# add_mez_watermark

Add a simple text watermark to an existing ABR Mezzanine content object

Before running, set env vars PRIVATE_KEY and FABRIC_CONFIG_URL


```
npm install

node add_mez_watermark.js mezLibId mezObjectId pathToWatermarkJsonFile
```

Example contents for WatermarkJsonFile:

```
{
  "font_color": "white@0.5",
  "font_relative_height": 0.05,
  "shadow": true,
  "shadow_color": "black@0.5",
  "template": "PREPARED FOR $USERNAME: DO NOT DISTRIBUTE",
  "x": "(w-tw)/2",
  "y": "h-(2*lh)"
}
```