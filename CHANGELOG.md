# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Implemented Mongoose integration for database operations.
- Created GraphQL schema for Subscriber type.
- Added migration system for database schema changes.
- Implemented seeding functionality for the Subscriber collection.
- Added CLI command for database seeding.
- **[2024-11-01]** Added global exception filter for consistent error handling across HTTP and GraphQL contexts.
- **[2024-11-01]** Introduced custom error classes for validation, database, authentication, and more.

### Changed
- Updated `BeCoreModule` to use Mongoose and GraphQL.
- Modified `SubscriberResolver` to use Mongoose models and GraphQL types.
- Updated `package.json` with new scripts and dependencies.
- **[2024-11-01]** Refactored error handling in resolvers and repositories to use custom error classes.

### Fixed
- Resolved issues with GraphQL type generation.
- Fixed TypeScript errors related to null safety in Subscriber schema.

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
- **[2024-11-01]** Enhanced error handling with the introduction of a global exception filter and custom error classes.

### Development Workflow Improvements
- Added script in `package.json` for running database seeds.
- Implemented separate command for database seeding to avoid automatic seeding on every run.
