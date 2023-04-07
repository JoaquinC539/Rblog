import { Link } from "react-router-dom"
const Missing = () => {
    return (
      <main className="Missing">
        <h2>Page not Found</h2>
        <p>Well. that's dissapointing</p>
        <p><Link to="/">Visit our homepage</Link></p>
      </main>
    )
  }
  
  export default Missing