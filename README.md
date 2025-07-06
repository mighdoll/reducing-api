# Sketching a WebGPU for shaders like ReduceBuffer

### HostedShader API
- [ ] What does the 'lifecycle' api look like in TypeScript?
- [ ] How is conditional compilation handled? e.g. for subgroups
- [ ] How are generics handled?
- [ ] How is reconfiguration handled?
- [ ] What does the API look like in Rust?
- [ ] What changes for TypeGPU?

### Plugin user functions
- [ ] How do javascript applications 'plug in' functions, e.g. to map before reduce?
- [ ] How can we optionally support types for 
- [ ] How does this integrate with wesl reflection
- [ ] How does this integrate with typegpu
- [ ] How does this integrate with 'vanilla' wgsl strings

### WESL code
- [ ] How do you write workgroupReduce to share with other shader authors?
- [ ] How do you write ReduceBuffer? generics? conditions? binop?

```ts
import { perlin2d } from '@typegpu/noise';

const hello = tgpu.fragmentFn({})(() => {
  const noise = perlin2d.sample(d.vec2f(1.1, 2.2));
});

const cache = perlin2d.createCache();

const pipeline = root
  .with(perlin2d.getJunctionGradientSlot, cache.getJunctionGradient)
  .withVertex(hello, { ... })
  .withFragment(hello, { ... })
  .createPipeline();

root.unwrap(pipeline); // => GPUPipeline
```

```ts
const asd = tgpu.fn()(() => {
  // ...
});


```

slots allow configuring plugin functions/variables for a HostedShader
. via `with` syntax
. at a higher level then just the definition of the particular shader,
bubbles up like 'context'.

const assembly = runsASequenceOfHostedShaders([setup, reduceBuffer, render, ]);
assembly.with(vertexListbuffer.mapFnSlot, convertToWorldSpace)



```ts
import some from './shader.wesl?typegpu'


```

```ts
const destBuffer = root.createBuffer(d.arrayOf(d.f32, 512)).$usage('storage');

const reduce = Reduce({
  destBuffer: root.unwrap(destBuffer),
});

const values = await destBuffer.read();
//    ^? number[]
```


reduce.with(reduce.mapFnSlot, myMapFn)