export interface ChapterMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
  badge?: string;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 1,  slug: 'context',              title: 'Context',              subtitle: 'Your organization and use case'         },
  { id: 2,  slug: 'user-volume',          title: 'User Volume',          subtitle: 'Platform engagement & scale'            },
  { id: 3,  slug: 'access-identity',      title: 'Access & Identity',    subtitle: 'Authentication and permissions'         },
  { id: 4,  slug: 'knowledge-base',       title: 'Knowledge Base',       subtitle: 'Content scope and data sources'         },
  { id: 5,  slug: 'integrations',         title: 'Integrations',         subtitle: 'External systems and workflows'         },
  { id: 6,  slug: 'knowledge-management', title: 'Knowledge Management', subtitle: 'Document versioning and lifecycle'      },
  { id: 7,  slug: 'channels-support',     title: 'Channels & Support',   subtitle: 'Deployment surface and enablement'      },
  { id: 8,  slug: 'oversight-compliance', title: 'Oversight',            subtitle: 'Compliance and audit requirements'      },
  { id: 9,  slug: 'deployment',           title: 'Deployment',           subtitle: 'Infrastructure and hosting model'       },
  { id: 10, slug: 'summary',              title: 'Summary',              subtitle: 'Review and submit your requirements to CogniVeil'  },
];

// ─── Chapter 1 ────────────────────────────────────────────────────────────────

export const INDUSTRY_OPTIONS: SelectOption[] = [
  { value: 'Healthcare',    label: 'Healthcare'    },
  { value: 'Legal',         label: 'Legal'         },
  { value: 'Finance',       label: 'Finance'       },
  { value: 'Logistics',     label: 'Logistics'     },
  { value: 'Retail',        label: 'Retail'        },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Government',    label: 'Government'    },
  { value: 'Other',         label: 'Other'         },
];

export const DEPARTMENT_OPTIONS: SelectOption[] = [
  { value: 'Operations',        label: 'Operations'        },
  { value: 'HR',                label: 'HR'                },
  { value: 'Legal',             label: 'Legal'             },
  { value: 'Customer Support',  label: 'Customer Support'  },
  { value: 'IT',                label: 'IT'                },
  { value: 'Sales',             label: 'Sales'             },
  { value: 'R&D',               label: 'R&D'               },
  { value: 'Other',             label: 'Other'             },
];

// ─── Chapter 2 ────────────────────────────────────────────────────────────────

export const USER_VOLUME_LABELS = {
  totalUsers:  { label: 'Total Potential Users',  hint: 'Estimated addressable users across all departments' },
  heavyUsers:  { label: 'Heavy Users',            hint: 'Hourly platform usage' },
  midUsers:    { label: 'Mid Users',              hint: 'A few times per day' },
  lightUsers:  { label: 'Light Users',            hint: 'Once or twice per week' },
};

// ─── Chapter 3 ────────────────────────────────────────────────────────────────

export const RBAC_OPTIONS: SelectOption[] = [
  { value: 'yes',    label: 'Yes',    description: 'Role-based access control is required' },
  { value: 'no',     label: 'No',     description: 'All users share the same access level' },
  { value: 'unsure', label: 'Unsure', description: 'Requirements are still being evaluated' },
];

export const SSO_PROVIDER_OPTIONS: SelectOption[] = [
  { value: 'Okta',              label: 'Okta'              },
  { value: 'Azure AD',          label: 'Azure AD'          },
  { value: 'Google Workspace',  label: 'Google Workspace'  },
  { value: 'ADFS',              label: 'ADFS'              },
  { value: 'None',              label: 'None'              },
  { value: 'Other',             label: 'Other'             },
];

export const SSO_INTEGRATION_OPTIONS: SelectOption[] = [
  { value: 'yes',   label: 'Yes',   description: 'SSO integration is a requirement'  },
  { value: 'no',    label: 'No',    description: 'Local auth or basic credentials OK' },
  { value: 'maybe', label: 'Maybe', description: 'Depends on security review outcome' },
];

export const RBAC_TOOLTIP = 'Role-Based Access Control (RBAC) restricts platform features and data visibility based on a user\'s assigned role — e.g., admin, analyst, viewer.';

