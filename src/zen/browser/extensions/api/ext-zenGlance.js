// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

/* global ExtensionAPI, ExtensionError */

'use strict';

this.zenGlance = class extends ExtensionAPI {
  getAPI(context) {
    return {
      zenGlance: {
        /**
         * Check if a given tab is a glance tab
         * @param {number} tabId - The ID of the tab to check
         * @returns {Promise<boolean>} A promise that resolves to true if the tab is a glance tab, false otherwise
         */
        async isGlanceTab(tabId) {
          const { tabManager } = context.extension;

          // Get the native tab from the tab ID
          const tab = tabManager.get(tabId);
          if (!tab) {
            throw new ExtensionError(`Invalid tab ID: ${tabId}`);
          }

          const nativeTab = tab.nativeTab;

          // Check if the tab has the zen-glance-tab attribute
          return nativeTab.hasAttribute('zen-glance-tab');
        },
      },
    };
  }
};
