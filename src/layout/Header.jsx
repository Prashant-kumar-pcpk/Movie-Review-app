
export default function Header() {
     
    return(
        <header className="border-b border-white/5 bg-red-900/50 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Movie Reviews App
          </h1>
          <p className="mt-2 max-w-2xl text-black/80 dark:text-white/80">
            Search the catalog, filter by genre or year, open a film for full details, and leave a star rating.
            Scores blend the catalog baseline with your pick.
          </p>
        </div>
      </header>
    )

}