// ─── Chapter 4 ────────────────────────────────────────────────────────────────

export const KB_SIZE_OPTIONS: SelectOption[] = [
  { value: '<100MB',    label: '<100 MB'   },
  { value: '100MB-1GB', label: '100 MB–1 GB' },
  { value: '1-10GB',    label: '1–10 GB'  },
  { value: '10-100GB',  label: '10–100 GB' },
  { value: '>100GB',    label: '>100 GB'  },
];

export const DOC_FORMAT_OPTIONS: SelectOption[] = [
  { value: 'PDF',               label: 'PDF'              },
  { value: 'Word/DOCX',         label: 'Word / DOCX'      },
  { value: 'Excel',             label: 'Excel'            },
  { value: 'Markdown',          label: 'Markdown'         },
  { value: 'HTML',              label: 'HTML'             },
  { value: 'SharePoint Pages',  label: 'SharePoint Pages' },
  { value: 'Confluence',        label: 'Confluence'       },
  { value: 'Notion',            label: 'Notion'           },
  { value: 'Other',             label: 'Other'            },
];

export const SOURCE_TYPE_OPTIONS: SelectOption[] = [
  {
    value: 'folder',
    label: 'Folder-Based',
    description: 'Upload documents directly as files or ZIP archives',
    icon: 'folder',
  },
  {
    value: 'integration',
    label: 'Platform Integration',
    description: 'Sync content from connected cloud platforms via API',
    icon: 'integration',
  },
];

export const INTEGRATION_PLATFORM_OPTIONS: SelectOption[] = [
  { value: 'SharePoint',    label: 'SharePoint'    },
  { value: 'Confluence',    label: 'Confluence'    },
  { value: 'Google Drive',  label: 'Google Drive'  },
  { value: 'Notion',        label: 'Notion'        },
  { value: 'Dropbox',       label: 'Dropbox'       },
  { value: 'Other',         label: 'Other'         },
];

// ─── Chapter 5 ────────────────────────────────────────────────────────────────

export const API_INTEGRATION_OPTIONS: SelectOption[] = [
  { value: 'yes', label: 'Yes', description: 'Live data from external systems will feed AI workflows' },
  { value: 'no',  label: 'No',  description: 'Knowledge base is self-contained with no live data pulls' },
];

export const HITL_OPTIONS: SelectOption[] = [
  { value: 'yes',  label: 'Yes',          description: 'All workflows require human review before action'   },
  { value: 'no',   label: 'No',           description: 'Fully automated execution is acceptable'            },
  { value: 'some', label: 'Some of them', description: 'Specific high-risk workflows require human sign-off' },
];

export const ASYNC_APPROVAL_OPTIONS: SelectOption[] = [
  { value: 'yes',    label: 'Yes',    description: 'Approval queues with delayed action execution'     },
  { value: 'no',     label: 'No',     description: 'Synchronous execution only'                        },
  { value: 'unsure', label: 'Unsure', description: 'Workflow design is still being determined'          },
];

export const HITL_TOOLTIP = 'Human-in-the-Loop (HITL) means an AI workflow pauses at a defined step to await review, approval, or correction by a human operator before proceeding.';

// ─── Chapter 6 ────────────────────────────────────────────────────────────────

export const VERSIONING_OPTIONS: SelectOption[] = [
  { value: 'overwrite', label: 'Overwrite',          description: 'Same filename replaces the previous version with no history retained' },
  { value: 'timestamp', label: 'Version with Timestamp', description: 'Each upload creates an immutable version with a date/time stamp'   },
  { value: 'custom',    label: 'Custom Parameter',   description: 'Define a bespoke versioning scheme (e.g. v1.2.3 or fiscal quarter)'  },
];

export const VERSION_SURFACE_OPTIONS: SelectOption[] = [
  { value: 'Highlighted diff view', label: 'Highlighted Diff View' },
  { value: 'Version tags',          label: 'Version Tags'          },
  { value: 'Changelog entry',       label: 'Changelog Entry'       },
  { value: 'Not needed',            label: 'Not Needed'            },
];

// ─── Chapter 7 ────────────────────────────────────────────────────────────────

