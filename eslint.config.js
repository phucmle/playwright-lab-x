import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // General files configuration
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn', // Warn about console.log statements (should use proper logging)
      'no-unused-vars': 'error', // Error on unused variables (dead code detection)
      'prefer-const': 'error', // Use const instead of let when variable is never reassigned
      'no-var': 'error', // Disallow var declarations (use let/const instead)
      eqeqeq: ['error', 'always'], // Require === and !== instead of == and !=
      curly: ['error', 'all'], // Require curly braces around all control statements
      'no-trailing-spaces': 'error', // Disallow trailing whitespace at end of lines
      indent: ['error', 2], // Enforce 2-space indentation
      quotes: ['error', 'single'], // Enforce single quotes for strings
      semi: ['error', 'always'], // Require semicolons at end of statements
    },
  },

  // TypeScript configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // Disable base rules that are covered by TypeScript
      'no-unused-vars': 'off', // Turn off base rule in favor of TypeScript version

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // Ignore unused args starting with underscore
          varsIgnorePattern: '^_', // Ignore unused variables starting with underscore
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // Warn when using 'any' type (reduces type safety)
      '@typescript-eslint/prefer-nullish-coalescing': 'error', // Use ?? instead of || for null/undefined checks
      '@typescript-eslint/prefer-optional-chain': 'error', // Use obj?.prop instead of obj && obj.prop
      '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about ! operator (can cause runtime errors)
      '@typescript-eslint/consistent-type-imports': 'error', // Use 'import type' for type-only imports
      '@typescript-eslint/no-inferrable-types': 'error', // Don't explicitly type variables when TypeScript can infer
      '@typescript-eslint/prefer-as-const': 'error', // Use 'as const' for literal types instead of type assertions
    },
  },

  // Playwright test files configuration
  {
    files: [
      '**/*.{test,spec}.{js,ts}',
      '**/tests/**/*.{js,ts}',
      '**/e2e/**/*.{js,ts}',
      '**/test/**/*.{js,ts}',
      '**/playwright/**/*.{js,ts}',
    ],
    plugins: {
      playwright,
    },
    languageOptions: {
      globals: {
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        page: 'readonly',
        browser: 'readonly',
        context: 'readonly',
      },
    },
    rules: {
      // Playwright recommended rules
      'playwright/expect-expect': 'error', // Ensure tests contain at least one assertion
      'playwright/max-nested-describe': ['error', { max: 3 }], // Limit nesting of describe blocks for readability
      'playwright/missing-playwright-await': 'error', // Catch missing await keywords on Playwright async methods
      'playwright/no-conditional-expect': 'error', // Disallow expect() inside if/else blocks (unreliable tests)
      'playwright/no-conditional-in-test': 'error', // Disallow if/else logic in tests (makes tests non-deterministic)
      'playwright/no-element-handle': 'error', // Discourage ElementHandle usage (prefer Locators)
      'playwright/no-eval': 'error', // Disallow page.evaluate() with string code (security risk)
      'playwright/no-focused-test': 'error', // Prevent test.only() from being committed (breaks CI)
      'playwright/no-force-option': 'warn', // Warn about { force: true } option (bypasses actionability checks)
      'playwright/no-nested-step': 'error', // Disallow test.step() inside other test.step() calls
      'playwright/no-networkidle': 'error', // Discourage waitForLoadState('networkidle') (unreliable)
      'playwright/no-page-pause': 'error', // Prevent page.pause() from being committed (breaks CI)
      'playwright/no-restricted-matchers': [
        'error',
        {
          toBeFalsy: 'Use `toBe(false)` instead.', // Prefer explicit boolean checks
          toBeTruthy: 'Use `toBe(true)` instead.', // Prefer explicit boolean checks
        },
      ],
      'playwright/no-skipped-test': 'warn', // Warn about test.skip() (might indicate incomplete work)
      'playwright/no-useless-await': 'error', // Remove unnecessary await keywords
      'playwright/no-useless-not': 'error', // Remove unnecessary .not when using opposite matcher
      'playwright/no-wait-for-timeout': 'error', // Prevent page.waitForTimeout() (makes tests flaky)
      'playwright/prefer-comparison-matcher': 'error', // Use toBeGreaterThan() instead of expect(a > b).toBe(true)
      'playwright/prefer-equality-matcher': 'error', // Use toBe() instead of expect(a === b).toBe(true)
      'playwright/prefer-hooks-in-order': 'error', // Enforce beforeAll, beforeEach, afterEach, afterAll order
      'playwright/prefer-hooks-on-top': 'error', // Put hooks before test cases in describe blocks
      'playwright/prefer-lowercase-title': 'error', // Use lowercase test titles (consistent naming)
      'playwright/prefer-strict-equal': 'error', // Use toStrictEqual() instead of toEqual() for exact matches
      'playwright/prefer-to-be': 'error', // Use toBe() for primitive values instead of toEqual()
      'playwright/prefer-to-contain': 'error', // Use toContain() instead of expect(arr.includes(x)).toBe(true)
      'playwright/prefer-to-have-count': 'error', // Use toHaveCount() instead of expect(await locator.count()).toBe(n)
      'playwright/prefer-to-have-length': 'error', // Use toHaveLength() for arrays instead of checking length property
      'playwright/prefer-web-first-assertions': 'error', // Use expect(locator).toBeVisible() instead of expect(await locator.isVisible()).toBe(true)
      'playwright/require-hook': 'error', // Require setup/teardown to be in hooks, not in tests
      'playwright/require-soft-assertions': 'off', // Don't require soft assertions (project preference)
      'playwright/require-top-level-describe': 'off', // Don't require top-level describe block (project preference)
      'playwright/valid-describe-callback': 'error', // Ensure describe callback is a function
      'playwright/valid-expect': 'error', // Ensure expect() is called correctly
      'playwright/valid-expect-in-promise': 'error', // Ensure expect() in promises is awaited or returned
      'playwright/valid-title': [
        'error',
        {
          ignoreTypeOfDescribeName: false, // Check that describe names are strings
          disallowedWords: ['skipped', 'focused', 'pending'], // Prevent certain words in test titles
        },
      ],

      // Relaxed rules for test files
      'no-console': 'off', // Allow console.log in tests for debugging
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' type in tests for flexibility
      '@typescript-eslint/no-non-null-assertion': 'off', // Allow ! operator in tests (test data is often controlled)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(_|page|context|browser)$', // Ignore common Playwright fixtures when unused
          varsIgnorePattern: '^_', // Ignore variables starting with underscore
        },
      ],

      // Test-specific formatting
      'max-len': [
        'error',
        {
          code: 120, // Allow longer lines in tests (selectors can be long)
          ignoreStrings: true, // Ignore long strings (selectors, test data)
          ignoreTemplateLiterals: true, // Ignore long template literals
        },
      ],
    },
  },

  // Page Object Model files
  {
    files: ['**/pages/**/*.{js,ts}', '**/page-objects/**/*.{js,ts}', '**/pom/**/*.{js,ts}'],
    rules: {
      'playwright/no-element-handle': 'off', // Allow ElementHandle in POM for advanced scenarios
      'class-methods-use-this': 'off', // Allow methods that don't use 'this' in POM classes
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit', // Require public/private/protected keywords
          overrides: {
            constructors: 'no-public', // Don't require 'public' on constructors (redundant)
          },
        },
      ],
    },
  },

  // Configuration files
  {
    files: ['playwright.config.{js,ts}', '**/*.config.{js,ts}', '**/config/**/*.{js,ts}'],
    rules: {
      'no-console': 'off', // Allow console output in config files for debugging
      '@typescript-eslint/no-explicit-any': 'off', // Allow 'any' in config files for flexibility
      'playwright/no-eval': 'off', // Allow eval in config files if needed for dynamic config
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**', // Third-party dependencies
      'dist/**', // Build output
      'build/**', // Build output
      'coverage/**', // Test coverage reports
      'test-results/**', // Playwright test results
      'playwright-report/**', // Playwright HTML reports
      'test-results.xml', // JUnit test results
      '.next/**', // Next.js build output
      '.nuxt/**', // Nuxt.js build output
      '.output/**', // Nitro build output
      '.vscode/**', // VS Code settings
      '.idea/**', // IntelliJ IDEA settings
      '*.min.js', // Minified JavaScript files
      '*.bundle.js', // Bundled JavaScript files
      'public/**', // Static assets
      'static/**', // Static assets
    ],
  },
];
