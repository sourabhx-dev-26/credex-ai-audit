export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_20px_white]" />

          <span className="text-sm font-medium tracking-wide text-white">
            CREDEX
          </span>
        </div>

        <nav className="hidden items-center gap-10 md:flex">
          <a
            href="#"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Product
          </a>

          <a
            href="#"
            className="text-sm text-white/60 transition hover:text-white"
          >
            Savings
          </a>

          <a
            href="#"
            className="text-sm text-white/60 transition hover:text-white"
          >
            FAQ
          </a>
        </nav>

        <a
          href="#audit-form"
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
        >
          Start Audit
        </a>
      </div>
    </header>
  );
}