import { doc, getFirestore, onSnapshot, serverTimestamp, writeBatch } from "firebase/firestore";
import router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import CompanyDetails from "../company-details";
import Toggle from "react-toggle";
import "react-toggle/style.css" // for ES6 modules
import toast from "react-hot-toast";
import { validateHeaderValue } from "http";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


export default function JobsLive(props) {
  const [jobAdvertData, setJobAdvertData] = useState(null);
  const [companyAdvertData, setCompanyAdvertData] = useState(null);
  const [jobAdvertID, setJobAdvertID] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;
  const [user] = useAuthState(auth);



  const fetchJobAdvertData = async () => {
    console.log("I have ran");
    // setLoading(true);
    try {
      const responseJobAdvert = doc(getFirestore(), "jobAdvert", s);
      const unsubscribe = onSnapshot(responseJobAdvert, async (doc) => {
        setJobAdvertData(doc.data());
        // const com = await getCompanyDetailsWithJobAdvert(doc.data().uid);
        // setCompanyAdvertData(com);
        // console.log(com);
      });
      setLoading(false);

      return unsubscribe;
      // }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobAdvertData();
  }, [getFirestore(), user]);

  console.log("This is " + jobAdvertData);

  return (
    <AuthCheck>
      {/* <Loader show={loading} /> */}

      <div id="" className="settings_page min_view">
        <div className="fXgiup block">
          {/* <JobAdvertCompanyDetails
              jobData={jobAdvertData}
              companyData={companyAdvertData}
            /> */}
          <JobsLiveView jobData={jobAdvertData} />
        </div>
      </div>
    </AuthCheck>
  );
}

function JobsLiveView(props) {
  const liveToggle = useRef(null);
  const reviewedToggle = useRef(null);
  const [error, setError] = useState("");
  const [value, setValue] = useState(props.jobData?.reviewed);

  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;

  console.log(props.jobData);

  const updateJobViewState = async (e) => {
    e.preventDefault();
    setError("");

    const newCompanyDoc = doc(getFirestore(), "jobAdvert", s);
    setError("");
    try {
      const batch = writeBatch(getFirestore());
      batch.set(newCompanyDoc, {
        reviewed: Boolean(liveToggle),
        published: Boolean(reviewedToggle),
        updatedAt: serverTimestamp(),
      });

      await batch.commit();
    } catch (err) {
      return toast.success("Error creating new company, please try again");
    }
    router.push('/live-jobs');
    return toast.success("Live job view updated");

  };

  const handleChange = (event) => {
    setValue(event.value);
  };

  console.log(reviewedToggle);
  console.log(typeof (props.jobData?.reviewed));


  return (

    <div className="fNgGjC content">
      <h2 className="settings-title block_title">Job reviewed and published</h2>

      <p>This is where we can remove jobs from the platform by setting reviewed and published to be false. Be aware this will remove the role straight away.</p>
      <div className="eHIaoM">
        <div>

          <div className="jBUQajq field">
            <label htmlFor="reviewedCheckbox" className="gNTSvw question">Has the role been reviewed? </label>
            <div className="cqMAuL">
              <input
                type="checkbox"
                id="reviewedCheckbox"
                defaultChecked={props.jobData?.reviewed}
                ref={reviewedToggle}
                // required
                style={{ width: 30 }}
              />
            </div>
          </div>


          <div className="jBUQajq field">
            <label htmlFor="liveCheckbox" className="gNTSvw question">Do you want the role published (live)? </label>
            <div className="cqMAuL">
              <input
                type="checkbox"
                id="liveCheckbox"
                defaultChecked={props.jobData?.published}
                ref={liveToggle}
                // required
                style={{ width: 30 }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="set-btn"
            // onClick={null}
            onClick={updateJobViewState}
          >
            Update
          </button>
        </div>
        <p>{error}</p>

      </div>
    </div>
  );
} 