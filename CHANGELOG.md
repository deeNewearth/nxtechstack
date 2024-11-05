# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **[2024-11-05]** Added comprehensive E-Learning GraphQL schema including:
  - Course, Module, and Lesson management
  - Assessment and Progress tracking
  - Certificate management
  - Content management and validation
  - Enrollment management
  - Real-time subscriptions for progress and updates
  - Detailed documentation for all types, queries, and mutations
- **[2024-11-05]** Integrated SpectaQL for API documentation generation:
  - Added configuration in spectaql.yml
  - Added documentation generation scripts
  - Enhanced schema with detailed descriptions and examples
  - Added interactive documentation explorer
- Implemented Mongoose integration for database operations.
- Created GraphQL schema for Subscriber type.
- Added migration system for database schema changes.
- Added seeding functionality for the Subscriber collection.
- Added CLI command for database seeding.
- **[2024-10-29]** Added global exception filter for consistent error handling across HTTP and GraphQL contexts.
- **[2024-10-29]** Introduced custom error classes for validation, database, authentication, and more.
- **[2024-10-30]** Configured CORS to allow access from AltaireGraphQL Playground running on `http://localhost:4000`.
- **[2024-11-01]** Added Okta authentication strategy.

### Changed
- **[2024-11-05]** Enhanced schema documentation with comprehensive descriptions for all operations
- **[2024-11-05]** Updated README.md with documentation generation instructions
- Updated `BeCoreModule` to use Mongoose and GraphQL.
- Modified `SubscriberResolver` to use Mongoose models and GraphQL types.
- Updated `package.json` with new scripts and dependencies.
- **[2024-10-30]** Refactored error handling in resolvers and repositories to use custom error classes.

### Fixed
- Resolved issues with GraphQL type generation.
- Fixed TypeScript errors related to null safety in Subscriber schema.
- **[2024-10-30]** Fixed CORS issues to enable Altaire GraphQL Playground access.

## [0.1.0] - 2024-10-25

### Added
- Initial project setup with NestJS and GraphQL.
- Basic Subscriber model and resolver.
- Configuration for NX monorepo structure.

### Changed
- Updated TypeScript configuration for better type safety.

### Removed
- Placeholder schemas for Author and Post.

## Details of Changes

### Database Integration
- Implemented `mongoose.module.ts` for MongoDB connection.
- Created `subscriber.schema.ts` defining Mongoose schema for Subscribers.
- Added `subscribers.repository.ts` for database operations.

### GraphQL Integration
- Updated `schema.graphql` with Subscriber type definitions.
- Modified `subscribers.resolver.ts` to work with GraphQL and Mongoose.
- Implemented GraphQL code generation for type safety.

### Migration System
- Created `migration.service.ts` for handling database migrations.
- Implemented `1_create_subscriber_index.ts` as the first migration.
- Added `base.migration.ts` as a template for future migrations.

### Seeding Functionality
- Implemented `subscriber.seeder.ts` for seeding Subscriber data.
- Created `seeder.factory.ts` for managing different seeders.
- Added `seed.command.ts` for CLI-based seeding.

### Configuration Updates
- Updated `package.json` with new scripts and dependencies.
- Modified `tsconfig` files for better TypeScript integration.
- Updated `codegen.yml` for GraphQL type generation.

### Code Refactoring
- Refactored `subscribers.dto.ts` to align with GraphQL and Mongoose schemas.
- Updated `be-core.module.ts` to include new services and modules.
- Modified `main.ts` to include migration runs on startup.

### Error Handling and Logging
- Improved error handling in `migration.service.ts` and `subscriber.seeder.ts`.
- Added logging for better debugging and monitoring.
- **[2024-10-29]** Enhanced error handling with the introduction of a global exception filter and custom error classes.

### Development Workflow Improvements
- Added script in `package.json` for running database seeds.
- Implemented separate command for database seeding to avoid automatic seeding on every run.

### CORS and Altaire GraphQL Playground Integration
- **[2024-10-30]** Configured CORS settings to allow access from GraphQL Playground running on `http://localhost:4000`.
- Updated `main.ts` to ensure CORS settings are correctly applied for development environments.

### Okta Authentication
- **[2024-11-01]** Added Okta, JWT, and Mock authentication strategies.
- See [README.md](./README.md) for more details on how to configure Okta and use the different strategies.
