import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import { getCompanyDetailsWithJobAdvert } from "../../lib/firebase";

export default function JobReviewSpec(props) {
  const [jobAdvertData, setJobAdvertData] = useState(null);
  const [companyAdvertData, setCompanyAdvertData] = useState(null);
  const [jobAdvertID, setJobAdvertID] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug

  useEffect(() => {
    const fetchJobAdvertData = async () => {
      setLoading(true)
      try {
          const responseJobAdvert = doc(getFirestore(), 'clientTest', s);  
          const unsubscribe = onSnapshot(responseJobAdvert, async (doc) => {
            setJobAdvertData(doc.data());
            // const com = await getCompanyDetailsWithJobAdvert(doc.data().uid);
            // setCompanyAdvertData(com);
            // console.log(com);
          });
          setLoading(false)
  
  
          return unsubscribe;
        // }
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobAdvertData();
  }, [getFirestore(), s]);

  return (
    <AuthCheck>
                  <Loader show={loading} />

      <div id="" className="settings_page min_view">
        <div className="fXgiup block">
          {/* <JobAdvertCompanyDetails
              jobData={jobAdvertData}
              companyData={companyAdvertData}
            /> */}
          <CompanyDetails jobData={jobAdvertData} />
        </div>
      </div>
    </AuthCheck>
  );
}

function CompanyDetails(props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  console.log("hi H");
  console.log(props.jobData);
  console.log(props.jobData?.jobTitle);

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
                  className="SDDHw"
                  value={props.jobData?.jobTitle}
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
