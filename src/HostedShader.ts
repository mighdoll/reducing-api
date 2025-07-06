/** 
 * API for integrating GPU shaders into JavaScript/TypeScript programs
 * 
 * A HostedShader encapsulates one or more WebGPU compute or render shader modules,
 * along with necessary resources (buffers, textures, pipelines, shader modules, bindings)
 * and the logic for dispatching the shader modules.
 * 
 * Parameters 
 */
export interface HostedShader {
  /** run this shader standalone, creating its own GPUCommandEncoder and dispatching */
  dispatch(): void;

  /** Add compute or render passes for this shader
   * (caller provides the GPUCommandEncoder) */
  encode(encoder: GPUCommandEncoder): void;

  /** cleanup gpu resources */
  destroy?(): void;

  /** optional name for logging and benchmarking */
  name?: string;
}

/** optional parameters can be provided as a value, a function returning a value, or undefined */
export type OptParam<T> = T | (() => T) | undefined;

export type TBD = any;

interface ExoticFn<TShape> {
  readonly identifier: string;
  readonly decl: string;
  readonly '~shape': TShape;
}

type WeslReifiedRef = TBD; // untyped?

import type { TgpuFn } from 'typegpu';
import type { Vec2f, F32, Infer } from 'typegpu/data';

type ReduceOptions<TIn, TOut> = {
  preMap: string | WeslReifiedRef | TgpuFn<(input: TIn) => TOut>,
  initial: Infer<TIn>,
};

// Using TypeGPU types:
// + Every type is enumerated (no way to mistype something) (a: 'vce3f') => 'vec3f' 
// - Could be not neutral enough for alternate typed-APIs
// 'stringy' types:
// + No peer dependency on TypeGPU
// - Recursive types

// F32,    I32,    WgslArray<>, WgslStruct<{ ... }>
// number, number, ???[],       { ... }

// type Infer<T> = T extends F32 ? number : T extends I32 ? number : T extends WgslArray<infer Element> ? Infer<Element>[] : ...;
// type WgslArray<T> = { 'repr': T['repr'][] };
// WgslArray<F32> => 'repr': number[]

import { myMap } from "./foo.wesl?wesl"; 
import { consts } from "./bar.wesl?typgpu"; // const containing [1.1, 24]
const { myArray}  = consts;

const shader = `
  const myArray: vec2f = vec2f(1, 2);
`;

const myMap2 = typegpu.fn();

import { vec2f } from 'typegpu/data';

const myReduce = reduceBuffer({ map: myMap, initial: [1.1, 24] });
//    ^? ReduceBuffer<Vec2f, F32>

/**
 Questions:

 what's the type of reduceBuffer.mapFn?
 how do you import from a wgsl/wesl to get something that matches the type?


 is encode() needed in an addition to dispatch()?
 - the theory is that encode() is faster, 
   because multiple shaders in the same encoder will
   be more efficiently handled by dawn/webgpu/GPU drivers.
   (but is this really true?)

 */
