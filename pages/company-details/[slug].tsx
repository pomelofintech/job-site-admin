import { doc, getFirestore, onSnapshot, serverTimestamp, writeBatch } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import "react-toggle/style.css" // for ES6 modules
import toast from "react-hot-toast";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";


const data = [
  { value: "1", label: "Fintech" },
  { value: "2", label: "AI" },
  { value: "3", label: "Healthcare" },
  { value: "4", label: "Eduction" },
  { value: "5", label: "Travel" },
  { value: "6", label: "Security" },
  { value: "7", label: "Wellbeing" },
  { value: "8", label: "Food" },
  { value: "9", label: "Banking" },
  { value: "10", label: "Entertainment" },
  { value: "11", label: "Food" },
  { value: "12", label: "Banking" },
  { value: "13", label: "Sustainability" },
  { value: "14", label: "Agriculture" },
  { value: "15", label: "Insurance" },
  { value: "16", label: "Technology" },
  { value: "17", label: "Marketing" },
  { value: "18", label: "HR" },
  { value: "19", label: "Machine Learning" },
  { value: "20", label: "Entertainment" },
  { value: "21", label: "Communication" },
  { value: "22", label: "Logistics" },
  { value: "23", label: "Healthcare" },
  { value: "24", label: "Property" },
  { value: "25", label: "Social Impact" },
  { value: "26", label: "Media" },
  { value: "27", label: "Financial Services" },
  { value: "28", label: "Adertising" },
  { value: "29", label: "Personal Health" },
  { value: "30", label: "Recruitment" },
  { value: "31", label: "Digital Media" },
  { value: "32", label: "Lifestyle" },
  { value: "33", label: "Cloud Computing" },
  { value: "34", label: "Eduction" },
  { value: "34", label: "Learning" },
  { value: "36", label: "Something else?" },
];

export default function JobReviewSpec() {
  const [jobAdvertData, setJobAdvertData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    console.log("This ran again");
    setLoading(true);
    fetchJobAdvertData();
    setLoading(false);
  }, [getFirestore(), s]);

  const fetchJobAdvertData = async () => {
    try {
      const responseJobAdvert = doc(getFirestore(), "companyDetails", s);
      const subscriber = onSnapshot(responseJobAdvert, async (doc) => {
        setJobAdvertData(doc.data());
      });

      return () => subscriber();
      // }
    } catch (err) {
      console.error(err);
    }
  };
  console.log("this is the first load" + jobAdvertData);

  return (
    <AuthCheck>
      <div id="" className="settings_page min_view">
        <div className="fXgiup block">
          {/* <JobAdvertCompanyDetails
              jobData={jobAdvertData}
              companyData={companyAdvertData}
            /> */}
          {!isLoading ? <CompanyDetails jobData={jobAdvertData} /> : <Loader show={isLoading} />}
        </div>
      </div>
    </AuthCheck>
  );
}

