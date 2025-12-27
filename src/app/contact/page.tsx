import React from "react";
import { pageMetadata } from "@/lib/seo/metadata";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Let's collaborate on building high-performance web applications.",
  canonicalPath: "/contact"
});

export default function ContactPage() {
  return <ContactPageContent />;
}
