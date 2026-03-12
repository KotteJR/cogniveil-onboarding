'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import { CHAPTERS } from '@/lib/questions';
import { formatNumber } from '@/lib/utils';
import ChapterHeader from './ChapterHeader';
import LoginGradientBackground from '@/components/effects/LoginGradientBackground';
import SplashCursor from '@/components/effects/SplashCursor';

interface Props {
  answers: FlowAnswers;
  onBack: () => void;
  onReset: () => void;
}

type SubmitState = 'idle' | 'submitting' | 'submitted';

function SummarySection({ num, title, rows }: {
  num: string;
  title: string;
  rows: Array<{ key: string; value: string | string[] | number }>;
}) {
  return (
    <div className="summary-section">
      <div className="summary-section-header">
        <span className="summary-section-num">{num}</span>
        <span style={{ color: 'var(--border)', fontSize: '8px' }}>·</span>
        <span className="summary-section-title">{title}</span>
      </div>
      {rows.map(row => {
        const val = Array.isArray(row.value)
          ? row.value.join(', ')
          : typeof row.value === 'number'
            ? formatNumber(row.value)
            : row.value;
        const empty = !val || val.trim() === '';
        return (
          <div key={row.key} className="summary-row">
            <div className="summary-key">{row.key}</div>
            <div className={`summary-value${empty ? ' empty' : ''}`}>{empty ? '—' : val}</div>
          </div>
        );
      })}
    </div>
  );
}

