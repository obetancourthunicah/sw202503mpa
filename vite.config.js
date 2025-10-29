import { defineConfig } from "vite";
import path, {resolve} from "node:path";
import * as glob from 'glob';

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
            rollupOptions: {
                input: obtenerEntradas()
            }
        }
    }
);