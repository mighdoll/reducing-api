import type { BinOp } from "./BinOp.ts";
import type { HostedShader, OptParam, TBD } from "./HostedShader.ts";

/** parameters to create a reduceBuffer */
export interface ReduceBufferOptions {
  device: OptParam<GPUDevice>;
  srcBuffer: OptParam<GPUBuffer>;
  destBuffer: OptParam<GPUBuffer>;
  binOp: OptParam<BinOp>;

  /** 'fuse' a wgsl function that runs before reduce */
  mapFn: OptParam<TBD>;

  // TODO consider an Iterator api instead?
  startOffset: OptParam<number>; // offset in bytes
  stride: OptParam<number>; // stride in bytes
}

export interface ReduceBuffer extends HostedShader {
  device(newDevice: GPUDevice): ReduceBuffer;
  device(): GPUDevice;
}

/** create a hosted shader that knows how to reduce GPUBuffers */
export function reduceBuffer(options: ReduceBufferOptions): ReduceBuffer {
  let { device, srcBuffer, destBuffer, binOp, mapFn, startOffset, stride } =
    options;

  function encode(encoder: GPUCommandEncoder): void {}

  function dispatch(): void {}

  const api = {
    device: (newDevice?: GPUDevice): ReduceBuffer | GPUDevice | undefined => {
      if (newDevice) {
        device = newDevice;
        return api as ReduceBuffer;
      } else {
        return derefOptParam(device);
      }
    },
    dispatch,
    encode,
  } as ReduceBuffer;

  return api;
}

function derefOptParam<T>(param: OptParam<T>, defaultValue?: T): T | undefined {
  if (typeof param === "function") {
    return (param as () => T)();
  }
  return param !== undefined ? param : defaultValue;
}
