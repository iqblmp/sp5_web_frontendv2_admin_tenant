import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

export function SiteHeader() {
  return (
    <header className="bg-gradient-to-b dark:bg-gradient-to-t from-sky-500 via-sky-600 to-sky-700 text-white  sticky top-0 z-50 w-full border-b ">
      <div className="container flex h-16 items-center w-full sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
      </div>
    </header>
  )
}
