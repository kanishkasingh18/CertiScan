import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { initialSubmissions } from '../data/mockData';
import { PageHeader } from '../components/common/PageHeader';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { formatDate } from '../utils/formatters';
import {
  FileCheck2,
  AlertTriangle,
  UploadCloud,
  Clock,
  ArrowRight,
  FileText,
  ChevronRight,
  ShieldCheck,
  Lock,
  Sparkles,
  HelpCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [submissions] = useState(initialSubmissions);

  const latestSubmission = submissions[0];
  const flaggedDoc = latestSubmission?.documents?.find((d) => d.status === 'FLAGGED');

  return (
    <div className="space-y-8 font-sans">
      {/* Top Hero Banner with Floating Document Visual */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white shadow-2xl border border-slate-800 overflow-hidden">
        {/* Ambient Glow Circles */}
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -top-10 -right-10 pointer-events-none" />
        <div className="absolute w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl -bottom-10 -left-10 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Greeting & CTA */}
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Document Verification Gateway</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Welcome back, {user?.fullName || 'Alex Johnson'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Submit required documents for your application purpose, monitor verification lifecycle stages, or resolve flagged items.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link to="/upload">
                <Button variant="primary" size="md" icon={UploadCloud}>
                  Start New Verification
                </Button>
              </Link>
              <Link to="/history">
                <Button variant="outline" size="md" className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800">
                  View History
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Document Seal Card */}
          <div className="lg:col-span-4 hidden lg:flex justify-end">
            <div className="p-4 rounded-2xl bg-slate-800/70 backdrop-blur-md border border-slate-700/80 shadow-xl space-y-3 w-64 animate-float">
              <div className="flex items-center gap-2.5 border-b border-slate-700/80 pb-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-5 h-5 text-blue-200" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-heading">CertiScan Shield</h4>
                  <p className="text-[10px] text-slate-400">Authenticity Verified</p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                <span>Active Application</span>
                <span className="text-emerald-400 font-bold">✓ Validated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Banner (If Action Required) */}
      {flaggedDoc && (
        <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-amber-900 font-heading">
                  Action Required: Mismatch Flagged in {flaggedDoc.title}
                </h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-800">
                  {latestSubmission.purposeTitle}
                </span>
              </div>
              <p className="text-xs text-amber-700 mt-1 max-w-2xl">
                A minor mismatch was flagged during verification. Re-uploading a clearer PDF copy will resolve this item.
              </p>
            </div>
          </div>

          <Link to={`/status/${latestSubmission.id}`} className="shrink-0 w-full md:w-auto">
            <Button variant="danger" size="sm" icon={ArrowRight} iconPosition="right" className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 border-none">
              Inspect & Fix Item
            </Button>
          </Link>
        </div>
      )}

      {/* 4 Floating Luxury Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-heading">
              Pending Applications
            </p>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1 font-heading">
              1
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Awaiting Re-upload</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-2xs">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-heading">
              Under Review
            </p>
            <h3 className="text-2xl font-extrabold text-blue-600 mt-1 font-heading">
              0
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">In Processing Queue</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-heading">
              Approved
            </p>
            <h3 className="text-2xl font-extrabold text-emerald-600 mt-1 font-heading">
              1
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Fully Validated</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
            <FileCheck2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-heading">
              Rejected
            </p>
            <h3 className="text-2xl font-extrabold text-slate-400 mt-1 font-heading">
              0
            </h3>
            <p className="text-[11px] text-slate-400 mt-1">Declined Batches</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center border border-slate-200 shadow-2xs">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3 Premium Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/upload" className="group">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">Start Verification Purpose</h4>
                <p className="text-[11px] text-slate-500">Select purpose & upload required cards</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>

        <Link to="/history" className="group">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">View Submitted Batches</h4>
                <p className="text-[11px] text-slate-500">Check full application archive</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>

        <Link to="/help" className="group">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">Verification Guidelines</h4>
                <p className="text-[11px] text-slate-500">Allowed formats & document sizes</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
          </div>
        </Link>
      </div>

      {/* Main Content Grid: Active Application + Right Trust Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 8 Cols: Active Application & Stepper */}
        <div className="lg:col-span-8 space-y-6">
          {latestSubmission && (
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      Active Application: {latestSubmission.purposeTitle}
                    </h3>
                    <StatusBadge statusKey={latestSubmission.overallStatus} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Submitted on {formatDate(latestSubmission.submittedAt)} • Applicant: {latestSubmission.candidateName}
                  </p>
                </div>

                <Link to={`/status/${latestSubmission.id}`}>
                  <Button variant="outline" size="sm" icon={ExternalLink} iconPosition="right">
                    View Full Details
                  </Button>
                </Link>
              </div>

              {/* Stepper Progress */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {[
                  { title: 'Submitted', desc: 'Documents uploaded', isDone: true },
                  { title: 'Under Review', desc: 'Record cross-checking', isDone: true },
                  { title: 'Verified', desc: latestSubmission.overallStatus === 'VERIFIED' ? 'Validation complete' : '1 item flagged', isDone: latestSubmission.overallStatus === 'VERIFIED' },
                  { title: 'Completed', desc: 'Final report issued', isDone: latestSubmission.overallStatus === 'VERIFIED' },
                ].map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1 font-heading">
                      <span>{step.title}</span>
                      <span className={step.isDone ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                        {step.isDone ? '✓' : '•'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* Submitted Documents Cards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 font-heading">
                  Submitted Document Cards ({latestSubmission.documents.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {latestSubmission.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 hover:border-blue-200 transition-colors shadow-xs"
                    >
                      <div className="truncate">
                        <p className="text-xs font-medium text-slate-800 truncate font-heading">{doc.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{doc.fileName}</p>
                      </div>
                      <StatusBadge statusKey={doc.status} className="scale-90" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Applications Quick Table */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-heading">Recent Applications</h3>
              <Link to="/history" className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
                View All History <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {submissions.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 hover:shadow-card transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-heading">{item.purposeTitle}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Submitted {formatDate(item.submittedAt)} • {item.documents.length} Document Cards
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <StatusBadge statusKey={item.overallStatus} />
                    <Link to={`/status/${item.id}`} className="text-xs font-semibold text-blue-600 hover:underline">
                      Inspect →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Floating Premium Trust Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border border-slate-200/90 shadow-card space-y-4">
            <div className="w-11 h-11 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold shadow-md">
              <Lock className="w-5.5 h-5.5 text-blue-300" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Secure Document Isolation
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              CertiScan uses 256-bit isolation protocols to safeguard all uploaded identity credentials and academic records.
            </p>
            <div className="pt-2 border-t border-slate-200/80 space-y-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Multi-format support (PDF, PNG, JPG)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Zero backend data leaks</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Configurable API data structure</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
