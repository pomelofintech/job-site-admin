import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import { getCompanyDetailsWithJobAdvert } from "../../lib/firebase";

export default function JobReviewSpec(props) {
    const [jobAdvertData, setJobAdvertData] = useState(null);
    const [companyAdvertData, setCompanyAdvertData] = useState(null);
    const [jobAdvertID, setJobAdvertID] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchJobAdvertData = async () => {
        try {
          const responseJobAdvert = await doc(
            getFirestore(),
            "jobAdvert",
            "xPxHU7pCCJxPfcLEYUv0"
          );
  
          const unsubJobA = onSnapshot(responseJobAdvert, async (doc) => {
            setJobAdvertData(doc.data());
            const com = await getCompanyDetailsWithJobAdvert(doc.data().uid);
            setCompanyAdvertData(com);
            // console.log(com);
          });
  
          return unsubJobA;
        } catch (err) {
          console.error(err);
        }
      };
      fetchJobAdvertData();
    }, []);
  
    return (
      <AuthCheck>
        <div id="" className="settings_page min_view">
          <div className="fXgiup block">
            {/* <JobAdvertCompanyDetails
              jobData={jobAdvertData}
              companyData={companyAdvertData}
            /> */}
            <CompanyDetails />
            </div>
        </div>
      </AuthCheck>
    );
  }

function CompanyDetails() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  return (
          <div className="fNgGjC content">
            <h2 className="settings-title block_title">Company Details</h2>
            <div className="eHIaoM">
              <div>
                <form onSubmit={null}>
                  <div className="jBUQajq field">
                    <label htmlFor="email" className="gNTSvw question">
                      Email
                    </label>
                    <div className="cqMAuL">
                      <input
                        // defaultValue={doc.email}
                        id="email"
                        name="email"
                        type="text"
                        className="sc-bkzYnD SDDHw"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="jBUQajq field">
                    <label htmlFor="firstName" className="gNTSvw question">
                      First Name
                    </label>
                    <div className="cqMAuL">
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="SDDHw"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="jBUQajq field">
                    <label htmlFor="lastName" className="gNTSvw question">
                      Last Name
                    </label>
                    <div className="cqMAuL">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="SDDHw"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <button type="submit" className="set-btn">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
  );
  
}