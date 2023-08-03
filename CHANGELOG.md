# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2023-08-03

## Updated

- Doc comments for SCOPES.ACCOUNTS_READ and SCOPES.PROFILE_READ
- Scope value for SCOPES.PROFILE_ENRICHMENT_READ

## [1.2] - 2022-11-17

## Added

- Wallet transactions endpoints and types
- Wallet transactions examples

## [1.1.2] - 2022-10-11

### Updated

- Added idempotency key parameter `transfers.create()` and `transfers.refund()` #75
- Removed unnecessary payload from `Cards.list()` #73

## [1.1.1] - 2022-09-21

### Updated

- Merged a dependabot alert that got left behind on the previous release

## [1.1.0] - 2022-09-21

### Added

- Cards.link() function, thanks https://github.com/paulMery

### Updated

- Fixed documentation for listing accounts #69
- Applied documentation standards to recently updated Card endpoints
- Applied Node conventions to internal error messages

## [1.0.6] - 2022-09-16

### Updated

- Fixed documentation for name objects #67

## [1.0.5] - 2022-09-16

### Updated

- Failed to include the /dist folder in the previous NPM publish

## [1.0.4] - 2022-08-30

### Updated

- Updated typescripts types for Accounts to include verification property

## [1.0.3] - 2022-05-25

### Updated

- Use Basic authentication internally instead of Bearer to simplify and improve performance
- Internal cleanup of redundant x-account-id headers

## [1.0.2] - 2022-05-10

### Updated

- Fixed issue with representatives documentation and types
- Updated typescript types
- Updated documentation

## [1.0.1] - 2022-05-03

### Updated

- Fixed issue with typescript types
- Deprecated PUT calls on accounts and representatives
- Updated documentation

## [1.0.0] - 2022-04-07

### Updated

- Added additional checks for undefined, null, or empty params
- Updated typescript types
- Updated documentation

## [0.1.19] - 2022-04-05

### Added

- Added CommonJS support

## [0.1.19] - 2022-04-05

### Deleted

- removed version

## [0.1.17] - 2022-03-25

### Updated

- Accounts API examples
- Updated typescript types
- Updated documentation

## [0.1.16] - 2022-03-25

### Updated

- Accounts API to include accounts list, with examples
- Updated typescript types
- Updated documentation
- Remove unneeded mode property from Accounts

## [0.1.15] - 2022-03-23

### Added

- Representatives API with examples
- Updated typescript types
- Updated documentation

## [0.1.14] - 2022-03-18

### Updated

- Accounts API to include assign and get countries, with examples
- Updated typescript types
- Updated documentation

## [0.1.13] - 2022-03-17

### Added

- Cards API with examples
- Updated typescript types
- Updated documentation

## [0.1.12] - 2022-03-10

### Added

- Institutions API with examples
- Updated typescript types
- Updated documentation

## [0.1.11] - 2022-03-09

### Added

- Avatars API with examples
- Enriched Address API with examples
- Enriched Profile API with examples
- Updated typescript types
- Updated documentation

## [0.1.10] - 2022-03-07

### Added

- Wallets API with examples
- Updated typescript types
- Updated documentation

## [0.1.9] - 2022-03-07

### Added

- Payment Methods API with examples
- Updated typescript types
- Updated documentation

## [0.1.8] - 2022-03-04

### Updated

- Bank Accounts API with examples
- Updated typescript types
- Updated documentation

## [0.1.7] - 2022-02-21

### Updated

- Updated typescript types
- Update examples to utilize the npm package
- Updated documentation

## [0.1.6] - 2022-02-21

### Added

- Capabilities API with examples
- Updated documentation

## [0.1.5] - 2022-02-01

### Added

- Added all current scopes
- Updated documentation

## [0.1.4] - 2022-02-01

### Added

- Transfers API with examples
- Updated documentation

## [0.1.3] - 2022-01-26

### Added

- Accounts API with examples
- Improved documentation generation

## [0.1.1] - 2022-01-04

### Added

- Moov client
  - Initialization
  - Ping
  - Generate tokens
- Initial docs
- Initial examples
- Initial unit tests
