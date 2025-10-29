import { defineConfig } from "vite";
import path, {resolve} from "node:path";
import * as glob from 'glob';

import { ViteMinifyPlugin } from 'vite-plugin-minify';
import HtmlCssPurgePlugin from 'vite-plugin-purgecss';
import HandlebarsPlugin from 'vite-plugin-handlebars';

function obtenerEntradas(){
    return Object.fromEntries(
        /*[
            ["index", resolve(__dirname, "index.html")],
            ["contactanos", resolve(__dirname, "contactanos.html")]
        ]*/
       glob.sync(
        './**/*.html',
        {
            ignore: [
                './dist/**',
                './node_modules/**'
            ]
        }
       ).map((file)=>{
        return [
            file.slice(0, file.length - path.extname(file).length),
            resolve(__dirname, file)
        ]
       })
    );
}

export default defineConfig(
    {
        appType: 'mpa',
        build: {
            minify: true,
            rollupOptions: {
                input: obtenerEntradas()
            }
        },
        plugins: [
            HandlebarsPlugin({
                partialDirectory: resolve(__dirname, 'src', 'partials')
            }),
            HtmlCssPurgePlugin(),
            ViteMinifyPlugin()
        ]
    }
);