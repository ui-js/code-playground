import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import eslint from '@rbnlffl/rollup-plugin-eslint';

import pkg from './package.json';

process.env.BUILD = process.env.BUILD || 'development';
const PRODUCTION = process.env.BUILD === 'production';
const BUILD_DIRECTORY = PRODUCTION ? 'dist' : 'build';

const TYPESCRIPT_OPTIONS = {
  // typescript: require('typescript'),
  clean: PRODUCTION,
  // verbosity: 3,
  include: ['*.ts+(|x)', '**/*.ts+(|x)', '*.js+(|x)', '**/*.js+(|x)'],
  tsconfigOverride: {
    compilerOptions: {
      // declaration: false,
    },
  },
};

const PKG_VERSION = pkg.version || 'v?.?.?';

const TERSER_OPTIONS = {
  format: {
    comments: false,
    preamble: '/*  v' + PKG_VERSION + '  */',
  },
  compress: {
    drop_console: true,
    drop_debugger: true,
    ecma: 8, // Use "5" to support older browsers
    module: true,
    warnings: true,
    passes: 4,
    global_defs: {
      ENV: JSON.stringify(process.env.BUILD),
      GIT_VERSION: process.env.GIT_VERSION || '?.?.?',
    },
  },
};

const ROLLUP = [
  {
    input: './src/code-playground.ts',
    output: {
      file: `${BUILD_DIRECTORY}/code-playground.min.js`,
      format: 'es',
      sourcemap: false,
    },
    // external: ['tslib'],
    plugins: [
      resolve(),
      typescript(TYPESCRIPT_OPTIONS),
      terser(TERSER_OPTIONS),
    ],
  },
  {
    input: './src/code-playground.ts',
    output: {
      file: `${BUILD_DIRECTORY}/code-playground.js`,
      format: 'es',
      sourcemap: true,
    },
    plugins: [eslint(), resolve(), typescript(TYPESCRIPT_OPTIONS)],
  },
];

export default ROLLUP;
