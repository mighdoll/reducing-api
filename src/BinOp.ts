import type { TBD } from "./HostedShader.ts";

export interface BinOp {
  elementType: string; // e.g. 'f32', 'i32', 'u32', 'MyStruct'
  binOpFn: TBD; // returns wgsl code for binary operation
  identityFn: TBD; // returns wgsl code for identity value
}

/* making a bin op function 

an example binop function would be sum two f32 values 

  fn sum(a: f32, b: f32) -> f32 {
    return a + b;
  }

it's be nice to write it generically:

  fun sum<T>(a: T, b: T) -> T {
    return a + b;
  }

matching the generic types is an interesting challenge - in this case the types
are determined by the host code, not in the shader.
- ideally the same shader code for e.g. sum, could be used by shader code as well.

making an identity function is is similar to a binOp function.
- but note that the types must match up

*/



