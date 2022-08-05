import { Navbar,Sidebar } from "../../components"
const ProfilePage=()=>{
 return (
    <div>
      <Navbar />
      <div className="flex-row">
        <div>
          <Sidebar />
        </div>
        <section className="flex-row main-content">
          <section className="bd-sm content flex-col gap">
            <div className="flex-col gap">
              ProfilePage Page
            </div>
          </section>
        </section>
        </div>
    </div>
)
}
export {ProfilePage}