import { doc, getFirestore, onSnapshot, serverTimestamp, writeBatch } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import { getCompanyDetailsWithJobAdvert } from "../../lib/firebase";

export default function JobReviewSpec() {


  return (
    <AuthCheck>
      <div id="" className="settings_page min_view">
        <div className="fXgiup block">
          <CompanyDetails />
        </div>
      </div>
    </AuthCheck>
  );
}

function CompanyDetails(props) {
  const router = useRouter();
  const [lastName, setLastName] = useState("");
  const [jobAdvertData, setJobAdvertData] = useState(null);
  const [companyAdvertData, setCompanyAdvertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;
  const [error, setError] = useState("");


  const aboutTheCompany = useRef(null);
  const aboutTheRole = useRef(null);
  const employmentType = useRef(null);
  const applicationApplyUrl = useRef(null);
  const interviewProcess = useRef(null);
  const jobTitle = useRef(null);
  const workplaceType = useRef(null);
  const visaSponsorship = useRef(null);
  const reviewedToggle = useRef(null);




  useEffect(() => {
    const fetchJobAdvertData = async () => {
      setLoading(true);
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
    fetchJobAdvertData();
  }, [getFirestore(), s]);


  // const submit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   // if (reviewedToggle === false) {
  //   //   return setError("Error creating new company, please try again");
  //   // }
  //   // console.log(companyName.current.value, backgroundImageUrl.current.value)

  //   const newCompanyDoc = doc(getFirestore(), "companyDetails", s);
  //   setError("");
  //   try {
  //     // console.log("This is the company name: " + companyName.current.value);
  //     // console.log("this is the check box: " + reviewedToggle.current.checked);
  //     // console.log(jobData.companySectors);
  //     // console.log(selected);


  //     const batch = writeBatch(getFirestore());
  //     batch.update(newCompanyDoc, {
  
  //       reviewed: reviewedToggle.current.checked,
  //       slug: s,
  //       uid: s,
  //       addedAt: serverTimestamp(),
  //     });


  //     await batch.commit();
  //   } catch (err) {
  //     return toast.success("Error updating company details, please try again");
  //   }
  //   router.push('/jobs-review');
  //   return toast.success("Company details updated");

  // };
  

  return (
    <div className="fNgGjC content">
      <h2 className="settings-title block_title">Company Details</h2>
      <div className="eHIaoM">
        <div>
          <form onSubmit={null}>
            <div className="jBUQajq field">
              <label htmlFor="email" className="gNTSvw question">
                About the company
              </label>
              <div className="cqMAuL">
                <input
                  defaultValue={jobAdvertData?.aboutTheCompany}
                  id="aboutCompnay"
                  name="aboutCompnay"
                  type="text"
                  className="SDDHw"
                  ref={aboutTheCompany}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="aboutTheRole" className="gNTSvw question">
                About the role
              </label>
              <div className="cqMAuL">
                <textarea
                  id="aboutTheRole"
                  name="aboutTheRole"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.aboutTheRole}
                  ref={aboutTheRole}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="salary" className="gNTSvw question">
                Salary bands
              </label>
              <div className="cqMAuL">
                <input
                  id="salary"
                  name="salary"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.salary}
                  // ref={salary}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="candidateRequiredSkills" className="gNTSvw question">
                Candidate Required Skills
              </label>
              <div className="cqMAuL">
                <input
                  id="candidateRequiredSkills"
                  name="candidateRequiredSkills"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.candidateRequiredSkills}
                  // ref={candidateRequiredSkills}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="candidateSkills" className="gNTSvw question">
                Candidate Skills
              </label>
              <div className="cqMAuL">
                <input
                  id="candidateSkills"
                  name="candidateSkills"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.candidateSkills}
                  // ref={candidateSkills}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="companyBenefits" className="gNTSvw question">
                Company Benefits
              </label>
              <div className="cqMAuL">
                <input
                  id="companyBenefits"
                  name="companyBenefits"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.companyBenefits}
                  // ref={companyBenefits}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="employmentType" className="gNTSvw question">
                Employment type
              </label>
              <div className="cqMAuL">
                <input
                  id="employmentType"
                  name="employmentType"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.employmentType}
                  ref={employmentType}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Experience level
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.}
                  // ref={}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="interviewProcess" className="gNTSvw question">
                Interview process
              </label>
              <div className="cqMAuL">
                <input
                  id="interviewProcess"
                  name="interviewProcess"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.interviewProcess}
                  ref={interviewProcess}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="jobTitle" className="gNTSvw question">
                Job title
              </label>
              <div className="cqMAuL">
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.jobTitle}
                  ref={jobTitle}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Job title tags
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.employmentType}
                  // ref={employmentType}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Primary Skills
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.employmentType}
                  // ref={employmentType}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="workplaceType" className="gNTSvw question">
                Workplace type
              </label>
              <div className="cqMAuL">
                <input
                  id="workplaceType"
                  name="workplaceType"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.workplaceType}
                  ref={workplaceType}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Tech stack
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.employmentType}
                  // ref={employmentType}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="visaSponsorship" className="gNTSvw question">
                Visa sponsorship
              </label>
              <div className="cqMAuL">
                <input
                  id="visaSponsorship"
                  name="visaSponsorship"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.visaSponsorship}
                  ref={visaSponsorship}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="lastName" className="gNTSvw question">
                Link to company name
              </label>
              <div className="cqMAuL">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="SDDHw"
                  // defaultValue={jobAdvertData?.}
                  // ref={}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="applicationApplyUrl" className="gNTSvw question">
                Application URL
              </label>
              <div className="cqMAuL">
                <input
                  id="applicationApplyUrl"
                  name="applicationApplyUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={jobAdvertData?.applicationApplyUrl}
                  ref={applicationApplyUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="reviewedCheckbox" className="gNTSvw question">
                Role Reviewed
              </label>
              <div className="cqMAuL">
                <input
                  type="checkbox"
                  id="reviewedCheckbox"
                  defaultChecked={jobAdvertData?.reviewed}
                  ref={reviewedToggle}
                  // required
                  style={{ width: 30 }}
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
