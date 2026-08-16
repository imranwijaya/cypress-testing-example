/// <reference types="./index.d.ts" />

// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Force dark mode on the outer Cypress Runner GUI
if (window.top !== window) {
  const parentDocument = window.top.document;
  const style = parentDocument.createElement("style");
  style.innerHTML = `
    /* Changes the bright white background of the main runner panels */
    .reporter, body, html, .runnable-header, .panel, .container {
      background-color: #1a1a1a !important;
      color: #e0e0e0 !important;
    }
    /* Darkens borders to match the theme */
    div, section, header, span {
      border-color: #333333 !important;
    }
  `;
  parentDocument.head.appendChild(style);
}
