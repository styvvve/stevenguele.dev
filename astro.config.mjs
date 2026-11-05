// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
    site: 'https://stevenguele.dev',

    fonts: [
        {
            provider: fontProviders.fontsource(),
            name: 'Inter',
            cssVariable: '--font-inter',
            // Only 400 is loaded by default: without this, bold titles are faked by the browser
            weights: [400, 500, 600, 700],
            styles: ['normal', 'italic'],
        },
        {
            provider: fontProviders.fontsource(),
            name: 'JetBrains Mono',
            cssVariable: '--font-jetbrains-mono',
            weights: [400, 700],
            styles: ['normal'],
        },
    ],

    integrations: [
        // Code blocks: file name header + copy button, styled to match the site
        expressiveCode({
            themes: ['github-dark-default'],
            styleOverrides: {
                borderRadius: '12px',
                borderColor: '#26262B',
                codeBackground: '#0F0F11',
                codeFontFamily: 'var(--font-jetbrains-mono)',
                codeFontSize: '13px',
                codeLineHeight: '1.75',
                codePaddingInline: '16px',
                codePaddingBlock: '18px',
                uiFontFamily: 'var(--font-jetbrains-mono)',
                uiFontSize: '12px',
                frames: {
                    frameBoxShadowCssValue: 'none',
                    editorTabBarBackground: '#0F0F11',
                    editorTabBarBorderBottomColor: '#26262B',
                    editorActiveTabBackground: '#0F0F11',
                    editorActiveTabForeground: '#5E5E66',
                    editorActiveTabIndicatorTopColor: 'transparent',
                    editorActiveTabIndicatorBottomColor: 'transparent',
                    terminalTitlebarBackground: '#0F0F11',
                    terminalTitlebarBorderBottomColor: '#26262B',
                },
            },
        }),
    ],

    markdown: {
        // Astro 7 uses the Sätteri Markdown processor by default.
        // We use the unified (remark/rehype) processor to support math:
        // $$ ... $$ in Markdown → rendered to HTML by KaTeX at build time.
        processor: unified({
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        }),
    },
});
