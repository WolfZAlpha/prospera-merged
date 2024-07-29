import Link from "next/link"

const Error = () => {
   return (
      <>
         <main>
            <section className="eg-error__area">
               <div className="container">
                  <div className="row justify-content-center">
                     <div className="col-xxl-6 col-xl-7 col-lg-9 col-md-10">
                        <div className="eg-error__content text-center">
                           <h2 className="eg-error__title">404</h2>
                           <p>&quot;Sorry, the page you are looking for could not be found&quot;</p>
                           <Link className="btn" href="/">Back to home</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>
      </>
   )
}

export default Error
