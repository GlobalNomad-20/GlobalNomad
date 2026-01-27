import { defineConfig, globalIgnores } from "eslint/config";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

import checkFile from "eslint-plugin-check-file";
import preferArrowFunctions from "eslint-plugin-prefer-arrow-functions";
import react from "eslint-plugin-react";

import tsParser from "@typescript-eslint/parser";

const FILE_GLOBS = ["**/*.{js,ts,jsx,tsx}"];
const COMPONENT_GLOBS = [
  "src/components/**/*.{tsx,jsx}",
  "src/providers/**/*.{tsx,jsx}",
  "src/assets/svg/**/*.{tsx,jsx}",
];
const APP_ROUTER_GLOBS = ["src/app/**/*.{tsx,jsx}"];
const APP_COMPONENTS_GLOBS = [
  "src/app/**/_components/**/*.{tsx,jsx}",
  "src/app/**/_providers/**/*.{tsx,jsx}",
];

const HOOK_GLOBS = ["src/hooks/**/*.{ts,tsx}", "src/**/_hooks/**/*.{ts,tsx}"];

/**
 * ✅ 공통 네이밍 컨벤션 상수화
 * - 중복 작성을 피하기 위해 기본 규칙을 정의합니다.
 */
const BASE_NAMING_CONVENTION = [
  // 1. 일반 함수: camelCase (컴포넌트 제외)
  {
    selector: "function",
    format: ["camelCase", "PascalCase"],
    leadingUnderscore: "allow",
  },
  // 2. 일반 변수/파라미터: camelCase
  {
    selector: "variableLike",
    format: ["camelCase"],
    leadingUnderscore: "allow",
  },
  // 3. 타입(class, interface, type, enum): PascalCase
  {
    selector: "typeLike",
    format: ["PascalCase"],
  },
];

export default defineConfig([
  // 1) Next.js 기본 권장 규칙
  ...nextVitals,
  ...nextTs,

  // 2) 전역 공통 플러그인/규칙
  {
    files: FILE_GLOBS,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      react,
      "check-file": checkFile,
      "prefer-arrow-functions": preferArrowFunctions,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",

      /**
       * Naming Convention (전역 기본)
       */
      "@typescript-eslint/naming-convention": ["error", ...BASE_NAMING_CONVENTION],

      /**
       * 함수 스타일 및 문법 강제
       */
      "prefer-arrow-functions/prefer-arrow-functions": "error",
      "arrow-body-style": ["error", "always"],
      curly: ["error", "all"],

      /**
       * React 관련
       */
      "react/jsx-handler-names": [
        "error",
        {
          checkLocalVariables: true,
          checkInlineFunction: true,
        },
      ],
      "react-refresh/only-export-components": "off",

      /**
       * 컴포넌트 규칙
       */
      "react/function-component-definition": [2, { namedComponents: "arrow-function" }],

      /**
       * Import 규칙
       */
      "import/order": ["error", { "newlines-between": "always" }],
      "import/extensions": ["error", "ignorePackages", { ts: "never", tsx: "never" }],

      /**
       * 파일명 규칙 (기본: camelCase)
       * - 구체적인 컴포넌트 폴더 등은 아래에서 덮어씌움
       */
      "check-file/filename-naming-convention": ["error", { "**/*.{js,ts,jsx,tsx}": "CAMEL_CASE" }],

      /**
       * Prettier 설정 파일(.prettierrc) 로드
       */
      "prettier/prettier": [
        "error",
        {},
        {
          usePrettierrc: true,
        },
      ],
    },
  },

  // 3) 컴포넌트 네이밍 규칙 (PascalCase 강제)
  {
    files: [...APP_ROUTER_GLOBS, ...COMPONENT_GLOBS, ...APP_COMPONENTS_GLOBS],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        // ✅ 컴포넌트는 PascalCase (export된 함수/const)
        {
          selector: "variable",
          modifiers: ["const", "exported"],
          types: ["function"],
          format: ["PascalCase"],
        },
        {
          selector: "function",
          modifiers: ["exported"],
          format: ["PascalCase"],
        },
        // ✅ 나머지는 기본 규칙 적용
        ...BASE_NAMING_CONVENTION,
      ],
    },
  },

  // 4) 상수(constants) 폴더 규칙
  {
    files: ["src/constants/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        { selector: "variable", modifiers: ["const"], format: ["UPPER_CASE"] },
        ...BASE_NAMING_CONVENTION,
      ],
    },
  },

  // 5) 커스텀 훅 규칙
  {
    files: HOOK_GLOBS,
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["function", "variable"],
          modifiers: ["exported"],
          prefix: ["use"],
          format: ["PascalCase"],
        },
        ...BASE_NAMING_CONVENTION,
      ],
    },
  },

  // 6) 파일명 규칙: 컴포넌트 (PascalCase)
  // - 일반 컴포넌트 폴더 + App Router 내부 _components 폴더 통합
  {
    files: [...COMPONENT_GLOBS, ...APP_COMPONENTS_GLOBS],
    rules: {
      "check-file/filename-naming-convention": ["error", { "**/*.{tsx,jsx}": "PASCAL_CASE" }],
    },
  },

  // 7) Prettier와 충돌하는 룰 끄기
  prettierConfig,

  // 8) 무시 경로
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "next.config.ts"]),
]);
