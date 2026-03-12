import { FlowAnswers } from './types';

interface ChapterProgress {
  answered: number;
  total: number;
  ratio: number;
  isComplete: boolean;
}

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function hasSelection(values: string[], otherValue?: string): boolean {
  if (values.length === 0) return false;
  if (values.includes('Other')) {
    return hasText(otherValue ?? '');
  }
  return true;
}

function normalizeProgress(answered: number, total: number): ChapterProgress {
  const safeTotal = Math.max(1, total);
  const clampedAnswered = Math.min(Math.max(answered, 0), safeTotal);
  return {
    answered: clampedAnswered,
    total: safeTotal,
    ratio: clampedAnswered / safeTotal,
    isComplete: clampedAnswered >= safeTotal,
  };
}

export function getChapterProgress(chapter: number, answers: FlowAnswers): ChapterProgress {
  switch (chapter) {
    case 1: {
      const a = answers.chapter1;
      const answered = Number(hasText(a.companyName))
        + Number(hasText(a.pointOfContact))
        + Number(hasSelection(a.industries, a.industryOther))
        + Number(hasSelection(a.departments, a.departmentOther));
      return normalizeProgress(answered, 4);
    }
    case 2: {
      const a = answers.chapter2;
      const totalUsersAnswered = a.totalUsers > 0;
      const breakdownAnswered = (a.heavyUsers + a.midUsers + a.lightUsers) > 0;
      return normalizeProgress(Number(totalUsersAnswered) + Number(breakdownAnswered), 2);
    }
    case 3: {
      const a = answers.chapter3;
      const answered = Number(a.rbac !== '')
        + Number(hasSelection(a.ssoProviders, a.ssoProviderOther))
        + Number(a.ssoIntegration !== '');
      return normalizeProgress(answered, 3);
    }
    case 4: {
      const a = answers.chapter4;
      const sourceTypeAnswered = a.sourceType !== '';
      const needsPlatforms = a.sourceType === 'integration';
      const integrationPlatformsAnswered = needsPlatforms
        ? hasSelection(a.integrationPlatforms, a.integrationPlatformOther)
        : true;
      const answered = Number(a.kbSize !== '')
        + Number(hasSelection(a.docFormats, a.docFormatOther))
        + Number(sourceTypeAnswered)
        + Number(integrationPlatformsAnswered);
      return normalizeProgress(answered, 4);
    }
    case 5: {
      const a = answers.chapter5;
      const apiAnswered = a.apiIntegrations !== '';
      const needsApiDescription = a.apiIntegrations === 'yes';
      const apiDescriptionAnswered = needsApiDescription ? hasText(a.apiDescription) : true;
      const answered = Number(apiAnswered)
        + Number(apiDescriptionAnswered)
        + Number(a.hitl !== '')
        + Number(a.asyncApproval !== '');
      return normalizeProgress(answered, 4);
    }
    case 6: {
      const a = answers.chapter6;
      const versioningAnswered = a.versioning !== '';
      const needsCustom = a.versioning === 'custom';
      const customAnswered = needsCustom ? hasText(a.versioningCustom) : true;
      const answered = Number(versioningAnswered)
        + Number(customAnswered)
        + Number(a.versionSurface.length > 0);
      return normalizeProgress(answered, 3);
    }
    case 7: {
      const a = answers.chapter7;
      const answered = Number(a.deploymentMode !== '')
        + Number(a.postDeploymentSupport !== '')
        + Number(a.teamsBot !== '');
      return normalizeProgress(answered, 3);
    }
    case 8: {
      const a = answers.chapter8;
      const answered = Number(a.traceability !== '')
        + Number(a.supervisoryReview !== '')
        + Number(hasSelection(a.complianceFrameworks, a.complianceOther))
        + Number(a.auditCadence !== '');
      return normalizeProgress(answered, 4);
    }
    case 9: {
      const a = answers.chapter9;
      return normalizeProgress(Number(a.deploymentModel !== ''), 1);
    }
    default:
      return normalizeProgress(1, 1);
  }
}
