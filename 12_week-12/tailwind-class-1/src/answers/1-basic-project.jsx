// sm md lg xl 2xl these are the break points in tailwind for responsiveness

export function SidebarClass1() {
  return (
    <div className="flex">
      <div className="bg-red-200 transition-all ease-in-out delay-500 duration-500 md:translate-x-0 -translate-x-80 h-screen w-0 md:w-80">
        Sidebar
      </div>
      {/* <div className="bg-red-200 w-96 h-screen transition-all ease-in delay-150 -translate-x-80 duration-1000 md:translate-x-0  ">
        Sidebar
      </div> */}
      <div className="bg-green-800 flex-1 h-screen ">Content</div>
    </div>
  );
}
