export interface Chapter1Answers {
  companyName: string;
  pointOfContact: string;
  industries: string[];
  industryOther: string;
  departments: string[];
  departmentOther: string;
}

export interface Chapter2Answers {
  totalUsers: number;
  heavyUsers: number;
  midUsers: number;
  lightUsers: number;
}

export interface Chapter3Answers {
  rbac: 'yes' | 'no' | 'unsure' | '';
  ssoProviders: string[];
  ssoProviderOther: string;
  ssoIntegration: 'yes' | 'no' | 'maybe' | '';
}

export interface Chapter4Answers {
  kbSize: string;
  docFormats: string[];
  docFormatOther: string;
  sourceType: 'folder' | 'integration' | '';
  integrationPlatforms: string[];
  integrationPlatformOther: string;
}

export interface Chapter5Answers {
  apiIntegrations: 'yes' | 'no' | '';
  apiDescription: string;
  hitl: 'yes' | 'no' | 'some' | '';
  asyncApproval: 'yes' | 'no' | 'unsure' | '';
}

export interface Chapter6Answers {
  versioning: 'overwrite' | 'timestamp' | 'custom' | '';
  versioningCustom: string;
  versionSurface: string[];
}

export interface Chapter7Answers {
  deploymentMode: 'chat' | 'workflows' | 'both' | '';
  postDeploymentSupport: 'yes' | 'no' | 'tbd' | '';
  teamsBot: 'yes' | 'no' | 'maybe' | '';
}

export interface Chapter8Answers {
  traceability: 'yes' | 'no' | '';
  supervisoryReview: 'yes' | 'no' | 'unsure' | '';
  complianceFrameworks: string[];
  complianceOther: string;
  auditCadence: 'none' | '6months' | 'annually' | 'adhoc' | '';
}

export interface Chapter9Answers {
  deploymentModel: 'cloud' | 'hybrid' | 'onprem' | '';
}

export interface FlowAnswers {
  chapter1: Chapter1Answers;
  chapter2: Chapter2Answers;
  chapter3: Chapter3Answers;
  chapter4: Chapter4Answers;
  chapter5: Chapter5Answers;
  chapter6: Chapter6Answers;
  chapter7: Chapter7Answers;
  chapter8: Chapter8Answers;
  chapter9: Chapter9Answers;
}

export interface FlowState {
  currentChapter: number;
  direction: 1 | -1;
  answers: FlowAnswers;
}

export const defaultAnswers: FlowAnswers = {
  chapter1: { companyName: '', pointOfContact: '', industries: [], industryOther: '', departments: [], departmentOther: '' },
  chapter2: { totalUsers: 50, heavyUsers: 0, midUsers: 0, lightUsers: 0 },
  chapter3: { rbac: '', ssoProviders: [], ssoProviderOther: '', ssoIntegration: '' },
  chapter4: { kbSize: '', docFormats: [], docFormatOther: '', sourceType: '', integrationPlatforms: [], integrationPlatformOther: '' },
  chapter5: { apiIntegrations: '', apiDescription: '', hitl: '', asyncApproval: '' },
  chapter6: { versioning: '', versioningCustom: '', versionSurface: [] },
  chapter7: { deploymentMode: '', postDeploymentSupport: '', teamsBot: '' },
  chapter8: { traceability: '', supervisoryReview: '', complianceFrameworks: [], complianceOther: '', auditCadence: '' },
  chapter9: { deploymentModel: '' },
};