function CompanyDetails(props) {

  const companyName = useRef(null);
  const backgroundImageUrl = useRef(null);
  const companyMission = useRef(null);
  const wesbiteUrl = useRef(null);
  const twitterUrl = useRef(null);
  const instagramUrl = useRef(null);
  const facebookUrl = useRef(null);
  const linkedinUrl = useRef(null);
  const [selectedSectors, setSelected] = useState([props.jobData?.companySectors]);
  const companyLogoUrl = useRef(null);
  const addressLn1 = useRef(null);
  const addressLn2 = useRef(null);
  const city = useRef(null);
  const postCode = useRef(null);
  const [error, setError] = useState("");
  const reviewedToggle = useRef(null);

  const animatedComponents = makeAnimated();

  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;

  // used for the drop down
  const handleSelect = (options: readonly { label: string }[]) => {
    const selectedInput = options.map((options) => options.label);
    setSelected(selectedInput);
  };


  let countriesList = props.jobData?.companySectors.length > 0
    && props.jobData?.companySectors.map((item, i) => {
      console.log(item, i);
    return (
      <option value={item.id}>{item}</option>
    )
  }, this);


  const submit = async (e) => {
    e.preventDefault();
    setError("");
    // if (reviewedToggle === false) {
    //   return setError("Error creating new company, please try again");
    // }
    console.log(companyName.current.value, backgroundImageUrl.current.value)

    const newCompanyDoc = doc(getFirestore(), "companyDetails", s);
    setError("");
    try {
      console.log("This is the company name: " + companyName.current.value);
      console.log("this is the check box: " + reviewedToggle.current.checked);
      console.log(props.jobData?.companySectors);
      console.log(selectedSectors);


      // const batch = writeBatch(getFirestore());
      // batch.update(newCompanyDoc, {
      //   companyName: companyName.current.value,
      //   backgroundImage: backgroundImageUrl.current.value,
      //   companyMission: companyMission.current.value,
      //   website: wesbiteUrl.current.value,
      //   twitter: twitterUrl.current.value,
      //   instagram: instagramUrl.current.value,
      //   facebook: facebookUrl.current.value,
      //   linkedin: linkedinUrl.current.value,
      //   logo: companyLogoUrl.current.value,
      //   companySectors: selectedSectors, // needs to be saved as array
      //   addressLn1: addressLn1.current.value,
      //   addressLn2: addressLn2.current.value,
      //   city: city.current.value,
      //   postCode: postCode.current.value,
      //   reviewed: reviewedToggle.current.checked,
      //   slug: s,
      //   uid: s,
      //   addedAt: serverTimestamp(),
      //   companyCreation: true,
      // });


      // await batch.commit();
    } catch (err) {
      return toast.success("Error creating new company, please try again");
    }
    // router.push('/company-details');
    return toast.success("New company added");

  };
  return (
    <div className="fNgGjC content">
      <h2 className="settings-title block_title">Company Details</h2>
      <div className="eHIaoM">
        <div>
          <form onSubmit={submit}>

            <div className="jBUQajq field">
              <label htmlFor="backgroundImageUrl" className="gNTSvw question">
                Background Image URL - Upload image to firebase storage manaually
              </label>
              <div className="cqMAuL">
                <input
                  id="backgroundImageUrl"
                  name="backgroundImageUrl"
                  type="text"
                  className="SDDHw"
                  // this works only on input field only
                  defaultValue={props.jobData?.backgroundImage}
                  ref={backgroundImageUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="companyName" className="gNTSvw question">
                Company Name
              </label>
              <div className="cqMAuL">
                <textarea
                  id="companyName"
                  name="companyName"
                  className="SDDHw"
                  defaultValue={props.jobData?.companyName}
                  ref={companyName}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="companyMission" className="gNTSvw question">
                Company Mission
              </label>
              <div className="cqMAuL">
                <textarea
                  id="companyMission"
                  name="companyMission"
                  className="SDDHw"
                  defaultValue={props.jobData?.companyMission}
                  ref={companyMission}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="websiteUrl" className="gNTSvw question">
                Website URL
              </label>
              <div className="cqMAuL">
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.website}
                  ref={wesbiteUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="twitterUrl" className="gNTSvw question">
                Twitter URL
              </label>
              <div className="cqMAuL">
                <input
                  id="twitterUrl"
                  name="twitterUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.twitter}
                  ref={twitterUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="instagramUrl" className="gNTSvw question">
                Instagram URL
              </label>
              <div className="cqMAuL">
                <input
                  id="instagramUrl"
                  name="instagramUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.instagram}
                  ref={instagramUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="facebookUrl" className="gNTSvw question">
                Facebook URL
              </label>
              <div className="cqMAuL">
                <input
                  id="facebookUrl"
                  name="facebookUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.facebook}
                  ref={facebookUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="linkedinUrl" className="gNTSvw question">
                Linkedin URL
              </label>
              <div className="cqMAuL">
                <input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.linkedin}
                  ref={linkedinUrl}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="companyLogoUrl" className="gNTSvw question">
                Company Logo URL - manaually upload to firebase storage
              </label>
              <div className="cqMAuL">
                <input
                  id="companyLogoUrl"
                  name="companyLogoUrl"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.logo}
                  ref={companyLogoUrl}
                />
              </div>
            </div>

            {/* <div className="jBUQajq field">
              <label htmlFor="companySectors" className="gNTSvw question">
                Company Sectors
              </label>
              <div className="cqMAuL">
                <input
                  id="companySectors"
                  name="companySectors"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.companySectors}
                  ref={companySectors}
                />
              </div>
            </div> */}

            <div className="jBUQajq field">
              <label htmlFor="companySectors" className="gNTSvw question">
                Company Sectors
              </label>
              <div className="cqMAuL">
              <Select
                isMulti={true}
                name="colors"
                options={data}
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable
                closeMenuOnSelect={false}
                hideSelectedOptions={true}
                components={animatedComponents}
                onChange={handleSelect}
                value={countriesList}
              />
              </div>
            </div>



            <div className="jBUQajq field">
              <label htmlFor="addressLn1" className="gNTSvw question">
                Address line 1
              </label>
              <div className="cqMAuL">
                <input
                  id="addressLn1"
                  name="addressLn1"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.addressLn1}
                  ref={addressLn1}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="addressLn2" className="gNTSvw question">
                Address line 2
              </label>
              <div className="cqMAuL">
                <input
                  id="addressLn2"
                  name="addressLn2"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.addressLn2}
                  ref={addressLn2}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="city" className="gNTSvw question">
                City
              </label>
              <div className="cqMAuL">
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.city}
                  ref={city}
                />
              </div>
            </div>

            <div className="jBUQajq field">
              <label htmlFor="postCode" className="gNTSvw question">
                Post code
              </label>
              <div className="cqMAuL">
                <input
                  id="postCode"
                  name="postCode"
                  type="text"
                  className="SDDHw"
                  defaultValue={props.jobData?.postCode}
                  ref={postCode}
                // required
                />
              </div>
            </div>
            <div className="jBUQajq field">
              <label htmlFor="reviewedCheckbox" className="gNTSvw question">Company information reviewed? </label>
              <div className="cqMAuL">
                <input
                  type="checkbox"
                  id="reviewedCheckbox"
                  defaultChecked={props.jobData?.reviewedToggle}
                  ref={reviewedToggle}
                />
              </div>
            </div>
            <button
              type="submit"
              value="Submit"
              className="set-btn"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
