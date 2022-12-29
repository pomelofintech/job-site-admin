import {
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import { getCompanyDetailsWithJobAdvert } from "../../lib/firebase";
import Creatable from "react-select/creatable";

const experienceLevelList = [
  {
    value: "Internship",
    label: "Internship",
  },
  {
    value: "Entry/Graduate",
    label: "Entry/Graduate",
  },
  {
    value: "Junior",
    label: "Junior",
  },
  {
    value: "Mid",
    label: "Mid",
  },
  {
    value: "Senior",
    label: "Senior",
  },
  {
    value: "Lead",
    label: "Lead",
  },
  {
    value: "Principle",
    label: "Principle",
  },
  {
    value: "Managment",
    label: "Managment",
  },
];

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
  const [lastName, setLastName] = useState(null);
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

  const addedAt = useRef(null);

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

  const [options1, setOptions] = useState([""]);

  useEffect(() => {
    const arr = [];

    const docRef = doc(
      getFirestore(),
      "jobAdvertDropdownData",
      "YUXBMQO8KCd57cRz3lyD"
    );
    // const arr = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    // setDocuments(data.docs.map((doc) => ({...doc.data(), id: doc.id})));

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      // console.log({...doc.data(), id: doc.id})
      // setLastName(doc.data());
      for (const key in doc.data().techStack) {
        const value = doc.data().techStack[key];
        console.log(key, value);
        return arr.push({ value: value, label: value });
      }

    });
    setOptions(arr);

    return () => unsubscribe();
  }, [slug]);



  console.log("last name");
  console.log(options1);
  // console.log(lastName?.techStack);

  // useEffect(() => {
  //   const getData = async () => {
  //     const arr = [];
  //     await axios.get(url).then((res) => {
  //       let result = res.data.items;
  //       result.map((user) => {
  //         return arr.push({ value: user.login, label: user.login });
  //       });
  //       setOptions(arr);
  //     });
  //   };
  //   getData();
  // }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    // if (reviewedToggle === false) {
    //   return setError("Error creating new company, please try again");
    // }
    // console.log(companyName.current.value, backgroundImageUrl.current.value)

    const newCompanyDoc = doc(getFirestore(), "companyDetails", s);
    setError("");
    try {
      // console.log("This is the company name: " + companyName.current.value);
      // console.log("this is the check box: " + reviewedToggle.current.checked);
      // console.log(jobData.companySectors);
      // console.log(selected);

      const batch = writeBatch(getFirestore());
      batch.update(newCompanyDoc, {
        reviewed: reviewedToggle.current.checked,
        slug: s,
        uid: s,
        addedAt: serverTimestamp(),
      });

      await batch.commit();
    } catch (err) {
      return toast.success("Error updating company details, please try again");
    }
    router.push("/jobs-review");
    return toast.success("Company details updated");
  };

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
                <textarea
                  defaultValue={jobAdvertData?.aboutTheCompany}
                  id="aboutCompnay"
                  name="aboutCompnay"
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
              <label
                htmlFor="candidateRequiredSkills"
                className="gNTSvw question"
              >
                Candidate Required Skills
              </label>
              <div className="cqMAuL">
                <Creatable
                  id="candidateRequiredSkills"
                  name="candidateRequiredSkills"
                  placeholder="Select an individual"
                  options={options1}
                  isMulti
                  noOptionsMessage={() => "name not found"}
                ></Creatable>
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
                <textarea
                  id="interviewProcess"
                  name="interviewProcess"
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
