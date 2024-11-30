// import { SidebarClass1 } from "./answers/1-basic-project";
// import FlexExample from "./FlexExample";
// import GridExample from "./GridExample";
// import Project from "./project";
import { useState } from "react";
import { SlideIcon } from "./icons/slideicon";
import ResponsivenessExample from "./responsiveness_example";


// Create a functional component App that will be rendered in the root element
function App() {
    const [sideBarOpen , setSideBarOpen] = useState(true);
    
    // Return the JSX of the App component
    return (
        <div className="flex">
            {/* This div will have a background color of light blue
            <div className="bg-blue-200">Hi</div>

            {/* This div will have a background color of blue because we have changed the color of red-500 to blue in the tailwind.config.js file */}
            {/* <div className="bg-red-500">Hi</div>

            <div className="h-24 w-24 bg-purple-800 mt-3 ml-3 rounded-md border-2 border-red-600"></div>

             <FlexExample />

           <GridExample />

            <ResponsivenessExample /> */}
         {/* <SidebarClass1/> */}
          <SlideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
          <MainContent sideBarOpen={sideBarOpen}/>
        </div>
    );
}
function SlideBar({sideBarOpen , setSideBarOpen}){
    if(sideBarOpen){ // side bar open hai 
        return <div className="w-64 bg-red-300 h-screen transition-all duration-150 delay-150 ease-in-out absolute md:relative">
            <div onClick={()=> setSideBarOpen(!sideBarOpen)} >
            <SlideIcon/>
            </div>
        </div>
    }
   if(!sideBarOpen){ // side bar close hai
        return <div className="w-5 top-0 left-0 bg-red-300 h-screen transition-all duration-150 delay-150 ease-in-out  absolute md:relative">
                <div onClick={()=> setSideBarOpen(!sideBarOpen)} >
                <SlideIcon/>
                </div>
            </div>
   }
}
function MainContent({sideBarOpen}){
    return <div className="w-full">
      <div className="h-72 bg-black text-white relative z-0 hidden md:block">Image</div>
      <div className="grid grid-cols-11 gap-5 p-3">
        <div className="h-96 rounded-2xl  bg-red-200 md:col-span-3 -translate-y-24 shadow-lg col-span-11 hidden md:block"></div>
        <div className="h-96 rounded-2xl  bg-green-200 md:col-span-6  shadow-lg  col-span-11"></div>
        <div className="h-96 rounded-2xl  bg-yellow-200 md:col-span-2  shadow-lg  col-span-11"></div>
      </div>
    </div>
}

// Exporting the App component as default to be used in other components or files
export default App;