export const DEPLOYMENT_MODE_OPTIONS: SelectOption[] = [
  { value: 'chat',      label: 'Chat Only',       description: 'Standard conversational AI interface for end-user Q&A and retrieval' },
  { value: 'workflows', label: 'Workflows Only',   description: 'Automated multi-step AI processes triggered by events or schedules'  },
  { value: 'both',      label: 'Chat + Workflows', description: 'Full platform — conversational interface plus background automation' },
];

export const POST_DEPLOYMENT_OPTIONS: SelectOption[] = [
  { value: 'yes', label: 'Yes',  description: 'Dedicated support for building internal AI workflow tooling post-launch' },
  { value: 'no',  label: 'No',   description: 'Team has sufficient internal capability to manage independently'         },
  { value: 'tbd', label: 'TBD',  description: 'To be assessed after initial deployment and user adoption phase'        },
];

export const TEAMS_BOT_OPTIONS: SelectOption[] = [
  { value: 'yes',   label: 'Yes',   description: 'CogniVeil embedded directly into Microsoft Teams as a bot'     },
  { value: 'no',    label: 'No',    description: 'Web-based access is sufficient'                                 },
  { value: 'maybe', label: 'Maybe', description: 'Depends on internal Teams adoption and IT approval process'    },
];

// ─── Chapter 8 ────────────────────────────────────────────────────────────────

export const TRACEABILITY_OPTIONS: SelectOption[] = [
  { value: 'yes', label: 'Yes', description: 'Every user interaction is logged with full audit trail'  },
  { value: 'no',  label: 'No',  description: 'General usage metrics are sufficient'                    },
];

export const SUPERVISORY_REVIEW_OPTIONS: SelectOption[] = [
  { value: 'yes',    label: 'Yes',    description: 'Managers can review AI execution logs and outputs'         },
  { value: 'no',     label: 'No',     description: 'Oversight handled through system-level logs only'          },
  { value: 'unsure', label: 'Unsure', description: 'Governance model for AI oversight is yet to be defined'    },
];

export const COMPLIANCE_FRAMEWORK_OPTIONS: SelectOption[] = [
  { value: 'SOC 2',     label: 'SOC 2'     },
  { value: 'HIPAA',     label: 'HIPAA'     },
  { value: 'GDPR',      label: 'GDPR'      },
  { value: 'ISO 27001', label: 'ISO 27001' },
  { value: 'HITRUST',   label: 'HITRUST'   },
  { value: 'None',      label: 'None'      },
  { value: 'Other',     label: 'Other'     },
];

export const AUDIT_CADENCE_OPTIONS: SelectOption[] = [
  { value: 'none',       label: 'None',          description: 'No scheduled audit cadence required'                   },
  { value: '6months',    label: 'Every 6 Months', description: 'Semi-annual review of AI activity logs'               },
  { value: 'annually',   label: 'Annually',       description: 'Annual compliance audit against defined framework'     },
  { value: 'adhoc',      label: 'Ad Hoc',         description: 'Audits triggered by incidents or regulatory requests'  },
];

// ─── Chapter 9 ────────────────────────────────────────────────────────────────

export const DEPLOYMENT_MODEL_OPTIONS: SelectOption[] = [
  {
    value: 'cloud',
    label: 'CogniVeil Cloud',
    description: 'Fully managed SaaS. Zero infrastructure overhead. Fastest time to value.',
    icon: 'cloud',
    badge: 'Recommended · Lowest Cost',
  },
  {
    value: 'hybrid',
    label: 'Hybrid Deployment',
    description: 'Core AI services in CogniVeil Cloud; sensitive data processing on customer infrastructure.',
    icon: 'hybrid',
    badge: 'Moderate Setup Impact',
  },
  {
    value: 'onprem',
    label: 'On-Premise',
    description: 'Full stack deployed entirely within the customer\'s own data center or private cloud.',
    icon: 'server',
    badge: 'Significant Cost & Timeline Impact',
  },
];

export const HYBRID_WARNING = 'This selection significantly impacts setup cost and timeline. Your sales engineer will discuss infrastructure requirements and cost implications in detail during the next call.';
export const ONPREM_WARNING = 'On-Premise deployment requires dedicated infrastructure provisioning, security hardening, and extended implementation timelines. This will significantly affect project scope and pricing. Your sales engineer will discuss this in detail.';
