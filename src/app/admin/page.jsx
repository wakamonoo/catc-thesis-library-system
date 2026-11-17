'use client';
import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  UploadCloud,
  X,
} from 'lucide-react';

const programs = [
  'Bachelor of Science in Information Technology',
  'Bachelor of Science in Computer Science',
  'Bachelor of Science in Business Administration',
  'Bachelor of Arts in Communication',
];

const initialForm = {
  title: '',
  authors: '',
  program: '',
  year: '2026',
  abstract: '',
  keywords: '',
};

function App() {
  const [theses, setTheses] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('All programs');
  const [form, setForm] = useState(initialForm);
  const [documentName, setDocumentName] = useState('');

  const filteredTheses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return theses.filter((thesis) => {
      const matchesSearch = !query || [thesis.title, thesis.authors, thesis.keywords].some((value) => value.toLowerCase().includes(query));
      const matchesProgram = selectedProgram === 'All programs' || thesis.program === selectedProgram;
      return matchesSearch && matchesProgram;
    });
  }, [search, selectedProgram, theses]);

  const openAddThesis = () => {
    setForm(initialForm);
    setDocumentName('');
    setIsAddOpen(true);
  };

  const closeAddThesis = () => setIsAddOpen(false);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleDocument = (event) => {
    const file = event.target.files?.[0];
    if (file) setDocumentName(file.name);
  };

  const saveThesis = (event) => {
    event.preventDefault();
    const newThesis = {
      ...form,
      id: Date.now(),
      document: documentName,
    };
    setTheses((current) => [newThesis, ...current]);
    closeAddThesis();
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-[#152b43]">
      <div className="flex min-h-screen">
        <aside className="flex w-full shrink-0 flex-col border-b border-[#dde4e9] bg-white px-4 py-5 md:fixed md:inset-y-0 md:w-[230px] md:border-b-0 md:border-r md:px-4 md:py-7">
          <div className="flex items-center gap-3 px-2 md:px-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[3px] border border-[#1a3a62] bg-[#eaf1f7] text-[#1b4674] shadow-[inset_0_0_0_3px_white]">
              <BookOpen size={26} strokeWidth={1.8} />
            </div>
            <div>
              <div className="font-serif text-[24px] font-bold leading-none tracking-[-0.04em] text-[#132d4e]">CAT-C</div>
              <div className="mt-1 text-[11px] font-medium tracking-[0.02em] text-[#718094]">Thesis Library</div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between px-3 md:block">
            <p className="text-[10px] font-semibold uppercase tracking-[0.04em] text-[#66798c]">Workspace</p>
            <span className="rounded-full bg-[#eef5f8] px-2 py-1 text-[10px] font-semibold text-[#2a6b72] md:hidden">Admin</span>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto md:block md:space-y-2">
            <button className="flex min-w-max items-center gap-3 rounded-md bg-[#112f56] px-3 py-3 text-left text-sm font-semibold text-white shadow-[0_2px_5px_rgba(17,47,86,0.12)] transition hover:bg-[#193c69] md:w-full">
              <LayoutDashboard size={18} strokeWidth={1.8} />
              Dashboard
            </button>
            <button onClick={openAddThesis} className="flex min-w-max items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-[#5d6d7e] transition hover:bg-[#f0f4f6] hover:text-[#17365d] md:w-full">
              <Plus size={19} strokeWidth={1.7} />
              Add thesis
            </button>
          </nav>

          <div className="mt-4 flex gap-2 border-t border-[#e1e7eb] pt-4 md:mt-auto md:block md:border-t-0 md:pt-0">
            <button className="flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-[#5d6d7e] transition hover:bg-[#f0f4f6] hover:text-[#17365d] md:w-full">
              <ArrowUpRight size={18} strokeWidth={1.8} />
              View library
            </button>
            <button className="flex items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-[#5d6d7e] transition hover:bg-[#f0f4f6] hover:text-[#17365d] md:mt-1 md:w-full">
              <LogOut size={18} strokeWidth={1.8} />
              Sign out
            </button>
          </div>

          <div className="mt-5 hidden items-center gap-3 border-t border-[#dfe6eb] px-1 pt-5 md:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff0c7] text-sm font-semibold text-[#1a3a62]">Y</div>
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-[#26384d]">Yancy Nidea</div>
              <div className="mt-1 text-[10px] text-[#7a8795]">Administrator</div>
            </div>
            <ShieldCheck className="ml-auto text-[#41546b]" size={16} />
          </div>
        </aside>

        <main className="min-w-0 flex-1 md:ml-[230px]">
          <header className="flex h-[70px] items-center justify-between border-b border-[#e2e8ec] bg-white px-5 sm:px-8 lg:px-9">
            <div className="flex items-center gap-3 text-xs text-[#698096]">
              <span className="hidden sm:inline">Library management</span>
              <span className="hidden text-[#bdc7cf] sm:inline">/</span>
              <span className="font-medium text-[#304967]">Overview</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#25755e]">
              <ShieldCheck size={17} strokeWidth={1.8} />
              <span className="hidden sm:inline">Admin access</span>
            </div>
          </header>

          <section className="mx-auto max-w-[1110px] px-5 py-8 sm:px-8 lg:px-9 lg:py-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[-0.01em] text-[#60758a]">CAT-C thesis collection</p>
                <h1 className="mt-2 text-[30px] font-bold leading-[1.15] tracking-[-0.035em] text-[#172c43] sm:text-[32px]">Admin dashboard</h1>
                <p className="mt-2 text-sm leading-6 text-[#718296]">Manage your college’s academic research.</p>
              </div>
              <button onClick={openAddThesis} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#112f56] px-5 py-3 text-sm font-bold text-white shadow-[0_4px_10px_rgba(17,47,86,0.12)] transition hover:-translate-y-0.5 hover:bg-[#193c69] focus:outline-none focus:ring-2 focus:ring-[#86a7bd] focus:ring-offset-2">
                <Plus size={18} strokeWidth={2} />
                Add thesis
              </button>
            </div>

            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              <StatCard label="Total theses" value={theses.length} detail="In the collection" icon={<BookOpen size={23} strokeWidth={1.8} />} tone="blue" />
              <StatCard label="College programs" value={new Set(theses.map((thesis) => thesis.program)).size} detail="With thesis records" icon={<GraduationCap size={24} strokeWidth={1.8} />} tone="yellow" />
              <StatCard label="Documents" value={theses.filter((thesis) => thesis.document).length} detail="PDFs uploaded" icon={<FileText size={23} strokeWidth={1.8} />} tone="green" />
            </div>

            <div className="mt-8 border-t border-[#dce4e9] pt-6 sm:mt-9 sm:pt-7">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-[19px] font-bold tracking-[-0.02em] text-[#172c43]">Thesis collection</h2>
                <span className="rounded bg-[#dfe6eb] px-2 py-1 text-[11px] font-bold text-[#31465d]">{theses.length}</span>
              </div>
              <p className="mt-2 text-sm text-[#718296]">All thesis records, newest first.</p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <label className="relative block flex-1">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8291a0]" size={18} strokeWidth={1.8} />
                  <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, author or keyword..." className="h-10 w-full rounded-md border border-[#dbe3e9] bg-white pl-10 pr-4 text-sm text-[#22384f] outline-none transition placeholder:text-[#9aa7b4] focus:border-[#7795ac] focus:ring-2 focus:ring-[#dce8ef]" />
                </label>
                <div className="relative sm:w-[224px]">
                  <select value={selectedProgram} onChange={(event) => setSelectedProgram(event.target.value)} className="h-10 w-full appearance-none rounded-md border border-[#dbe3e9] bg-white px-4 pr-10 text-sm text-[#344b63] outline-none transition focus:border-[#7795ac] focus:ring-2 focus:ring-[#dce8ef]">
                    <option>All programs</option>
                    {programs.map((program) => <option key={program}>{program}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5f7082]" size={17} />
                </div>
              </div>

              {filteredTheses.length === 0 ? <EmptyCollection onAdd={openAddThesis} hasFilters={Boolean(search || selectedProgram !== 'All programs')} /> : <ThesisList theses={filteredTheses} />}
            </div>
          </section>
        </main>
      </div>

      {isAddOpen && <AddThesisDrawer form={form} documentName={documentName} onChange={updateForm} onDocumentChange={handleDocument} onClose={closeAddThesis} onSave={saveThesis} />}
    </div>
  );
}

function StatCard({ label, value, detail, icon, tone }) {
  const toneClasses = {
    blue: 'bg-[#f1f6fa] text-[#1a3a62]',
    yellow: 'bg-[#fff2ce] text-[#1a3a62]',
    green: 'bg-[#def2e8] text-[#218060]',
  };

  return (
    <div className="flex min-h-[134px] items-start justify-between rounded-lg border border-[#dce4e9] bg-white p-5 shadow-[0_1px_2px_rgba(22,46,70,0.02)] sm:p-6">
      <div>
        <p className="text-xs text-[#708398]">{label}</p>
        <p className="mt-3 text-[31px] font-bold leading-none tracking-[-0.04em] text-[#142a41]">{value}</p>
        <p className="mt-3 text-xs text-[#718296]">{detail}</p>
      </div>
      <div className={`flex h-9 w-9 items-center justify-center rounded-md ${toneClasses[tone]}`}>{icon}</div>
    </div>
  );
}

function EmptyCollection({ onAdd, hasFilters }) {
  return (
    <div className="mt-5 flex min-h-[220px] flex-col items-center justify-center rounded-lg border border-dashed border-[#d8e1e7] bg-white px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f5f7] text-[#728292]"><BookOpen size={28} strokeWidth={1.7} /></div>
      <h3 className="mt-4 text-sm font-bold text-[#30475e]">{hasFilters ? 'No theses found' : 'No theses yet'}</h3>
      <p className="mt-2 max-w-sm text-xs leading-5 text-[#83909d]">{hasFilters ? 'Try a different search term or program filter.' : 'Add your first thesis to start building the collection.'}</p>
      {!hasFilters && <button onClick={onAdd} className="mt-4 text-xs font-bold text-[#1c547e] underline decoration-[#a7c0d0] underline-offset-4 transition hover:text-[#112f56]">Add your first thesis</button>}
    </div>
  );
}

function ThesisList({ theses }) {
  return (
    <div className="mt-5 space-y-3">
      {theses.map((thesis) => (
        <article key={thesis.id} className="rounded-lg border border-[#dce4e9] bg-white p-5 transition hover:border-[#b9cbd7] hover:shadow-[0_5px_16px_rgba(32,64,89,0.06)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-bold text-[#1b334c]">{thesis.title}</h3>
              <p className="mt-1 text-sm text-[#708195]">{thesis.authors}</p>
            </div>
            <span className="w-fit rounded-full bg-[#eef5f8] px-3 py-1 text-xs font-semibold text-[#39707b]">{thesis.year}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#65798c]">
            <span className="rounded bg-[#f5f7f8] px-2.5 py-1">{thesis.program}</span>
            {thesis.document && <span className="inline-flex items-center gap-1 text-[#23815f]"><Check size={14} /> PDF attached</span>}
          </div>
        </article>
      ))}
    </div>
  );
}

function AddThesisDrawer({ form, documentName, onChange, onDocumentChange, onClose, onSave }) {
  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-[#152b43]/25 backdrop-blur-[1px]" role="dialog" aria-modal="true" aria-labelledby="add-thesis-title">
      <div className="flex h-full w-full max-w-[672px] flex-col overflow-y-auto bg-white shadow-[-10px_0_40px_rgba(23,44,67,0.12)] animate-slide-in">
        <div className="flex items-start justify-between border-b border-[#e1e7eb] px-6 py-6 sm:px-7">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[-0.01em] text-[#5f7488]">Thesis collection</p>
            <h2 id="add-thesis-title" className="mt-2 text-[27px] font-bold leading-none tracking-[-0.035em] text-[#182e45]">Add thesis</h2>
            <p className="mt-2 text-sm text-[#718296]">Enter the research details and attach an optional PDF.</p>
          </div>
          <button onClick={onClose} aria-label="Close add thesis form" className="rounded-md p-1 text-[#1b2c3d] transition hover:bg-[#f2f5f7] hover:text-[#0e4d70]"><X size={21} strokeWidth={1.9} /></button>
        </div>

        <form onSubmit={onSave} className="flex flex-1 flex-col px-6 py-6 sm:px-7">
          <div className="space-y-4">
            <Field label="Thesis title" required>
              <input required value={form.title} onChange={(event) => onChange('title', event.target.value)} placeholder="Enter the full thesis title" className="form-control" />
            </Field>
            <Field label="Authors" required>
              <input required value={form.authors} onChange={(event) => onChange('authors', event.target.value)} placeholder="Full names, separated by commas" className="form-control" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-[1fr_154px]">
              <Field label="College program" required>
                <div className="relative"><select required value={form.program} onChange={(event) => onChange('program', event.target.value)} className="form-control appearance-none pr-10"><option value="">Select a program</option>{programs.map((program) => <option key={program}>{program}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#314a62]" size={17} /></div>
              </Field>
              <Field label="Publication year" required>
                <input required type="number" min="1900" max="2100" value={form.year} onChange={(event) => onChange('year', event.target.value)} placeholder="2026" className="form-control" />
              </Field>
            </div>
            <Field label="Abstract">
              <textarea value={form.abstract} onChange={(event) => onChange('abstract', event.target.value)} placeholder="Research summary, objectives and findings" className="form-control min-h-[84px] resize-y" />
            </Field>
            <Field label="Keywords">
              <input value={form.keywords} onChange={(event) => onChange('keywords', event.target.value)} placeholder="e.g. library management, information systems" className="form-control" />
            </Field>
            <label className="flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#d7e1e6] bg-[#f5f8f9] px-5 text-center transition hover:border-[#8ba6b7] hover:bg-[#f0f6f8]">
              <UploadCloud className="text-[#738494]" size={28} strokeWidth={1.7} />
              <span className="mt-2 text-sm font-bold text-[#5a6d7f]">Attach thesis document</span>
              <span className="mt-1 text-xs text-[#82909d]">PDF · up to 20 MB · optional</span>
              <span className="mt-2 max-w-full truncate rounded-md bg-white px-3 py-1 text-xs text-[#334b63] shadow-[0_1px_2px_rgba(31,57,78,0.04)]">{documentName || 'Choose File  No file chosen'}</span>
              <input type="file" accept="application/pdf,.pdf" onChange={onDocumentChange} className="sr-only" />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2 border-t border-[#e1e7eb] pt-5">
            <button type="button" onClick={onClose} className="rounded-md border border-[#d8e1e6] bg-white px-4 py-2.5 text-sm font-bold text-[#263a4f] transition hover:bg-[#f5f7f8]">Cancel</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-[#112f56] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#193c69] focus:outline-none focus:ring-2 focus:ring-[#86a7bd] focus:ring-offset-2"><Plus size={18} /> Save thesis</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, required, children }) {
  return <label className="block text-sm font-semibold text-[#1b3148]"><span className="mb-2 block text-[13px]">{label}{required && <span className="ml-1 text-[#c55454]">*</span>}</span>{children}</label>;
}

export default App;
  