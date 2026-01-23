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
const COMPONENT_GLOBS = ["src/components/**/*.{tsx,jsx}"];
const APP_ROUTER_GLOBS = ["src/app/**/*.{tsx,jsx}"];
const APP_COMPONENTS_GLOBS = ["src/app/**/_components/**/*.{tsx,jsx}"];

// ✅ 커스텀 훅 폴더(원하는 위치로 조정 가능)
const HOOK_GLOBS = ["src/hooks/**/*.{ts,tsx}", "src/**/_hooks/**/*.{ts,tsx}"];

/**
 * ✅ 네이밍 컨벤션(기본)
 * - 변수/함수/파라미터: camelCase
 * - 타입(클래스/인터페이스/타입/enum 등): PascalCase
 */
const BASE_NAMING_CONVENTION = [
  {
    selector: "variableLike",
    format: ["camelCase"],
    leadingUnderscore: "allow",
  },
  {
    selector: "typeLike",
    format: ["PascalCase"],
  },
];

export default defineConfig([
  // 1) Next.js 기본 권장 규칙
  ...nextVitals,
  ...nextTs,

  // 2) 공통 플러그인/규칙
  {
    files: FILE_GLOBS,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // ✅ 타입 정보 생성에 필요한 설정
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
      /**
       * 사용하지 않는 변수 에러
       */
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",

      /**
       * Naming Convention
       */
      "@typescript-eslint/naming-convention": [
        "error",
        // ✅ 컴포넌트: export 된 함수만 PascalCase
        {
          selector: "variable",
          modifiers: ["const", "exported"],
          types: ["function"],
          format: ["PascalCase"],
        },

        // ✅ 나머지 함수/변수는 camelCase
        {
          selector: "variableLike",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },

        // ✅ 타입 계열은 PascalCase
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],

      /**
       * 함수 스타일: 화살표 함수
       */
      "prefer-arrow-functions/prefer-arrow-functions": "error",
      "arrow-body-style": ["error", "always"],

      /**
       * if, else, for 전부 중괄호 강제
       */
      curly: ["error", "all"],

      /**
       * 이벤트 핸들러 네이밍
       * - props: onClick / onChange ...
       * - handler: handleClick / handleChange ...
       */
      "react/jsx-handler-names": [
        "error",
        {
          checkLocalVariables: true,
          checkInlineFunction: true,
        },
      ],

      /**
       * import 규칙
       */
      "import/order": [
        "error",
        {
          "newlines-between": "always",
        },
      ],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],

      /**
       * React-refresh export 제한 해제
       */
      "react-refresh/only-export-components": "off",

      /**
       * 파일명 규칙 (기본: camelCase)
       */
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{js,ts,jsx,tsx}": "CAMEL_CASE",
        },
      ],

      "prettier/prettier": ["error"],
    },
  },

  /**
   * 상수(대문자 SNAKE_CASE) 강제
   * - src/constants/** 안의 const는 무조건 UPPER_CASE
   */
  {
    files: ["src/constants/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        ...BASE_NAMING_CONVENTION,
        { selector: "variable", modifiers: ["const"], format: ["UPPER_CASE"] },
      ],
    },
  },

  /**
   * ✅ 커스텀 훅 네이밍 강제
   * - src/hooks/**, src//_hooks/ 에서 export 되는 함수/변수는 use~ 로 시작
   * - use 다음 글자는 대문자(= useToggle 처럼)
   */
  {
    files: HOOK_GLOBS,
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        ...BASE_NAMING_CONVENTION,
        {
          selector: ["function", "variable"],
          modifiers: ["exported"],
          prefix: ["use"],
          format: ["PascalCase"],
        },
      ],
    },
  },

  // 4) 컴포넌트 파일만 PascalCase 파일명 허용
  {
    files: COMPONENT_GLOBS,
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{tsx,jsx}": "PASCAL_CASE",
        },
      ],
    },
  },

  // 5) Next.js App Router 파일은 camelCase 파일명 유지(page/layout 등)
  {
    files: APP_ROUTER_GLOBS,
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{tsx,jsx}": "CAMEL_CASE",
        },
      ],
    },
  },

  // 6) App Router 내부의 _components 는 PascalCase 파일명
  {
    files: APP_COMPONENTS_GLOBS,
    rules: {
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{tsx,jsx}": "PASCAL_CASE",
        },
      ],
    },
  },

  // 7) Prettier와 충돌하는 ESLint 룰 끄기
  prettierConfig,

  // 8) 무시 경로
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "next.config.ts"]),
]);
