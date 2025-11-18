/* Any copyright is dedicated to the Public Domain.
   https://creativecommons.org/publicdomain/zero/1.0/ */

'use strict';

add_task(async function test_zenGlance_isGlanceTab() {
  // Test the browser.zenGlance.isGlanceTab API
  let extension = ExtensionTestUtils.loadExtension({
    manifest: {
      permissions: ["tabs"],
    },
    async background() {
      // Get all tabs
      const tabs = await browser.tabs.query({});
      browser.test.assertEq(tabs.length > 0, true, "Should have at least one tab");
      
      // Test with a normal tab - should return false
      const normalTabId = tabs[0].id;
      const isGlance = await browser.zenGlance.isGlanceTab(normalTabId);
      browser.test.assertEq(isGlance, false, "Normal tab should not be a glance tab");
      
      browser.test.sendMessage("done");
    },
  });

  await extension.startup();
  await extension.awaitMessage("done");
  await extension.unload();
});

add_task(async function test_zenGlance_isGlanceTab_with_glance() {
  // Test the API with an actual glance tab
  await openGlanceOnTab(async (glanceTab) => {
    let extension = ExtensionTestUtils.loadExtension({
      manifest: {
        permissions: ["tabs"],
      },
      async background() {
        // Get all tabs
        const tabs = await browser.tabs.query({});
        
        // Find a glance tab (if any exist)
        let foundGlanceTab = false;
        for (const tab of tabs) {
          try {
            const isGlance = await browser.zenGlance.isGlanceTab(tab.id);
            if (isGlance) {
              foundGlanceTab = true;
              browser.test.log(`Found glance tab with ID ${tab.id}`);
              break;
            }
          } catch (e) {
            browser.test.fail(`Error checking tab ${tab.id}: ${e.message}`);
          }
        }
        
        browser.test.assertEq(foundGlanceTab, true, "Should find at least one glance tab");
        browser.test.sendMessage("done");
      },
    });

    await extension.startup();
    await extension.awaitMessage("done");
    await extension.unload();
  });
});

add_task(async function test_zenGlance_isGlanceTab_invalid_id() {
  // Test with an invalid tab ID
  let extension = ExtensionTestUtils.loadExtension({
    manifest: {
      permissions: ["tabs"],
    },
    async background() {
      try {
        await browser.zenGlance.isGlanceTab(99999);
        browser.test.fail("Should have thrown an error for invalid tab ID");
      } catch (e) {
        browser.test.assertTrue(
          e.message.includes("Invalid tab ID"),
          "Should throw an error about invalid tab ID"
        );
      }
      
      browser.test.sendMessage("done");
    },
  });

  await extension.startup();
  await extension.awaitMessage("done");
  await extension.unload();
});
