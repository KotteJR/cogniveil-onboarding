import { FlowAnswers } from './types';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function formatNumber(n: number): string {
  if (n >= 10000) return '10,000+';
  return n.toLocaleString();
}

export function generateJSON(answers: FlowAnswers): string {
  const payload = {
    context: {
      industries: answers.chapter1.industries,
      industryOther: answers.chapter1.industryOther || undefined,
      departments: answers.chapter1.departments,
      departmentOther: answers.chapter1.departmentOther || undefined,
    },
    userVolume: {
      totalPotentialUsers: answers.chapter2.totalUsers,
      breakdown: {
        heavy_hourly: answers.chapter2.heavyUsers,
        mid_daily: answers.chapter2.midUsers,
        light_weekly: answers.chapter2.lightUsers,
      },
    },
    accessAndIdentity: {
      rbacRequired: answers.chapter3.rbac,
      ssoProviders: answers.chapter3.ssoProviders,
      ssoProviderOther: answers.chapter3.ssoProviderOther || undefined,
      ssoIntegration: answers.chapter3.ssoIntegration,
    },
    knowledgeBase: {
      estimatedSize: answers.chapter4.kbSize,
      documentFormats: answers.chapter4.docFormats,
      documentFormatOther: answers.chapter4.docFormatOther || undefined,
      sourceType: answers.chapter4.sourceType,
      integrationPlatforms: answers.chapter4.integrationPlatforms.length ? answers.chapter4.integrationPlatforms : undefined,
      integrationPlatformOther: answers.chapter4.integrationPlatformOther || undefined,
    },
    integrationsAndWorkflows: {
      apiIntegrationsNeeded: answers.chapter5.apiIntegrations,
      apiDescription: answers.chapter5.apiDescription || undefined,
      humanInTheLoop: answers.chapter5.hitl,
      asyncApprovalProcesses: answers.chapter5.asyncApproval,
    },
    knowledgeManagement: {
      versioningStrategy: answers.chapter6.versioning,
      customVersioningParameter: answers.chapter6.versioningCustom || undefined,
      versionSurfaceMethods: answers.chapter6.versionSurface,
    },
    channelsAndSupport: {
      deploymentMode: answers.chapter7.deploymentMode,
      postDeploymentSupport: answers.chapter7.postDeploymentSupport,
      microsoftTeamsBot: answers.chapter7.teamsBot,
    },
    oversightAndCompliance: {
      interactionTraceability: answers.chapter8.traceability,
      supervisoryReview: answers.chapter8.supervisoryReview,
      complianceFrameworks: answers.chapter8.complianceFrameworks,
      complianceOther: answers.chapter8.complianceOther || undefined,
      auditCadence: answers.chapter8.auditCadence,
    },
    deployment: {
      model: answers.chapter9.deploymentModel,
    },
  };

  // Remove undefined keys for clean output
  return JSON.stringify(payload, (_, v) => v === undefined ? undefined : v, 2);
}

export function generateBrief(answers: FlowAnswers): string {
  const { chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7, chapter8, chapter9 } = answers;

  const lines: string[] = [
    '═══════════════════════════════════════════════════════════',
    '  COGNIVEIL  ·  CLIENT REQUIREMENTS BRIEF',
    '═══════════════════════════════════════════════════════════',
    '',
    '01 · CONTEXT',
    '─────────────────────────────────────────────────────────',
    `  Industry      ${chapter1.industries.join(', ') || '—'}${chapter1.industryOther ? ` (${chapter1.industryOther})` : ''}`,
    `  Department    ${chapter1.departments.join(', ') || '—'}${chapter1.departmentOther ? ` (${chapter1.departmentOther})` : ''}`,
    '',
    '02 · USER VOLUME',
    '─────────────────────────────────────────────────────────',
    `  Total Users   ${formatNumber(chapter2.totalUsers)}`,
    `  Heavy (hourly)    ${chapter2.heavyUsers}`,
    `  Mid (daily)       ${chapter2.midUsers}`,
    `  Light (weekly)    ${chapter2.lightUsers}`,
    '',
    '03 · ACCESS & IDENTITY',
    '─────────────────────────────────────────────────────────',
    `  RBAC Required      ${chapter3.rbac || '—'}`,
    `  SSO Providers      ${chapter3.ssoProviders.join(', ') || '—'}${chapter3.ssoProviderOther ? ` (${chapter3.ssoProviderOther})` : ''}`,
    `  SSO Integration    ${chapter3.ssoIntegration || '—'}`,
    '',
    '04 · KNOWLEDGE BASE',
    '─────────────────────────────────────────────────────────',
    `  Estimated Size     ${chapter4.kbSize || '—'}`,
    `  Document Formats   ${chapter4.docFormats.join(', ') || '—'}${chapter4.docFormatOther ? ` (${chapter4.docFormatOther})` : ''}`,
    `  Source Type        ${chapter4.sourceType || '—'}`,
  ];

  if (chapter4.integrationPlatforms.length) {
    lines.push(`  Platforms          ${chapter4.integrationPlatforms.join(', ')}${chapter4.integrationPlatformOther ? ` (${chapter4.integrationPlatformOther})` : ''}`);
  }

  lines.push(
    '',
    '05 · INTEGRATIONS & WORKFLOWS',
    '─────────────────────────────────────────────────────────',
    `  API Integrations   ${chapter5.apiIntegrations || '—'}`,
  );

  if (chapter5.apiDescription) {
    lines.push(`  API Description    ${chapter5.apiDescription}`);
  }

  lines.push(
    `  Human-in-the-Loop  ${chapter5.hitl || '—'}`,
    `  Async Approvals    ${chapter5.asyncApproval || '—'}`,
    '',
    '06 · KNOWLEDGE MANAGEMENT',
    '─────────────────────────────────────────────────────────',
    `  Versioning         ${chapter6.versioning || '—'}${chapter6.versioningCustom ? ` → ${chapter6.versioningCustom}` : ''}`,
    `  Version Surface    ${chapter6.versionSurface.join(', ') || '—'}`,
    '',
    '07 · CHANNELS & SUPPORT',
    '─────────────────────────────────────────────────────────',
    `  Deployment Mode        ${chapter7.deploymentMode || '—'}`,
    `  Post-Deploy Support    ${chapter7.postDeploymentSupport || '—'}`,
    `  MS Teams Bot           ${chapter7.teamsBot || '—'}`,
    '',
    '08 · OVERSIGHT & COMPLIANCE',
    '─────────────────────────────────────────────────────────',
    `  Traceability           ${chapter8.traceability || '—'}`,
    `  Supervisory Review     ${chapter8.supervisoryReview || '—'}`,
    `  Compliance Frameworks  ${chapter8.complianceFrameworks.join(', ') || '—'}${chapter8.complianceOther ? ` (${chapter8.complianceOther})` : ''}`,
    `  Audit Cadence          ${chapter8.auditCadence || '—'}`,
    '',
    '09 · DEPLOYMENT',
    '─────────────────────────────────────────────────────────',
    `  Model    ${chapter9.deploymentModel || '—'}`,
    '',
    '═══════════════════════════════════════════════════════════',
    '  Generated by CogniVeil Pre-Sales Flow',
    '═══════════════════════════════════════════════════════════',
  );

  return lines.join('\n');
}
