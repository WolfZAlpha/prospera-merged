import faq_data from "@/data/FaqData"

const FaqArea = () => {
   return (
      <div className="pt-140 pb-140 overflow-hidden position-relative z-index-common">
         <div className="faq-2-shape-1"></div>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 text-center">
                  <div className="section-title mb-50">
                     <span className="sub-title">FAQ</span>
                     <h2 className="title style2">Popular questions about blockchain</h2>
                     <p className="sec-text">We’ve worked with over 400 companies to build blockchain solutions for their business, and we are still growing.</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               <div className="col-lg-10">
                  <div className="accordion-area accordion" id="faqAccordion">
                     {faq_data.filter((items) => items.page === "home_2").map((item) => (
                        <div key={item.id} className="accordion-card style2">
                           <div className="accordion-header" id={`collapse-item-${item.id}`}>
                              <button className={`accordion-button ${item.id === 1 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${item.id}`} aria-expanded="true" aria-controls={`collapse-${item.id}`}>{item.title}</button>
                           </div>
                           <div id={`collapse-${item.id}`} className={`accordion-collapse collapse ${item.id === 1 ? "show" : ""}`} aria-labelledby={`collapse-item-${item.id}`} data-bs-parent="#faqAccordion">
                              <div className="accordion-body">
                                 <p className="faq-text">{item.desc}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FaqArea
