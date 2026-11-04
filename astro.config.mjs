// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
    fonts: [{
        provider: fontProviders.fontsource(), 
        name: 'Inter', 
        cssVariable: '--font-inter',
    }, 
    {
        provider: fontProviders.fontsource(), 
        name: 'JetBrains Mono', 
        cssVariable: '--font-jetbrains-mono',
    }], 
    site: 'https://stevenguele.dev'
}); 
