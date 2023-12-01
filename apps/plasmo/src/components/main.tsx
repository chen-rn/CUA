import { useState } from "react"
import { SignUpSignInComponent } from '@my/ui/src/components/SignUpSignIn';

export function Main({ name = "Extension" }) {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> {name}!
      </h1>
      <input onChange={(e) => setData(e.target.value)} value={data} />

	  <SignUpSignInComponent type="sign-up" handleOAuthWithPress={() => {}} handleEmailWithPress={() => {}} />
      <a href="https://docs.plasmo.com">READ THE DOCS!</a>
    </div>
  )
}