const stagger = { animate: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function Chapter10Summary({ answers, onBack, onReset }: Props) {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [mounted, setMounted] = useState(false);

  const { chapter1: c1, chapter2: c2, chapter3: c3, chapter4: c4, chapter5: c5,
          chapter6: c6, chapter7: c7, chapter8: c8, chapter9: c9 } = answers;

  const handleSubmit = () => {
    if (submitState !== 'idle') return;
    setSubmitState('submitting');
    window.setTimeout(() => setSubmitState('submitted'), 900);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (submitState === 'submitted') {
    if (!mounted) return null;

    return createPortal((
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          overflow: 'hidden',
          background: 'var(--gradient-color-1)',
        }}
      >
        <LoginGradientBackground />
        <SplashCursor
          SIM_RESOLUTION={96}
          DYE_RESOLUTION={768}
          DENSITY_DISSIPATION={4.2}
          VELOCITY_DISSIPATION={2.8}
          PRESSURE={0.08}
          CURL={1.2}
          SPLAT_RADIUS={0.14}
          SPLAT_FORCE={1600}
          COLOR_UPDATE_SPEED={4}
          COLOR_PALETTE={[
            [30 / 255, 58 / 255, 138 / 255],
            [48 / 255, 122 / 255, 240 / 255],
            [147 / 255, 197 / 255, 253 / 255],
            [209 / 255, 213 / 255, 219 / 255],
            [156 / 255, 163 / 255, 175 / 255],
          ]}
          COLOR_INTENSITY={0.7}
          OPACITY={0.14}
          Z_INDEX={122}
        />
        <div
          style={{
            position: 'relative',
            zIndex: 130,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            textAlign: 'center',
            padding: '32px 20px',
            maxWidth: '760px',
          }}
        >
          <div style={{
            width: '58px',
            height: '58px',
            borderRadius: '999px',
            background: 'rgba(48,122,240,0.12)',
            border: '1.5px solid rgba(48,122,240,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            fontSize: '28px',
            fontWeight: 700,
          }}>
            ✓
          </div>
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--cv-font-sans, system-ui)',
            fontSize: 'clamp(28px, 4vw, 42px)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
          }}>
            Thanks for submitting
          </h2>
          <p style={{
            margin: 0,
            maxWidth: '620px',
            fontFamily: 'var(--cv-font-sans, system-ui)',
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}>
            We received your submission successfully. We will be in touch shortly with next steps.
          </p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button type="button" className="btn-ghost" onClick={onReset}>
              Start Over
            </button>
          </div>
        </div>
      </motion.div>
    ), document.body);
  }

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[9]} />

      <motion.div variants={stagger} initial="initial" animate="animate" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        <motion.div variants={fadeUp}>
          <SummarySection num="01" title="Context" rows={[
            { key: 'Company Name',         value: c1.companyName },
            { key: 'Point of Contact',     value: c1.pointOfContact },
            { key: 'Industry / Vertical',   value: [...c1.industries, ...(c1.industryOther ? [`Other: ${c1.industryOther}`] : [])] },
            { key: 'Department / Function', value: [...c1.departments, ...(c1.departmentOther ? [`Other: ${c1.departmentOther}`] : [])] },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="02" title="User Volume" rows={[
            { key: 'Total Potential Users', value: c2.totalUsers },
            { key: 'Heavy Users (hourly)',   value: c2.heavyUsers },
            { key: 'Mid Users (daily)',      value: c2.midUsers },
            { key: 'Light Users (weekly)',   value: c2.lightUsers },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="03" title="Access & Identity" rows={[
            { key: 'RBAC Required',       value: c3.rbac },
            { key: 'SSO Providers',       value: [...c3.ssoProviders, ...(c3.ssoProviderOther ? [`Other: ${c3.ssoProviderOther}`] : [])] },
            { key: 'SSO Integration',     value: c3.ssoIntegration },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="04" title="Knowledge Base" rows={[
            { key: 'Estimated Size',       value: c4.kbSize },
            { key: 'Document Formats',     value: [...c4.docFormats, ...(c4.docFormatOther ? [`Other: ${c4.docFormatOther}`] : [])] },
            { key: 'Source Type',          value: c4.sourceType },
            { key: 'Integration Platforms',value: [...c4.integrationPlatforms, ...(c4.integrationPlatformOther ? [`Other: ${c4.integrationPlatformOther}`] : [])] },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="05" title="Integrations & Workflows" rows={[
            { key: 'Live API Integrations', value: c5.apiIntegrations },
            { key: 'API Description',       value: c5.apiDescription },
            { key: 'Human-in-the-Loop',     value: c5.hitl },
            { key: 'Async Approvals',       value: c5.asyncApproval },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="06" title="Knowledge Management" rows={[
            { key: 'Versioning Strategy',  value: c6.versioning },
            { key: 'Custom Parameter',     value: c6.versioningCustom },
            { key: 'Version Surfacing',    value: c6.versionSurface },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="07" title="Channels & Support" rows={[
            { key: 'Platform Mode',            value: c7.deploymentMode },
            { key: 'Post-Deploy Support',      value: c7.postDeploymentSupport },
            { key: 'MS Teams Bot',             value: c7.teamsBot },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="08" title="Oversight & Compliance" rows={[
            { key: 'Traceability',         value: c8.traceability },
            { key: 'Supervisory Review',   value: c8.supervisoryReview },
            { key: 'Compliance Frameworks', value: [...c8.complianceFrameworks, ...(c8.complianceOther ? [`Other: ${c8.complianceOther}`] : [])] },
            { key: 'Audit Cadence',        value: c8.auditCadence },
          ]} />
        </motion.div>

        <motion.div variants={fadeUp}>
          <SummarySection num="09" title="Deployment" rows={[
            { key: 'Infrastructure Model', value: c9.deploymentModel },
          ]} />
        </motion.div>

        {/* Action buttons */}
        <motion.div variants={fadeUp} style={{ paddingTop: '24px', borderTop: '1px solid var(--border)', marginTop: '12px' }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button
              type="button"
              className="btn-primary"
              disabled={submitState !== 'idle'}
              onClick={handleSubmit}
            >
              {submitState === 'submitting' ? 'Submitting...' : 'Submit'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              className="btn-ghost"
              onClick={onBack}
            >
              <span style={{ fontSize: '14px' }}>←</span>
              Back
            </button>
            <button
              type="button"
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: 'var(--cv-font-mono, monospace)',
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 200ms',
              }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              onClick={onReset}
            >
              Start Over
            </button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
