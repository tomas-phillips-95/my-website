import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";
import { logicNot } from "@vueuse/math";

export function useIsMobile() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMobile = logicNot(breakpoints.greater("sm"));
  return { isMobile };
}
