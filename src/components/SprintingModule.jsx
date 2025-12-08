import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  Compass,
  FileText,
  Flag,
  GitBranch,
  Layers,
  Lightbulb,
  PenSquare,
  Plus,
  Presentation,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Trash2,
  TrendingUp,
  Users
} from 'lucide-react';

const tabs = [
  { id: 'inputs', label: 'Inputs', icon: Lightbulb },
  { id: 'fits', label: 'Fits', icon: ShieldCheck },
  { id: 'mvp', label: 'MVP', icon: Rocket },
  { id: 'outcome', label: 'Outcome', icon: Flag }
];

const STORAGE_KEY = 'sprintingWorkspace';

const createDefaultWorkspace = () => ({
  ideaSummary:
    'Building a cofounder-led startup studio that pairs validated painkiller + vitamin ideas with the right founding team, then moves them through a tight sprint to reach Launchpad readiness.',
  targetSegments: [
    { name: 'AI x Ops leads', size: '30k', focus: 'Automation + workflow reliability', momentum: 'High intent' },
    { name: 'Technical founders', size: '120k', focus: 'Speed to MVP + cofounder trust', momentum: 'Fast cycles' },
    { name: 'Niche agencies', size: '18k', focus: 'Reusable playbooks + white-label', momentum: 'High LTV' }
  ],
  businessModelCanvas: [
    { title: 'Key Partners', items: ['Design partners', 'Cloud + AI stack', 'Community scouts'] },
    { title: 'Key Activities', items: ['Painkiller validation', 'Sprint ritual cadences', 'Prototype shipping'] },
    { title: 'Value Props', items: ['Launch-ready MVP in weeks', 'Co-founder quality assurance', 'Evidence-rich story'] },
    { title: 'Customer Segments', items: ['Solo founders', '2-5 person teams', 'Vertical agencies'] },
    { title: 'Channels', items: ['Founder community', 'Beta programs', 'Partner accelerators'] },
    { title: 'Revenue', items: ['Subscription for sprint', 'Revenue share on launch', 'Add-on services'] }
  ],
  valueProps: [
    { label: 'Painkiller', detail: 'Map critical workflow failure -> ship the smallest reliable fix first.' },
    { label: 'Vitamin', detail: 'Layer opinionated boosts (automation, insights, templates) only after proof.' },
    { label: 'Evidence', detail: 'Show proof via recorded interviews, usability clips, and benchmark deltas.' }
  ],
  painSolutionFits: [
    {
      pain: 'Context switching across tools for validation -> build -> launch',
      severity: 'critical',
      solution: 'Single sprint workspace with ritual templates and checkpoints.',
      evidence: '8/10 founders cite fragmented tools as top slowdown.'
    },
    {
      pain: 'Unclear problem depth before prototyping',
      severity: 'high',
      solution: 'Pain map canvas + proof checklist before demo unlocks.',
      evidence: 'Cuts rework by 40% in prior cohorts.'
    },
    {
      pain: 'Founder/market dilution with too many bets',
      severity: 'medium',
      solution: 'ICP-first scoring + feature priority based on pain weight.',
      evidence: 'Higher activation in niche ICP vs broad.'
    }
  ],
  founderFit: [
    { strength: 'Ops-heavy builder', startupNeed: 'Process + GTM rigor', signal: 'Matches with automation-led MVP' },
    { strength: 'Community-first cofounder', startupNeed: 'Distribution loops', signal: 'Owns feedback + early traction' },
    { strength: 'Technical lead (AI)', startupNeed: 'Prototype velocity', signal: 'Covers quality + feasibility' }
  ],
  competitiveSet: [
    { name: 'DIY Notion templates', position: 'Toolbox only', risk: 'Low guidance', moat: 'Structured rituals + AI guardrails' },
    { name: 'Accelerators', position: 'Cohort guidance', risk: 'Less hands-on build', moat: 'We pair build + cofounder + launch' },
    { name: 'Freelance collectives', position: 'Execution only', risk: 'No ownership', moat: 'Founder-owned roadmap + studio ops' }
  ],
  icpProfiles: [
    { title: 'Founder-operator', job: 'Runs ops, owns GTM proof', pains: ['Time poor', 'Needs proof fast'], activation: 'Weekly progress receipts + clear rituals' },
    { title: 'Technical founder', job: 'Builds product, skeptical of process', pains: ['Over-building risk'], activation: 'Problem-first guardrails + lean spec' },
    { title: 'Agency lead', job: 'Productizes services', pains: ['Repeatable assets'], activation: 'Reusable demo kit + white-label option' }
  ],
  featurePriorities: [
    { name: 'Pain map + solution storyboard', priority: 'Must', driver: 'Problem x solution fit', metric: 'Clarity score before build' },
    { name: 'Feature priority matrix', priority: 'Must', driver: 'Effort vs impact on ICP', metric: 'Top 3 shippable features' },
    { name: 'Prototype gate + demo', priority: 'Should', driver: 'Evidence', metric: 'Demo score vs ICP checklist' },
    { name: 'Live feedback tracker', priority: 'Should', driver: 'Learning loop', metric: 'Signal captured per sprint' }
  ],
  featureBoard: {
    now: [
      { title: 'Map painkillers to ICP jobs', owner: 'Product', rationale: 'Input discipline before build' },
      { title: 'Prioritize MVP slice', owner: 'Engineering', rationale: 'Scope to first launchable loop' }
    ],
    next: [
      { title: 'Prototype demo kit', owner: 'Design', rationale: 'Investor + customer ready' },
      { title: 'Feedback pipeline', owner: 'CX', rationale: 'Close loop per sprint' }
    ],
    later: [{ title: 'Integration marketplace', owner: 'Platform', rationale: 'Extend value after proof' }]
  },
  milestones: [
    { name: 'Sprint Kickoff', owner: 'PM', eta: 'This week', outcome: 'Inputs locked + rituals scheduled' },
    { name: 'Problem x Solution Proof', owner: 'Research', eta: 'Week 2', outcome: 'Pain evidence + fit score' },
    { name: 'MVP Prototype', owner: 'Product/Eng', eta: 'Week 4', outcome: 'Usable demo + usability clips' },
    { name: 'Launchpad Handoff', owner: 'Marketing', eta: 'Week 6', outcome: 'Narrative + assets ready' }
  ],
  designAssets: {
    wireframe: { status: 'In progress', notes: 'Core flows mapped; needs ICP-specific empty states.' },
    prototype: { status: 'Queued', notes: 'Blocked until pain map sign-off.' }
  },
  featureRequests: [
    { id: 1, title: 'Add customer interview locker', owner: 'Research', priority: 'high' },
    { id: 2, title: 'Multi-segment ICP scoring', owner: 'Product', priority: 'medium' },
    { id: 3, title: 'In-app demo reel export', owner: 'Marketing', priority: 'medium' }
  ],
  feedbackItems: [
    { id: 1, source: 'Beta founder standup', summary: 'Need clearer milestone to Launchpad handoff', status: 'inprogress', nextStep: 'Add launch-fit checklist and dates' },
    { id: 2, source: 'Early adopters', summary: 'Ask for problem depth before solution demo', status: 'open', nextStep: 'Gate prototype link behind pain mapping' },
    { id: 3, source: 'Design partner', summary: 'Share demo kit assets with investors', status: 'done', nextStep: 'Create public demo bundle' }
  ],
  launchReadiness: [
    { id: 1, label: 'Product x launch fit scored', owner: 'PM', done: false, impact: 'Proves we can ship and tell the story' },
    { id: 2, label: 'Launch narrative + demo kit ready', owner: 'Marketing', done: true, impact: 'Aligns GTM with product reality' },
    { id: 3, label: 'Feedback loop live (beta + ICP)', owner: 'CX', done: false, impact: 'Keeps sprint tightly informed' },
    { id: 4, label: 'Critical bugs under SLA', owner: 'Engineering', done: true, impact: 'Protects trust for launch cohort' }
  ],
  demoKit: [
    { title: 'Narrative one-pager', type: 'Story', status: 'Ready', link: 'https://demo.biggmate/story' },
    { title: 'Clickable prototype', type: 'Product', status: 'In progress', link: 'https://demo.biggmate/prototype' },
    { title: 'Launch checklist', type: 'Ops', status: 'Ready', link: 'https://demo.biggmate/launch' }
  ]
});

