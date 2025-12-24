import posthog from "posthog-js";

type ViewerMode = "recruiter" | "manager" | "engineer";

export const analytics = {
  resumeDownload: (ctaLocation: string) =>
    posthog.capture("resume_download", { cta_location: ctaLocation }),

  emailClick: (ctaLocation: string) =>
    posthog.capture("email_click", { cta_location: ctaLocation }),

  outboundClick: (domain: string, ctaLocation: string) =>
    posthog.capture("outbound_click", {
      outbound_domain: domain,
      cta_location: ctaLocation
    }),

  caseStudyOpen: (slug: string, ctaLocation: string) =>
    posthog.capture("case_study_open", {
      case_study_slug: slug,
      cta_location: ctaLocation
    }),

  navClick: (ctaLocation: string) =>
    posthog.capture("nav_click", { cta_location: ctaLocation }),

  modeSwitch: (mode: ViewerMode) => posthog.capture("mode_switch", { mode })
};
