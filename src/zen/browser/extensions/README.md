# Zen Glance WebExtension API

## Overview

The `browser.zenGlance` API provides extensions with the ability to interact with Zen's Glance feature.

## API Reference

### `browser.zenGlance.isGlanceTab(tabId)`

Check if a given tab is a glance tab.

**Parameters:**
- `tabId` (integer): The ID of the tab to check

**Returns:**
- Promise<boolean>: Resolves to `true` if the tab is a glance tab, `false` otherwise

**Throws:**
- Error if the tab ID is invalid

**Example:**
```javascript
// Check if the current tab is a glance tab
const tabs = await browser.tabs.query({ active: true, currentWindow: true });
const isGlance = await browser.zenGlance.isGlanceTab(tabs[0].id);
console.log(`Current tab is${isGlance ? '' : ' not'} a glance tab`);
```

## Implementation Details

Glance tabs are special preview tabs in Zen Browser that overlay content without creating a full tab. They are identified by the `zen-glance-tab` attribute on the tab element.

## Permissions

This API does not require any special permissions beyond `tabs` permission.

## Testing

Tests are located in `src/zen/tests/glance/browser_zenGlance_api.js`.

Run tests with:
```bash
npm test
```