const createInitialDrafts = () => ({
  segment: { name: '', focus: '', size: '', momentum: 'High intent' },
  canvas: { block: 'Key Partners', item: '' },
  valueProp: { label: '', detail: '' },
  painSolution: { pain: '', severity: 'high', solution: '', evidence: '' },
  founderFit: { strength: '', startupNeed: '', signal: '' },
  competitor: { name: '', position: '', risk: '', moat: '' },
  icp: { title: '', job: '', pains: '', activation: '' },
  priority: { name: '', priority: 'Must', driver: '', metric: '' },
  featureCard: { title: '', owner: 'Product', rationale: '', lane: 'now' },
  milestone: { name: '', owner: '', eta: '', outcome: '' },
  feedback: { source: '', summary: '', status: 'open', nextStep: '' },
  demo: { title: '', type: 'Story', status: 'Ready', link: '' },
  readiness: { label: '', owner: '', impact: '' },
  request: { title: '', owner: 'Product', priority: 'medium' }
});

const SprintingModule = () => {
  const [activeTab, setActiveTab] = useState('inputs');
  const [workspace, setWorkspace] = useState(() => createDefaultWorkspace());
  const [drafts, setDrafts] = useState(() => createInitialDrafts());

  const readinessDone = useMemo(
    () => workspace.launchReadiness.filter((item) => item.done).length,
    [workspace.launchReadiness]
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      setWorkspace({ ...createDefaultWorkspace(), ...parsed });
    } catch (err) {
      console.warn('Could not parse sprinting workspace state', err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
  }, [workspace]);

  const resetWorkspace = () => {
    const fresh = createDefaultWorkspace();
    setWorkspace(fresh);
    setDrafts(createInitialDrafts());
    localStorage.removeItem(STORAGE_KEY);
  };

  const statusBadge = (status) => {
    const map = {
      open: 'bg-slate-100 text-slate-800',
      inprogress: 'bg-amber-100 text-amber-800',
      done: 'bg-emerald-100 text-emerald-800'
    };
    return map[status] || 'bg-slate-100 text-slate-800';
  };

  const priorityBadge = (priority) => {
    const map = {
      high: 'bg-rose-100 text-rose-800',
      medium: 'bg-blue-100 text-blue-800',
      low: 'bg-slate-100 text-slate-800',
      must: 'bg-emerald-100 text-emerald-800',
      should: 'bg-amber-100 text-amber-800'
    };
    return map[priority?.toLowerCase()] || 'bg-slate-100 text-slate-800';
  };

  const TabShell = ({ children }) => (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-xl p-6">
      {children}
    </div>
  );

  // Inputs
  const addTargetSegment = () => {
    const { name, focus, size, momentum } = drafts.segment;
    if (!name.trim() || !focus.trim() || !size.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      targetSegments: [...prev.targetSegments, { name: name.trim(), focus: focus.trim(), size: size.trim(), momentum: momentum || 'High intent' }]
    }));
    setDrafts((prev) => ({ ...prev, segment: { name: '', focus: '', size: '', momentum: 'High intent' } }));
  };

  const removeTargetSegment = (name) => {
    setWorkspace((prev) => ({
      ...prev,
      targetSegments: prev.targetSegments.filter((segment) => segment.name !== name)
    }));
  };

  const addCanvasItem = () => {
    if (!drafts.canvas.item.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      businessModelCanvas: prev.businessModelCanvas.map((block) =>
        block.title === drafts.canvas.block
          ? { ...block, items: [...block.items, drafts.canvas.item.trim()] }
          : block
      )
    }));
    setDrafts((prev) => ({ ...prev, canvas: { ...prev.canvas, item: '' } }));
  };

  const addValueProp = () => {
    if (!drafts.valueProp.label.trim() || !drafts.valueProp.detail.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      valueProps: [...prev.valueProps, { ...drafts.valueProp, label: drafts.valueProp.label.trim(), detail: drafts.valueProp.detail.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, valueProp: { label: '', detail: '' } }));
  };

  const removeValueProp = (label) => {
    setWorkspace((prev) => ({ ...prev, valueProps: prev.valueProps.filter((value) => value.label !== label) }));
  };

  // Fits
  const addPainSolution = () => {
    const { pain, severity, solution, evidence } = drafts.painSolution;
    if (!pain.trim() || !solution.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      painSolutionFits: [...prev.painSolutionFits, { pain: pain.trim(), severity, solution: solution.trim(), evidence: evidence.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, painSolution: { pain: '', severity: 'high', solution: '', evidence: '' } }));
  };

  const removePainSolution = (pain) => {
    setWorkspace((prev) => ({ ...prev, painSolutionFits: prev.painSolutionFits.filter((item) => item.pain !== pain) }));
  };

  const addFounderFit = () => {
    const { strength, startupNeed, signal } = drafts.founderFit;
    if (!strength.trim() || !startupNeed.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      founderFit: [...prev.founderFit, { strength: strength.trim(), startupNeed: startupNeed.trim(), signal: signal.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, founderFit: { strength: '', startupNeed: '', signal: '' } }));
  };

  const removeFounderFit = (strength) => {
    setWorkspace((prev) => ({ ...prev, founderFit: prev.founderFit.filter((item) => item.strength !== strength) }));
  };

  const addCompetitor = () => {
    const { name, position, risk, moat } = drafts.competitor;
    if (!name.trim() || !position.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      competitiveSet: [...prev.competitiveSet, { name: name.trim(), position: position.trim(), risk: risk.trim(), moat: moat.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, competitor: { name: '', position: '', risk: '', moat: '' } }));
  };

  const removeCompetitor = (name) => {
    setWorkspace((prev) => ({ ...prev, competitiveSet: prev.competitiveSet.filter((item) => item.name !== name) }));
  };

  const addIcpProfile = () => {
    const { title, job, pains, activation } = drafts.icp;
    if (!title.trim() || !job.trim()) return;
    const painList = pains
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    setWorkspace((prev) => ({
      ...prev,
      icpProfiles: [...prev.icpProfiles, { title: title.trim(), job: job.trim(), pains: painList, activation: activation.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, icp: { title: '', job: '', pains: '', activation: '' } }));
  };

  const removeIcpProfile = (title) => {
    setWorkspace((prev) => ({ ...prev, icpProfiles: prev.icpProfiles.filter((item) => item.title !== title) }));
  };

  // MVP
  const addFeaturePriority = () => {
    const { name, priority, driver, metric } = drafts.priority;
    if (!name.trim() || !driver.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      featurePriorities: [...prev.featurePriorities, { name: name.trim(), priority, driver: driver.trim(), metric: metric.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, priority: { name: '', priority: 'Must', driver: '', metric: '' } }));
  };

  const removeFeaturePriority = (name) => {
    setWorkspace((prev) => ({ ...prev, featurePriorities: prev.featurePriorities.filter((item) => item.name !== name) }));
  };

  const addFeatureCard = () => {
    const { title, owner, rationale, lane } = drafts.featureCard;
    if (!title.trim() || !owner.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      featureBoard: {
        ...prev.featureBoard,
        [lane]: [...prev.featureBoard[lane], { title: title.trim(), owner: owner.trim(), rationale: rationale.trim() }]
      }
    }));
    setDrafts((prev) => ({ ...prev, featureCard: { title: '', owner: 'Product', rationale: '', lane } }));
  };

  const removeFeatureCard = (lane, title) => {
    setWorkspace((prev) => ({
      ...prev,
      featureBoard: {
        ...prev.featureBoard,
        [lane]: prev.featureBoard[lane].filter((item) => item.title !== title)
      }
    }));
  };

  const addMilestone = () => {
    const { name, owner, eta, outcome } = drafts.milestone;
    if (!name.trim() || !owner.trim() || !outcome.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { name: name.trim(), owner: owner.trim(), eta: eta.trim() || 'TBD', outcome: outcome.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, milestone: { name: '', owner: '', eta: '', outcome: '' } }));
  };

  const removeMilestone = (name) => {
    setWorkspace((prev) => ({ ...prev, milestones: prev.milestones.filter((item) => item.name !== name) }));
  };

  const updateDesignAsset = (key, field, value) => {
    setWorkspace((prev) => ({
      ...prev,
      designAssets: {
        ...prev.designAssets,
        [key]: { ...prev.designAssets[key], [field]: value }
      }
    }));
  };

  const addFeatureRequest = () => {
    if (!drafts.request.title.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      featureRequests: [
        ...prev.featureRequests,
        { id: Date.now(), title: drafts.request.title.trim(), owner: drafts.request.owner, priority: drafts.request.priority }
      ]
    }));
    setDrafts((prev) => ({ ...prev, request: { title: '', owner: 'Product', priority: 'medium' } }));
  };

  const removeFeatureRequest = (id) => {
    setWorkspace((prev) => ({ ...prev, featureRequests: prev.featureRequests.filter((item) => item.id !== id) }));
  };

  // Outcome
  const toggleReadiness = (id) => {
    setWorkspace((prev) => ({
      ...prev,
      launchReadiness: prev.launchReadiness.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    }));
  };

  const addReadiness = () => {
    const { label, owner, impact } = drafts.readiness;
    if (!label.trim() || !owner.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      launchReadiness: [
        ...prev.launchReadiness,
        { id: Date.now(), label: label.trim(), owner: owner.trim(), impact: impact.trim(), done: false }
      ]
    }));
    setDrafts((prev) => ({ ...prev, readiness: { label: '', owner: '', impact: '' } }));
  };

  const removeReadiness = (id) => {
    setWorkspace((prev) => ({ ...prev, launchReadiness: prev.launchReadiness.filter((item) => item.id !== id) }));
  };

  const updateFeedbackStatus = (id, status) => {
    setWorkspace((prev) => ({
      ...prev,
      feedbackItems: prev.feedbackItems.map((item) => (item.id === id ? { ...item, status } : item))
    }));
  };

  const addFeedbackItem = () => {
    const { source, summary, status, nextStep } = drafts.feedback;
    if (!source.trim() || !summary.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      feedbackItems: [
        ...prev.feedbackItems,
        { id: Date.now(), source: source.trim(), summary: summary.trim(), status, nextStep: nextStep.trim() }
      ]
    }));
    setDrafts((prev) => ({ ...prev, feedback: { source: '', summary: '', status: 'open', nextStep: '' } }));
  };

  const removeFeedbackItem = (id) => {
    setWorkspace((prev) => ({ ...prev, feedbackItems: prev.feedbackItems.filter((item) => item.id !== id) }));
  };

  const addDemoAsset = () => {
    const { title, type, status, link } = drafts.demo;
    if (!title.trim() || !link.trim()) return;
    setWorkspace((prev) => ({
      ...prev,
      demoKit: [...prev.demoKit, { title: title.trim(), type, status, link: link.trim() }]
    }));
    setDrafts((prev) => ({ ...prev, demo: { title: '', type: 'Story', status: 'Ready', link: '' } }));
  };

  const removeDemoAsset = (title) => {
    setWorkspace((prev) => ({ ...prev, demoKit: prev.demoKit.filter((asset) => asset.title !== title) }));
  };

  const renderInputs = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TabShell>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-900">Idea (painkiller x vitamin)</h3>
            </div>
            <span className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">Matched & Cofounder locked</span>
          </div>
          <textarea
            value={workspace.ideaSummary}
            onChange={(e) => setWorkspace((prev) => ({ ...prev, ideaSummary: e.target.value }))}
            className="w-full border border-gray-200 rounded-2xl p-4 text-gray-800 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-gray-50"
            rows={5}
          />
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Painkiller</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Vitamin</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Opinionated bets</span>
          </div>
        </TabShell>
        <TabShell>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Target market</h3>
            </div>
            <span className="text-xs text-gray-500">Segmented + sized</span>
          </div>
          <div className="space-y-3">
            {workspace.targetSegments.map((segment) => (
              <div key={segment.name} className="p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900">{segment.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-900 text-white rounded-full">Momentum: {segment.momentum}</span>
                    <button
                      onClick={() => removeTargetSegment(segment.name)}
                      className="text-gray-500 hover:text-red-600"
                      aria-label="Remove segment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Focus: {segment.focus}</p>
                <p className="text-sm text-gray-500">Addressable: {segment.size}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4">
            <input
              value={drafts.segment.name}
              onChange={(e) => setDrafts((prev) => ({ ...prev, segment: { ...prev.segment, name: e.target.value } }))}
              placeholder="Segment name"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.segment.focus}
              onChange={(e) => setDrafts((prev) => ({ ...prev, segment: { ...prev.segment, focus: e.target.value } }))}
              placeholder="Focus"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.segment.size}
              onChange={(e) => setDrafts((prev) => ({ ...prev, segment: { ...prev.segment, size: e.target.value } }))}
              placeholder="Size"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <div className="flex gap-2">
              <select
                value={drafts.segment.momentum}
                onChange={(e) => setDrafts((prev) => ({ ...prev, segment: { ...prev.segment, momentum: e.target.value } }))}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              >
                <option>High intent</option>
                <option>Fast cycles</option>
                <option>Emerging</option>
              </select>
              <button
                onClick={addTargetSegment}
                className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </TabShell>
      </div>

      <TabShell>
        <div className="flex items-center gap-3 mb-4">
          <Layers className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Business model canvas</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspace.businessModelCanvas.map((block) => (
            <div key={block.title} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <p className="text-sm font-semibold text-gray-900 mb-2">{block.title}</p>
              <ul className="space-y-1 text-sm text-gray-700">
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-gray-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-3 mt-4">
          <select
            value={drafts.canvas.block}
            onChange={(e) => setDrafts((prev) => ({ ...prev, canvas: { ...prev.canvas, block: e.target.value } }))}
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            {workspace.businessModelCanvas.map((block) => (
              <option key={block.title}>{block.title}</option>
            ))}
          </select>
          <input
            value={drafts.canvas.item}
            onChange={(e) => setDrafts((prev) => ({ ...prev, canvas: { ...prev.canvas, item: e.target.value } }))}
            placeholder="Add an item to this block"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <button
            onClick={addCanvasItem}
            className="px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </TabShell>

      <TabShell>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-gray-900">Value proposition</h3>
          </div>
          <span className="text-xs text-gray-500">Painkiller + vitamin + evidence</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspace.valueProps.map((value) => (
            <div key={value.label} className="p-4 border border-gray-200 rounded-2xl bg-white">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">{value.label}</p>
                <button
                  onClick={() => removeValueProp(value.label)}
                  className="text-gray-500 hover:text-red-600"
                  aria-label="Remove value proposition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">{value.detail}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <input
            value={drafts.valueProp.label}
            onChange={(e) => setDrafts((prev) => ({ ...prev, valueProp: { ...prev.valueProp, label: e.target.value } }))}
            placeholder="Label"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.valueProp.detail}
            onChange={(e) => setDrafts((prev) => ({ ...prev, valueProp: { ...prev.valueProp, detail: e.target.value } }))}
            placeholder="Detail"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <button
            onClick={addValueProp}
            className="px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </TabShell>
    </div>
  );

  const renderFits = () => (
    <div className="space-y-6">
      <TabShell>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">Problem x Solution fit</h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">Evidence-led</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspace.painSolutionFits.map((item) => (
            <div key={item.pain} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-900">Pain</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-rose-100 text-rose-800 capitalize">{item.severity}</span>
                  <button
                    onClick={() => removePainSolution(item.pain)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Remove pain-solution pair"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{item.pain}</p>
              <p className="text-xs font-semibold text-gray-900 mb-1">Solution</p>
              <p className="text-sm text-gray-700 mb-2">{item.solution}</p>
              <p className="text-xs text-gray-500">{item.evidence}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-4">
          <input
            value={drafts.painSolution.pain}
            onChange={(e) => setDrafts((prev) => ({ ...prev, painSolution: { ...prev.painSolution, pain: e.target.value } }))}
            placeholder="Pain"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.painSolution.solution}
            onChange={(e) => setDrafts((prev) => ({ ...prev, painSolution: { ...prev.painSolution, solution: e.target.value } }))}
            placeholder="Solution"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.painSolution.evidence}
            onChange={(e) => setDrafts((prev) => ({ ...prev, painSolution: { ...prev.painSolution, evidence: e.target.value } }))}
            placeholder="Evidence / proof"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <div className="flex gap-2">
            <select
              value={drafts.painSolution.severity}
              onChange={(e) => setDrafts((prev) => ({ ...prev, painSolution: { ...prev.painSolution, severity: e.target.value } }))}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
            <button
              onClick={addPainSolution}
              className="px-3 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all"
            >
              Add
            </button>
          </div>
        </div>
      </TabShell>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TabShell>
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900">Founder x Startup fit</h3>
          </div>
          <div className="space-y-3">
            {workspace.founderFit.map((item) => (
              <div key={item.strength} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">{item.strength}</p>
                  <button
                    onClick={() => removeFounderFit(item.strength)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Remove founder fit"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-700">Startup need: {item.startupNeed}</p>
                <p className="text-xs text-gray-500">Signal: {item.signal}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 mt-4">
            <input
              value={drafts.founderFit.strength}
              onChange={(e) => setDrafts((prev) => ({ ...prev, founderFit: { ...prev.founderFit, strength: e.target.value } }))}
              placeholder="Strength"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.founderFit.startupNeed}
              onChange={(e) => setDrafts((prev) => ({ ...prev, founderFit: { ...prev.founderFit, startupNeed: e.target.value } }))}
              placeholder="Startup need"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <div className="flex gap-2">
              <input
                value={drafts.founderFit.signal}
                onChange={(e) => setDrafts((prev) => ({ ...prev, founderFit: { ...prev.founderFit, signal: e.target.value } }))}
                placeholder="Signal"
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <button
                onClick={addFounderFit}
                className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </TabShell>
        <TabShell>
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-5 h-5 text-sky-500" />
            <h3 className="text-lg font-semibold text-gray-900">Competitive analysis</h3>
          </div>
          <div className="space-y-3">
            {workspace.competitiveSet.map((item) => (
              <div key={item.name} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-900 text-white">{item.position}</span>
                    <button
                      onClick={() => removeCompetitor(item.name)}
                      className="text-gray-500 hover:text-red-600"
                      aria-label="Remove competitor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-700">Risk: {item.risk}</p>
                <p className="text-xs text-gray-500">Moat: {item.moat}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 mt-4">
            <input
              value={drafts.competitor.name}
              onChange={(e) => setDrafts((prev) => ({ ...prev, competitor: { ...prev.competitor, name: e.target.value } }))}
              placeholder="Competitor"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.competitor.position}
              onChange={(e) => setDrafts((prev) => ({ ...prev, competitor: { ...prev.competitor, position: e.target.value } }))}
              placeholder="Positioning"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.competitor.risk}
              onChange={(e) => setDrafts((prev) => ({ ...prev, competitor: { ...prev.competitor, risk: e.target.value } }))}
              placeholder="Risk"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <div className="flex gap-2">
              <input
                value={drafts.competitor.moat}
                onChange={(e) => setDrafts((prev) => ({ ...prev, competitor: { ...prev.competitor, moat: e.target.value } }))}
                placeholder="Moat"
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <button
                onClick={addCompetitor}
                className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </TabShell>
        <TabShell>
          <div className="flex items-center gap-3 mb-3">
            <Compass className="w-5 h-5 text-teal-500" />
            <h3 className="text-lg font-semibold text-gray-900">ICP profiling</h3>
          </div>
          <div className="space-y-3">
            {workspace.icpProfiles.map((profile) => (
              <div key={profile.title} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900">{profile.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-800">{profile.job}</span>
                    <button
                      onClick={() => removeIcpProfile(profile.title)}
                      className="text-gray-500 hover:text-red-600"
                      aria-label="Remove ICP profile"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-1">Pains: {profile.pains.join(', ')}</p>
                <p className="text-xs text-gray-500">Activation: {profile.activation}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-2 mt-4">
            <input
              value={drafts.icp.title}
              onChange={(e) => setDrafts((prev) => ({ ...prev, icp: { ...prev.icp, title: e.target.value } }))}
              placeholder="ICP title"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.icp.job}
              onChange={(e) => setDrafts((prev) => ({ ...prev, icp: { ...prev.icp, job: e.target.value } }))}
              placeholder="Role / job"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.icp.pains}
              onChange={(e) => setDrafts((prev) => ({ ...prev, icp: { ...prev.icp, pains: e.target.value } }))}
              placeholder="Pains (comma separated)"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <div className="flex gap-2">
              <input
                value={drafts.icp.activation}
                onChange={(e) => setDrafts((prev) => ({ ...prev, icp: { ...prev.icp, activation: e.target.value } }))}
                placeholder="Activation hook"
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <button
                onClick={addIcpProfile}
                className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </TabShell>
      </div>
    </div>
  );

  const renderMVP = () => (
    <div className="space-y-6">
      <TabShell>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900">Feature prioritization</h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-800">Problem -> Solution led</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workspace.featurePriorities.map((feature) => (
            <div key={feature.name} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900">{feature.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${priorityBadge(feature.priority)}`}>{feature.priority}</span>
                  <button
                    onClick={() => removeFeaturePriority(feature.name)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Remove prioritized feature"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700">Driver: {feature.driver}</p>
              <p className="text-xs text-gray-500">Metric: {feature.metric}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-4">
          <input
            value={drafts.priority.name}
            onChange={(e) => setDrafts((prev) => ({ ...prev, priority: { ...prev.priority, name: e.target.value } }))}
            placeholder="Feature"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.priority.driver}
            onChange={(e) => setDrafts((prev) => ({ ...prev, priority: { ...prev.priority, driver: e.target.value } }))}
            placeholder="Driver"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.priority.metric}
            onChange={(e) => setDrafts((prev) => ({ ...prev, priority: { ...prev.priority, metric: e.target.value } }))}
            placeholder="Metric"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <div className="flex gap-2">
            <select
              value={drafts.priority.priority}
              onChange={(e) => setDrafts((prev) => ({ ...prev, priority: { ...prev.priority, priority: e.target.value } }))}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="Must">Must</option>
              <option value="Should">Should</option>
              <option value="Could">Could</option>
            </select>
            <button
              onClick={addFeaturePriority}
              className="px-3 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all"
            >
              Add
            </button>
          </div>
        </div>
      </TabShell>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['now', 'next', 'later'].map((column) => (
          <TabShell key={column}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {column === 'now' && <Rocket className="w-5 h-5 text-emerald-600" />}
                {column === 'next' && <Timer className="w-5 h-5 text-amber-600" />}
                {column === 'later' && <TrendingUp className="w-5 h-5 text-blue-600" />}
                <h3 className="text-lg font-semibold text-gray-900 capitalize">{column}</h3>
              </div>
              <span className="text-xs text-gray-500">MVP feature board</span>
            </div>
            <div className="space-y-3">
              {workspace.featureBoard[column].map((card) => (
                <div key={card.title} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{card.title}</p>
                    <button
                      onClick={() => removeFeatureCard(column, card.title)}
                      className="text-gray-500 hover:text-red-600"
                      aria-label="Remove feature card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">Owner: {card.owner}</p>
                  <p className="text-xs text-gray-500">Rationale: {card.rationale}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4">
              <input
                value={drafts.featureCard.title}
                onChange={(e) => setDrafts((prev) => ({ ...prev, featureCard: { ...prev.featureCard, title: e.target.value } }))}
                placeholder="Work item"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <input
                value={drafts.featureCard.owner}
                onChange={(e) => setDrafts((prev) => ({ ...prev, featureCard: { ...prev.featureCard, owner: e.target.value } }))}
                placeholder="Owner"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <textarea
                value={drafts.featureCard.rationale}
                onChange={(e) => setDrafts((prev) => ({ ...prev, featureCard: { ...prev.featureCard, rationale: e.target.value } }))}
                placeholder="Rationale"
                rows={2}
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <div className="flex gap-2">
                <select
                  value={drafts.featureCard.lane}
                  onChange={(e) => setDrafts((prev) => ({ ...prev, featureCard: { ...prev.featureCard, lane: e.target.value } }))}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="now">Now</option>
                  <option value="next">Next</option>
                  <option value="later">Later</option>
                </select>
                <button
                  onClick={addFeatureCard}
                  className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
                >
                  Add
                </button>
              </div>
            </div>
          </TabShell>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TabShell>
          <div className="flex items-center gap-3 mb-3">
            <ClipboardList className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-gray-900">Development milestones</h3>
          </div>
          <div className="space-y-3">
            {workspace.milestones.map((item) => (
              <div key={item.name} className="flex items-start gap-3 p-4 border border-gray-200 rounded-2xl bg-gray-50">
                <CheckCircle2 className="w-5 h-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <button
                      onClick={() => removeMilestone(item.name)}
                      className="text-gray-500 hover:text-red-600"
                      aria-label="Remove milestone"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">Outcome: {item.outcome}</p>
                  <p className="text-xs text-gray-500">Owner: {item.owner} | ETA: {item.eta}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4">
            <input
              value={drafts.milestone.name}
              onChange={(e) => setDrafts((prev) => ({ ...prev, milestone: { ...prev.milestone, name: e.target.value } }))}
              placeholder="Milestone"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.milestone.owner}
              onChange={(e) => setDrafts((prev) => ({ ...prev, milestone: { ...prev.milestone, owner: e.target.value } }))}
              placeholder="Owner"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <input
              value={drafts.milestone.eta}
              onChange={(e) => setDrafts((prev) => ({ ...prev, milestone: { ...prev.milestone, eta: e.target.value } }))}
              placeholder="ETA"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            />
            <div className="flex gap-2">
              <input
                value={drafts.milestone.outcome}
                onChange={(e) => setDrafts((prev) => ({ ...prev, milestone: { ...prev.milestone, outcome: e.target.value } }))}
                placeholder="Outcome"
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
              <button
                onClick={addMilestone}
                className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
              >
                Add
              </button>
            </div>
          </div>
        </TabShell>

        <TabShell>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Presentation className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900">Design stream</h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800">Wireframe -> Prototype</span>
          </div>
          <div className="space-y-3">
            <div className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900">Wireframe</p>
                <select
                  value={workspace.designAssets.wireframe.status}
                  onChange={(e) => updateDesignAsset('wireframe', 'status', e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option>In progress</option>
                  <option>Ready</option>
                  <option>Blocked</option>
                </select>
              </div>
              <textarea
                value={workspace.designAssets.wireframe.notes}
                onChange={(e) => updateDesignAsset('wireframe', 'notes', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white"
              />
            </div>
            <div className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900">Prototype</p>
                <select
                  value={workspace.designAssets.prototype.status}
                  onChange={(e) => updateDesignAsset('prototype', 'status', e.target.value)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option>Queued</option>
                  <option>In progress</option>
                  <option>Ready</option>
                </select>
              </div>
              <textarea
                value={workspace.designAssets.prototype.notes}
                onChange={(e) => updateDesignAsset('prototype', 'notes', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 bg-white"
              />
            </div>
          </div>
        </TabShell>
      </div>

      <TabShell>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Feature log requests</h3>
          </div>
          <span className="text-xs text-gray-500">Source: founders + ICP signals</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {workspace.featureRequests.map((request) => (
            <div key={request.id} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900">{request.title}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${priorityBadge(request.priority)}`}>{request.priority}</span>
                  <button
                    onClick={() => removeFeatureRequest(request.id)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Remove feature request"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700">Owner: {request.owner}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={drafts.request.title}
            onChange={(e) => setDrafts((prev) => ({ ...prev, request: { ...prev.request, title: e.target.value } }))}
            placeholder="Add a new request..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <select
            value={drafts.request.owner}
            onChange={(e) => setDrafts((prev) => ({ ...prev, request: { ...prev.request, owner: e.target.value } }))}
            className="border border-gray-200 rounded-xl px-3 py-3 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="Product">Product</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            value={drafts.request.priority}
            onChange={(e) => setDrafts((prev) => ({ ...prev, request: { ...prev.request, priority: e.target.value } }))}
            className="border border-gray-200 rounded-xl px-3 py-3 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={addFeatureRequest}
            className="px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </TabShell>
    </div>
  );

  const renderOutcome = () => (
    <div className="space-y-6">
      <TabShell>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Flag className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Product x Launch fit</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {readinessDone}/{workspace.launchReadiness.length} ready
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {workspace.launchReadiness.map((item) => (
            <div
              key={item.id}
              className={`text-left p-4 border rounded-2xl transition-all ${
                item.done ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReadiness(item.id)}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      item.done ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {item.done ? 'Ready' : 'Mark ready'}
                  </button>
                  <button
                    onClick={() => removeReadiness(item.id)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Remove readiness check"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">Owner: {item.owner}</p>
              <p className="text-xs text-gray-500">{item.impact}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-4">
          <input
            value={drafts.readiness.label}
            onChange={(e) => setDrafts((prev) => ({ ...prev, readiness: { ...prev.readiness, label: e.target.value } }))}
            placeholder="Checkpoint"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.readiness.owner}
            onChange={(e) => setDrafts((prev) => ({ ...prev, readiness: { ...prev.readiness, owner: e.target.value } }))}
            placeholder="Owner"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.readiness.impact}
            onChange={(e) => setDrafts((prev) => ({ ...prev, readiness: { ...prev.readiness, impact: e.target.value } }))}
            placeholder="Impact"
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <button
            onClick={addReadiness}
            className="px-3 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all"
          >
            Add
          </button>
        </div>
      </TabShell>

      <TabShell>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <PenSquare className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-gray-900">Feedback tracker board</h3>
          </div>
          <span className="text-xs text-gray-500">Capture and resolve before Launchpad</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspace.feedbackItems.map((item) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900">{item.source}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusBadge(item.status)}`}>{item.status}</span>
                  <button
                    onClick={() => removeFeedbackItem(item.id)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Remove feedback item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{item.summary}</p>
              <p className="text-xs text-gray-500 mb-3">Next: {item.nextStep}</p>
              <select
                value={item.status}
                onChange={(e) => updateFeedbackStatus(item.id, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              >
                <option value="open">Open</option>
                <option value="inprogress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-4">
          <input
            value={drafts.feedback.source}
            onChange={(e) => setDrafts((prev) => ({ ...prev, feedback: { ...prev.feedback, source: e.target.value } }))}
            placeholder="Source"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.feedback.summary}
            onChange={(e) => setDrafts((prev) => ({ ...prev, feedback: { ...prev.feedback, summary: e.target.value } }))}
            placeholder="Summary"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.feedback.nextStep}
            onChange={(e) => setDrafts((prev) => ({ ...prev, feedback: { ...prev.feedback, nextStep: e.target.value } }))}
            placeholder="Next step"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <div className="flex gap-2">
            <select
              value={drafts.feedback.status}
              onChange={(e) => setDrafts((prev) => ({ ...prev, feedback: { ...prev.feedback, status: e.target.value } }))}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option value="open">Open</option>
              <option value="inprogress">In progress</option>
              <option value="done">Done</option>
            </select>
            <button
              onClick={addFeedbackItem}
              className="px-3 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all"
            >
              Add
            </button>
          </div>
        </div>
      </TabShell>

      <TabShell>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Presentation className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">Demo kit</h3>
          </div>
          <span className="text-xs text-gray-500">Everything needed for Launchpad</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workspace.demoKit.map((asset) => (
            <div key={asset.title} className="p-4 border border-gray-200 rounded-2xl bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900">{asset.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-900 text-white">{asset.type}</span>
                  <button
                    onClick={() => removeDemoAsset(asset.title)}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Remove demo asset"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">Status: {asset.status}</p>
              <p className="text-xs text-gray-500 break-all">{asset.link}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-4">
          <input
            value={drafts.demo.title}
            onChange={(e) => setDrafts((prev) => ({ ...prev, demo: { ...prev.demo, title: e.target.value } }))}
            placeholder="Asset title"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <input
            value={drafts.demo.link}
            onChange={(e) => setDrafts((prev) => ({ ...prev, demo: { ...prev.demo, link: e.target.value } }))}
            placeholder="Link"
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          />
          <select
            value={drafts.demo.type}
            onChange={(e) => setDrafts((prev) => ({ ...prev, demo: { ...prev.demo, type: e.target.value } }))}
            className="border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          >
            <option value="Story">Story</option>
            <option value="Product">Product</option>
            <option value="Ops">Ops</option>
            <option value="GTM">GTM</option>
          </select>
          <div className="flex gap-2">
            <select
              value={drafts.demo.status}
              onChange={(e) => setDrafts((prev) => ({ ...prev, demo: { ...prev.demo, status: e.target.value } }))}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            >
              <option>Ready</option>
              <option>In progress</option>
              <option>Queued</option>
            </select>
            <button
              onClick={addDemoAsset}
              className="px-3 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all"
            >
              Add
            </button>
          </div>
        </div>
      </TabShell>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Sprinting workspace</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Build -> Proof -> Launchpad</h1>
              <p className="text-gray-600 mt-2 max-w-3xl">
                You matched on the idea and cofounder. This workspace keeps the startup sprint on-rails until
                Launchpad: inputs, fits, MVP, and outcome in one place.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Idea matched</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">Cofounder matched</span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white">Sprinting to Launchpad</span>
              </div>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm text-gray-700 flex items-center gap-2">
                <Timer className="w-4 h-4 text-gray-500" />
                6-week sprint lane
              </div>
              <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm text-sm text-gray-700 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-emerald-600" />
                Launchpad target locked
              </div>
              <button
                onClick={resetWorkspace}
                className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all flex items-center gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Reset to defaults
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive ? 'bg-gray-900 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === 'inputs' && renderInputs()}
        {activeTab === 'fits' && renderFits()}
        {activeTab === 'mvp' && renderMVP()}
        {activeTab === 'outcome' && renderOutcome()}
      </div>
    </div>
  );
};

export default SprintingModule;
