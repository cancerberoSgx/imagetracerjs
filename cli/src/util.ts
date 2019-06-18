import PNGReader from 'png.js'
import { Options } from './options';

/**
 * Execute given functions returning promises serially. Returns a promise that resolves when all finish with they results as array.
 */
export function serial<T = any>(p: (() => Promise<T>)[]): Promise<T[]> {
  return new Promise(resolve => {
    p.reduce((promiseChain: any, currentTask: () => Promise<T>) => {
      return promiseChain.then((chainResults: T[]) =>
      currentTask().then(currentResult => [...chainResults, currentResult])
      )
    }, Promise.resolve([])).then((arrayOfResults: T[]) => {
      resolve(arrayOfResults)
    })
  })
}

// // type PNG = PNGReader['png']
// import Jimp from 'jimp';
// var ImageTracer = require('imagetracerjs');
// export function readPng(content: Buffer): Promise<PNG> {
//   const img = await 
//   return new Promise((resolve, reject) => {

//     return new PNGReader(content).parse((error, png) => {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(png)
//       }
//     })
//   })
// }

// export async function tracePngToSvg(input: Buffer, options: Options) {
//   const png = await readPng(input);
//   const outputContent = ImageTracer.imagedataToSVG({ ...png, data: png.pixels }, options);
//   return outputContent;
// }
