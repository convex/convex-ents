import { expect, test } from "vitest";
import { Id } from "./_generated/dataModel";
import {
  EntPatchValue,
  EntReplaceValue,
  EntWriter,
  MutationCtx,
  QueryCtx,
} from "./types";

// Check that MutationCtx extends QueryCtx
export function mutable(ctx: MutationCtx) {
  function immutable(ctx: QueryCtx) {
    return ctx.table("users").firstX();
  }

  return immutable(ctx);
}

// Check that the replace/patch value types can be used to type helpers
export function replaceUser(
  user: EntWriter<"users">,
  value: EntReplaceValue<"users">,
) {
  return user.replace(value);
}

export function patchUser(
  user: EntWriter<"users">,
  value: EntPatchValue<"users">,
) {
  return user.patch(value);
}

export function replaceUserViaPromise(
  ctx: MutationCtx,
  id: Id<"users">,
  value: EntReplaceValue<"users">,
) {
  return ctx.table("users").getX(id).replace(value);
}

export function patchUserViaPromise(
  ctx: MutationCtx,
  id: Id<"users">,
  value: EntPatchValue<"users">,
) {
  return ctx.table("users").getX(id).patch(value);
}

// Check that the value types are exactly the argument types of replace/patch,
// including many:many edges
type Equals<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
function assertType<T extends true>(): T | undefined {
  return undefined;
}
assertType<
  Equals<EntReplaceValue<"users">, Parameters<EntWriter<"users">["replace"]>[0]>
>();
assertType<
  Equals<EntPatchValue<"users">, Parameters<EntWriter<"users">["patch"]>[0]>
>();
assertType<
  Equals<EntReplaceValue<"users">["friends"], Id<"users">[] | undefined>
>();
assertType<
  Equals<
    EntPatchValue<"users">["friends"],
    { add?: Id<"users">[]; remove?: Id<"users">[] } | undefined
  >
>();

test("placeholder", async () => {
  expect(true).toBeTruthy();
});
