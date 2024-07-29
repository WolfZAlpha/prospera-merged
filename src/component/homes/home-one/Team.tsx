"use client"
import { useEffect, useRef, useState } from "react";
import Image from "next/image"
import TeamFounder from "./TeamFounder"
import team_data from "@/data/TeamData";
import Link from "next/link";

import team_bg from "@/assets/img/update/bg/bg-gradient1-1.jpg"

const Team = () => {
   // Init one ref to store the future Isotope object
   const isotope = useRef<{ arrange?: Function; destroy?: Function } | null>(null);
   // Store the filter keyword in a state
   const [filterKey, setFilterKey] = useState("cat1"); // Setting filterKey to "cat1" for initial display

   // Initialize an Isotope object with configs
   useEffect(() => {
      if (typeof window !== "undefined") {
         const Isotope = require("isotope-layout");

         isotope.current = new Isotope(".filter-active-cat1", {
            itemSelector: ".filter-item",
            layoutMode: "fitRows",
         });

         // Cleanup
         return () => {
            isotope.current?.destroy?.();
         };
      }
   }, []);

   // Handling filter key change
   useEffect(() => {
      if (filterKey === "*") isotope.current?.arrange?.({ filter: "*" });
      else isotope.current?.arrange?.({ filter: `.${filterKey}` });
   }, [filterKey]);

   const [selectedFilter, setSelectedFilter] = useState("cat1"); // Setting selectedFilter to "cat1" for initial display

   const handleFilterKeyChange = (key: any) => () => {
      setFilterKey(key);
      setSelectedFilter(key);
   };

   return (
      <div className="pt-130 pb-140 overflow-hidden position-relative z-index-common">
         <div className="bg-gradient-3">
            <Image src={team_bg} alt="img" />
         </div>
         <TeamFounder />

         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="text-center">
                     <div className="team-tab-btn filter-menu-active">
                        <button data-filter=".cat1" className={selectedFilter === "cat1" ? "active" : ""} onClick={handleFilterKeyChange("cat1")} type="button">Advisory Team</button>
                        <button data-filter=".cat2" className={selectedFilter === "cat2" ? "active" : ""} onClick={handleFilterKeyChange("cat2")} type="button">Management Team</button>
                        <button data-filter=".cat3" className={selectedFilter === "cat3" ? "active" : ""} onClick={handleFilterKeyChange("cat3")} type="button">Marketing Team</button>
                     </div>
                  </div>

                  <div className="filter-active-cat1">
                     {team_data.map((item) => (
                        <div key={item.id} className={`team-tab-content filter-item ${item.category}`}>
                           <ul className="team-tab-list">
                              {item.team_data.map((t_item) => (
                                 <li key={t_item.id}>
                                    <div className="team-card">
                                       <div className="team-card_img">
                                          <Image src={t_item.thumb} alt="Team Image" />
                                          <div className="social-btn">
                                             <Link href="https://www.linkedin.com/">
                                                <i className="fab fa-linkedin"></i>
                                             </Link>
                                          </div>
                                       </div>
                                       <div className="team-card_content">
                                          <h3 className="team-card_title"><Link href="#">{t_item.name}</Link></h3>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

      </div>
   )
}

export default Team