export default { extends: ["@commitlint/config-conventional"] };

// Types: [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]
// - build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// - chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
// - ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// - docs: Documentation only changes
// - feat: A new feature
// - fix: A bug fix
// - perf: A code change that improves performance
// - refactor: A code change that neither fixes a bug nor adds a feature
// - revert: Reverts a previous commit
// - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// - test: Adding missing tests or correcting existing tests
