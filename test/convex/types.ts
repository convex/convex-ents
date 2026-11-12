import { CustomCtx } from "convex-helpers/server/customFunctions";
import {
  GenericEnt,
  GenericEntPatchValue,
  GenericEntReplaceValue,
  GenericEntWriter,
} from "../../src";
import { TableNames } from "./_generated/dataModel";
import { mutation, query } from "./functions";
import { entDefinitions } from "./schema";

export type QueryCtx = CustomCtx<typeof query>;
export type MutationCtx = CustomCtx<typeof mutation>;

export type Ent<TableName extends TableNames> = GenericEnt<
  typeof entDefinitions,
  TableName
>;
export type EntWriter<TableName extends TableNames> = GenericEntWriter<
  typeof entDefinitions,
  TableName
>;
export type EntReplaceValue<TableName extends TableNames> =
  GenericEntReplaceValue<typeof entDefinitions, TableName>;
export type EntPatchValue<TableName extends TableNames> = GenericEntPatchValue<
  typeof entDefinitions,
  TableName
>;
