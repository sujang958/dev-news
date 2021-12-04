import { FC } from "react"
import Header from "./header"

const Layout: FC = ({ children }) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0">
        <Header />
      </header>
      <div className="pt-14">{children}</div>
    </>
  )
}

export default Layout
