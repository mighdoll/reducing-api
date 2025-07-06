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

type WeslReifiedRef = TBD;

type ReduceOptions = {
  preMap: string | WeslReifiedRef | ExoticFn<(input: 'vec2f') => 'f32'>
};

/**
 Questions:

 is encode() needed in an addition to dispatch()?
 - the theory is that encode() is faster, 
   because multiple shaders in the same encoder will
   be more efficiently handled by dawn/webgpu/GPU drivers.
   (but is this really true?)

 */
