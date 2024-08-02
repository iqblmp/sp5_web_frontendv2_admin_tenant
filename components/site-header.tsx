import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

export function SiteHeader() {
  return (
    <header className="bg-background  backdrop-blur-3xl  sticky top-0 z-40 w-full border-b ">
      <div className="container flex h-16 items-center w-full sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
      </div>
    </header>
  )
}
