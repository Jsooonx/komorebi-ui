import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function NestedAccordionCard({ minimal = false }: { minimal?: boolean }) {
  const accordionData = [
    {
      id: "project-settings",
      title: "Project Settings",
      subs: [
        {
          id: "general-config",
          title: "General Configuration",
          details: [
            "Project Display Name: Production API Server",
            "Routing Domain: api-prod.komorebi.dev",
            "Server Region: US-East (N. Virginia)"
          ]
        },
        {
          id: "advanced-prop",
          title: "Advanced Properties",
          details: [
            "Build Timeout: 1200 seconds",
            "Node Version Compatibility: >= 18.0.0",
            "Environment Mode: production"
          ]
        }
      ]
    },
    {
      id: "user-access",
      title: "User Access Control",
      subs: [
        {
          id: "role-def",
          title: "Role Definitions",
          details: [
            "Administrator: Unlimited read/write access",
            "Developer: Read/write on dev, read-only on production",
            "Viewer: Read-only on all environments"
          ]
        },
        {
          id: "security-policies",
          title: "Security Policies",
          details: [
            "Multi-Factor Authentication (MFA): Enforced",
            "IP Allowlist Filtering: Enabled",
            "Session Inactivity Timeout: 15 minutes"
          ]
        }
      ]
    },
    {
      id: "api-credentials",
      title: "Developer Credentials",
      subs: [
        {
          id: "access-tokens",
          title: "Access Tokens",
          details: [
            "Primary Secret Key: kms_live_...9f2a",
            "Token Lifespan Limit: 90 days rotation",
            "Permissions Scope: read:analytics, write:deploy"
          ]
        },
        {
          id: "webhook-triggers",
          title: "Webhook Triggers",
          details: [
            "Deployment State Changes: active",
            "Database Migration Events: active",
            "Authentication Failures: active"
          ]
        }
      ]
    }
  ];

  const cssVariables = {
    "--popover": "#0c0c0e",
    "--popover-foreground": "#ffffff",
    "--border": "rgba(255, 255, 255, 0.05)",
  } as React.CSSProperties;

  const content = (
    <div className="w-full flex flex-col justify-center p-6 h-full">
      {/* Single large container wrapping all main accordions */}
      <div className="border border-white/5 bg-white/[0.01] rounded-lg overflow-hidden divide-y divide-white/5 w-full">
        <Accordion type="single" collapsible className="w-full">
          {accordionData.map((mainItem) => (
            <AccordionItem
              key={mainItem.id}
              value={mainItem.id}
              className="border-none px-4"
            >
              <AccordionTrigger className="hover:no-underline select-none text-xs font-semibold text-white/90 py-3.5">
                {mainItem.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-1">
                {/* Nested Accordion containing 2 sub-accordions */}
                <Accordion type="multiple" className="w-full space-y-2 mt-1">
                  {mainItem.subs.map((subItem) => (
                    <AccordionItem
                      key={subItem.id}
                      value={subItem.id}
                      className="border border-white/[0.03] rounded-md bg-black/20 overflow-hidden"
                    >
                      <AccordionTrigger className="px-3 py-2 text-left hover:no-underline select-none text-[11px] font-medium text-white/70">
                        {subItem.title}
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-2.5 pt-0.5 text-[10px] text-white/40 leading-relaxed">
                        <div className="space-y-1.5 pl-1">
                          {subItem.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-white/20" />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );

  if (minimal) {
    return (
      <div
        className="w-full h-full overflow-y-auto scrollbar-none select-none relative bg-[#0e0e0e]"
        style={cssVariables}
      >
        {content}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[400px] rounded-lg bg-[#0e0e0e] border border-white/5 overflow-hidden flex flex-col select-none group"
      style={cssVariables}
    >
      {content}
    </div>
  );
}
