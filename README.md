# add_mez_watermark

Add a simple text watermark to an existing ABR Mezzanine content object

Before running, set env vars PRIVATE_KEY and FABRIC_CONFIG_URL

(substitute appropriate PRIVATE_KEY and FABRIC_CONFIG_URL below)
```
npm install

export PRIVATE_KEY=0x0000000000000000000000000000000000000000000000000000000000000000
export FABRIC_CONFIG_URL="https://main.net955210.contentfabric.io/config" # (test network)

node add_mez_watermark.js mezLibId mezObjectId pathToWatermarkJsonFile
```

Example contents for WatermarkJsonFile:

```
{
  "font_color": "white@0.5",
  "font_relative_height": 0.05,
  "shadow": true,
  "shadow_color": "black@0.5",
  "template": "PREPARED FOR $USERNAME - DO NOT DISTRIBUTE",
  "x": "(w-tw)/2",
  "y": "h-(4*lh)"
}
```
x and y expressions above use variables from ffmpeg's drawtext filter to center the watermark 4 lines up from bottom of frame:

*  h - video frame height
*  lh - height of one line of text
*  th - height of entire block of text (could be multiline if it contains \n)
*  tw - width of entire block of text
*  w - video frame width  
  
(see https://ffmpeg.org/ffmpeg-all.html#Syntax-2 for more info and additional variables)
  
