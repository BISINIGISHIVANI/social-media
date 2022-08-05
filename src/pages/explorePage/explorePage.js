import { Navbar,Sidebar } from "../../components";
const ExplorePage = () => {
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
              Random Posts
            </div>
          </section>
          <aside className="padding-edges aside">
           {/* suggetUser  */}
          </aside>
        </section>
      </div>
    </div>
  );
};
export { ExplorePage };
