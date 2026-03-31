# Pilatus LPP - Cypress E2E Test Suite

End-to-end smoke test suite for the Pilatus LPP (Less Paper Platform) web application — a system that digitizes business and manufacturing processes for an aircraft manufacturer, minimizing paper trail across factory operations.

Built with Cypress and NTLM authentication.

> **Note:** This is a sanitized portfolio version. All internal URLs and credentials have been removed.

## Tech Stack

- **Cypress 13.13.0** — E2E test framework
- **cypress-ntlm-auth 4.1.7** — NTLM/Windows authentication for corporate SSO
- **K6** — API load/performance testing
- **Mochawesome 7.1.3** — HTML test reporting
- **Cypress Cloud** — parallel execution and dashboard recording

## Prerequisites

- **Node.js** v18+
- **npm** v9+
- **Browser:** Chrome, Edge or Firefox
- [**K6**](https://grafana.com/docs/k6/latest/set-up/install-k6/) (for load tests only)

## Installation

```bash
npm install
cp .env.example .env   # fill in credentials
```

## Running Tests

```bash
# All tests headless (default browser)
npm test

# Specific browser
npm run test:chrome
npm run test:edge
npm run test:firefox

# Cypress GUI (interactive)
npm run test:debug

# Cypress Cloud recording
npm run test:cloud
npm run test:cloud:chrome

# Parallel execution (requires Cypress Cloud)
npm run test:cloud:parallel
npm run test:cloud:chrome:parallel

# K6 load test (multi-endpoint)
npm run test:load

# K6 spike test
npm run test:load:spike

# K6 stress test
npm run test:load:stress

# K6 soak test
npm run test:load:soak
```

## Project Structure

```
cypress/
  EAP e2e Smoke Test/          # EAP module test specs (home page, test recording)
  EPI e2e Smoke Test/          # EPI module test specs
  k6 performance test/         # K6 performance tests (load, spike, stress, soak)
  fixtures/                    # Test data files
  support/
    commands.js                # Custom Cypress commands (auth, visitWait, clearAll)
    test-data/
      constants.js             # Centralized test data constants
    page_objects/
      home-page-eap.js         # EAP home page interactions
      home-page-epi.js         # EPI home page interactions
      digital-workplace-eap.js # Digital Workplace page interactions
      test-recording-eap.js    # Test recording page interactions
      roles-eap.js             # User role switching
      assertions.js            # Assertion facade (composes sub-modules)
      assertions/
        user-assertions.js     # User sign-in validations
        search-assertions.js   # Search result validations
        navigation-assertions.js    # URL and page navigation checks
        test-recording-assertions.js # Test recording UI assertions
```

## Architecture

### Assertion Facade Pattern

Assertions are split into 4 domain-specific modules, then composed into a single `assertions` object through a facade:

```
assertions.js (facade, 22 LOC)
├── user-assertions.js          # Parameterized assertSignedInUser(displayName)
├── search-assertions.js        # State filter helper _assertStateFilter()
├── navigation-assertions.js    # URL and page navigation checks
└── test-recording-assertions.js # Tabs, badges, swap, reset
```

The facade uses `Object.getOwnPropertyNames()` to walk each module's prototype and bind all methods to a single object:

```javascript
import { assertions } from '../support/page_objects/assertions';

// Method from UserAssertions
assertions.assertSignedInA_Checker();

// Method from SearchAssertions
assertions.assertMSNSearch();
```

### Constants Layer

All test data (MSNs, aircraft types, EAP numbers, user display names) is centralized in `test-data/constants.js`. Page objects and assertions import from this single source.

### Smart Waits

Hard `cy.wait(ms)` calls are replaced with:
- `cy.intercept()` + `cy.wait("@alias")` for API calls
- `cy.get(selector, { timeout }).should("be.visible")` for DOM elements

Remaining `cy.wait()` calls exist only in the PDF download flow where file I/O timing has no DOM event to wait on.

### NTLM Auth Command

`cy.auth(username)` handles corporate SSO with an alias lookup map for role-based user switching across 13 roles.

## Test Coverage

**EAP Home Page** — 27 tests
- Role verification (13 roles)
- Search filters: MSN, aircraft type, workplace, EAP name/number, state, N/A, eOWL
- Multi-parameter search, clear search
- PDF report download
- Digital Workplace navigation, OWL records

### Roles Verified

| # | Role | Display Name | Verification |
|---|------|-------------|--------------|
| 1 | Default User | Nikolic Nikola | Sign-in navbar check |
| 2 | A-Checker | eap_testing_shop_sen | Sign-in + Digital Workplace access |
| 3 | A2-Checker | eap_testing_shop_TL | Sign-in navbar check |
| 4 | B-Checker | eap_testing_shop | Sign-in + test recording fill out |
| 5 | Q-Checker | eap_testing_shop_quality | Sign-in + Digital Workplace access |
| 6 | FQ-Checker | eap_testing_fquality | Sign-in navbar check |
| 7 | G-Checker | eap_testing_customer | Sign-in navbar check |
| 8 | G1-Checker | eap_testing_custome2 | Sign-in navbar check |
| 9 | Reporter | eap_testing_report | Sign-in navbar check |
| 10 | Apprentice | eap_testing_shop_app | Sign-in navbar check |
| 11 | Quality Editor | epp_testing_qeditor | Sign-in navbar check |
| 12 | Shopfloor Admin | epp_testing_shopfloor_admin | Sign-in navbar check |
| 13 | Production Coordinator | Nikolic Nikola | Sign-in + swap test recording |

**EAP Test Recording** — 3 tests
- Tab navigation & UI sanity check
- B-check fill out + A-check + test reset
- Swap test recording as Production Coordinator

**EPI Home Page** — 1 test
- Search button state validation

**K6 Performance Tests** — 4 scenarios
- **Load test** — multi-endpoint load with 10 concurrent users
- **Spike test** — sudden surge to 50 users, then recovery
- **Stress test** — gradual ramp to 100 users to find breaking point
- **Soak test** — sustained 10-user load over 5 minutes to detect degradation

## Conventions

### Naming

- **Page Objects:** `<page>-<module>.js` kebab-case (e.g. `home-page-eap.js`)
- **Classes:** PascalCase (e.g. `HomePageEAP`, `TestRecordingEAP`)
- **Exports:** `on<Name>` for PO instances (e.g. `onHomePage`, `onTestRecording`)
- **Assertions:** `assertions.<method>()` — prefixed with `assert` (e.g. `assertions.assertMSNSearch()`)
- **Constants:** UPPER_SNAKE_CASE grouped by domain (e.g. `MSN.PRIMARY`, `AIRCRAFT_TYPE.PC_24`)

### Import Pattern

```javascript
// Tests import facades and singletons, never sub-modules directly
import { onHomePage } from '../support/page_objects/home-page-eap';
import { assertions } from '../support/page_objects/assertions';
import { changeRole } from '../support/page_objects/roles-eap';
```

## Environment Variables

All sensitive values (URLs, credentials, PINs) are stored in `.env` and accessed via `Cypress.env()`. See `.env.example` for the full list.

Key groups:
- **Base URLs** — main app, EPI test, dev, test, analytics, inside
- **Credentials** — QA user, viewer, shop user passwords
- **PINs** — A-Checker and Production Coordinator confirmation PINs
- **Cypress Cloud** — record key for dashboard recording
- **K6** — API URL for performance tests

## Reporting

Tests generate a Mochawesome HTML report with:
- Pass/fail status per test
- Screenshots on failure
- Execution duration

Report output: `cypress/reports/mochawesome-report/`

## Other Root Files

- **`entrypoint.sh`** — Docker container entrypoint script
- **`.gitlab-ci.yml`** — GitLab CI/CD pipeline definition
- **`tsconfig.json`** — TypeScript configuration

## Author

[**Nikola Nikolić** — QA Automation Engineer](https://github.com/Gzingo)
