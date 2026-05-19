import { CENTER_NAME } from "./seed";
import type { QuestionTrend } from "./types";

export const ILLNESS_HANDBOOK_APPEND =
  "Please contact the center before drop-off if your child has symptoms such as rash, pink eye, persistent cough, vomiting, diarrhea, or other potentially contagious symptoms. Staff will help determine whether care is appropriate that day.";

export function getHolidayReminderDraft(): { title: string; message: string } {
  return {
    title: "Veterans Day closure reminder",
    message: `${CENTER_NAME} will be closed on Veterans Day, Monday November 11. Classes will resume Tuesday at 7:30 AM.

Thanks,
${CENTER_NAME}`,
  };
}

export function getLunchUpdateDraft(): { title: string; message: string } {
  return {
    title: "Lunch update",
    message: `Today's emergency lunch option is turkey sandwich, fruit cup, carrots, and milk. If your child has allergies or dietary restrictions, please contact the front desk before lunch service.

Thanks,
${CENTER_NAME}`,
  };
}

export function getDraftForTrend(trend: QuestionTrend): {
  title: string;
  message: string;
} {
  if (trend.actionType === "draft_reminder") {
    return getHolidayReminderDraft();
  }
  if (trend.actionType === "draft_update") {
    return getLunchUpdateDraft();
  }
  return {
    title: `${trend.title} update`,
    message: `Update from ${CENTER_NAME} regarding ${trend.title.toLowerCase()}.

Thanks,
${CENTER_NAME}`,
  };
}
