import DocumentForm from "../forms/DocumentForm"
import Image from "next/image"

import docShape from "@/assets/img/images/document_shape.png"

interface Document {
  name: string;
  link: string;
}

const doc_data: Document[] = [
  { 
    name: "Whitepaper", 
    link: "/documents/ProsperaWhitepaper.pdf" 
  },
  { 
    name: "White Paper Overview", 
    link: "https://prosperadefi.substack.com/p/prosperaoverview?r=3hh5aq&utm_campaign=post&utm_medium=web&triedRedirect=true" 
  }
];

const DocumentArea: React.FC = () => {
   return (
      <section className="document-area">
         <div className="container">
            <div className="document-inner-wrap">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="section-title text-center mb-60">
                        <h2 className="title">Have Any Questions?</h2>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-8">
                     <div className="document-form-wrap">
                        <h4 className="title">Get In Touch Now</h4>
                        <DocumentForm />
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="document-wrap">
                        <h4 className="title">Read Documents</h4>
                        <ul className="list-wrap">
                           {doc_data.map((doc, i) => (
                              <li key={i}>
                                 <a 
                                    href={doc.link}
                                    download={doc.name === "Whitepaper" ? "ProsperaWhitepaper.pdf" : undefined}
                                    target={doc.name === "Whitepaper" ? undefined : "_blank"}
                                    rel={doc.name === "Whitepaper" ? undefined : "noopener noreferrer"}
                                 >
                                    <span className="icon"><i className="fas fa-file-pdf"></i></span>
                                    {doc.name}
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="document-shape">
            <Image src={docShape} alt="" className="alltuchtopdown" />
         </div>
      </section>
   )
}

export default DocumentArea