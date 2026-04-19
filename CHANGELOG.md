# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive CI/CD pipeline with lint, test, build, E2E, and Lighthouse checks
- Unit test infrastructure with Vitest (rewards, spaced repetition, analytics)
- ESLint + Prettier configuration for code quality
- Environment configuration system with feature flags
- Production-ready Docker setup with security hardening
- Nginx configuration with gzip, caching, and security headers
- `.env.example` for environment variable documentation
- Contributing guidelines and changelog

### Changed
- Expanded `.gitignore` to properly exclude build artifacts and dependencies
- Removed hardcoded MongoDB credentials from documentation
- Enhanced Docker image with non-root user and health checks
- Updated docker-compose with resource limits and logging
- Improved README with comprehensive documentation

### Fixed
- Removed exposed database credentials in TECH.md
- Added TypeScript types for Vite client (`import.meta.env`)

## [0.1.0] - Initial Release

### Added
- Interactive learning platform for children aged 3-6
- Pinyin learning module with initials, finals, and overall recognition
- Math启蒙 module with number recognition and counting
- English vocabulary module
- Story reading module with traditional Chinese stories
- Gamified reward system (stars, achievements, levels)
- Spaced repetition algorithm based on Ebbinghaus forgetting curve
- Parent summary and progress tracking
- Daily check-in and streak tracking
- Analytics tracking framework
- Basic E2E tests with Playwright
- Storybook component documentation
- Docker and docker-compose setup
- Vite build configuration with code splitting

---

## 版本说明

- **Unreleased**: 当前开发中的功能，将在下一个版本发布
- **0.1.0**: 初始版本，包含核心学习功能和基础架构

## 语义化版本

我们遵循 [Semantic Versioning](https://semver.org/spec/v2.0.0.html)：

- **主版本号 (Major)**: 不兼容的 API 修改
- **次版本号 (Minor)**: 向下兼容的功能性新增
- **修订号 (Patch)**: 向下兼容的问题修正

## 贡献

想要参与开发？请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何贡献。
