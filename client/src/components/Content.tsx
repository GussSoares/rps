import { Children, JSX } from "react"

export function Content({ children }: {children: JSX.Element[] | JSX.Element}) {
  return (
    <main
      style={{
        marginLeft: "20px",
        marginTop: "80px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Montserrat"
      }}
    >{
      Children.map(children, child => (
        <div>
          {child}
        </div>
      ))
    }</main>
  )
}
