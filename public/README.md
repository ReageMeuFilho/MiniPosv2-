# Public Assets

This directory contains static assets for Cast-POS.

## Required Images

You need to add the following images for the app to work fully:

### Icons (Required for PWA)

- `icon-192x192.png` - App icon (192x192 pixels)
- `icon-512x512.png` - App icon (512x512 pixels)

**How to create**:
1. Design a simple icon with a dollar sign or QR code
2. Background: #2563eb (primary blue)
3. Export as PNG at 192x192 and 512x512

**Quick option**: Use an online tool like:
- https://favicon.io
- https://realfavicongenerator.net

### Optional Images

- `og-image.png` - Open Graph image for social sharing (1200x630)
- `splash.png` - Splash screen for Farcaster (800x800)

## Temporary Placeholders

For development, you can use solid color placeholders:

```bash
# Create placeholder icons (requires ImageMagick)
convert -size 192x192 xc:#2563eb icon-192x192.png
convert -size 512x512 xc:#2563eb icon-512x512.png
convert -size 1200x630 xc:#2563eb og-image.png
convert -size 800x800 xc:#2563eb splash.png
```

Or use online placeholder generators:
- https://placeholder.com
- https://via.placeholder.com

## File Structure

```
public/
├── icon-192x192.png    # PWA icon (small)
├── icon-512x512.png    # PWA icon (large)
├── og-image.png        # Social preview
├── splash.png          # Splash screen
├── manifest.json       # PWA manifest (already created)
└── README.md           # This file
```

## Usage

These images are referenced in:
- `src/app/layout.tsx` (metadata)
- `public/manifest.json` (PWA icons)
- `src/app/.well-known/farcaster.json/route.ts` (Farcaster manifest)

## Notes

- Images should be optimized for web (compressed)
- Icons should be simple and recognizable at small sizes
- Use PNG format for transparency support
- Consider using SVG for icons when possible

