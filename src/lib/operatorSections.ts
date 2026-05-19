export type OperatorSectionId = "trends" | "handbook" | "activity" | "trust";

export const OPERATOR_SECTIONS: {
  id: OperatorSectionId;
  label: string;
}[] = [
  { id: "activity", label: "Activity" },
  { id: "handbook", label: "Handbook" },
  { id: "trends", label: "Guardian Question Trends" },
  { id: "trust", label: "Trust rules" },
];
