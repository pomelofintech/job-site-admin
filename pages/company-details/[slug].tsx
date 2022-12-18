import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, serverTimestamp, writeBatch } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import "react-toggle/style.css" // for ES6 modules
import toast from "react-hot-toast";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import React from "react";
import { renderToHTML } from "next/dist/server/render";



const data = [
  { value: "Fintech", label: "Fintech" },
  { value: "AI", label: "AI" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Eduction", label: "Eduction" },
  { value: "Travel", label: "Travel" },
  { value: "Security", label: "Security" },
  { value: "Wellbeing", label: "Wellbeing" },
  { value: "Food", label: "Food" },
  { value: "Banking", label: "Banking" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Food", label: "Food" },
  { value: "Banking", label: "Banking" },
  { value: "Sustainability", label: "Sustainability" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "Insurance", label: "Insurance" },
  { value: "Technology", label: "Technology" },
  { value: "Marketing", label: "Marketing" },
  { value: "HR", label: "HR" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Communication", label: "Communication" },
  { value: "Logistics", label: "Logistics" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Property", label: "Property" },
  { value: "Social Impact", label: "Social Impact" },
  { value: "Media", label: "Media" },
  { value: "Financial Services", label: "Financial Services" },
  { value: "Adertising", label: "Adertising" },
  { value: "Personal Health", label: "Personal Health" },
  { value: "Recruitment", label: "Recruitment" },
  { value: "Digital Media", label: "Digital Media" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Eduction", label: "Eduction" },
  { value: "Learning", label: "Learning" },
];

export default function JobReviewSpec() {
  const [jobAdvertData, setJobAdvertData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  // const s = Array.isArray(slug) ? slug[0] : slug;
  // const [slug, setSlug] = useState(null);


  // useEffect(() => {
  //   setSlug(new URLSearchParams(window.location.search).get("slug"));
  // });


  //   const getNote = async (s) => {
  //     const noteSnapshot = await getDoc(doc(getFirestore(), "companyDetails", s));
  //     if (noteSnapshot.exists()) {
  //         console.log("This is companyDetails data ");
  //         console.log(noteSnapshot.data());
  //         return noteSnapshot.data();
  //     } else {
  //         console.log("Note doesn't exist");
  //     }
  // };

  // const getUserdetails = async (slug) => {

  //   console.log("test");

  //   const docRef = doc(getFirestore(), "companyDetails", slug)
  //   const docSnap = await getDoc(docRef)

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data())
  //     // setUser(docSnap.data())
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!")
  //   }
  // }

  // getUserdetails(slug);

  // useEffect(() => {
  //   console.log("This ran again");
  //   // fetchJobAdvertData(s);
  //   // getNote(s);
  //   getUserdetails(slug);
  //   setLoading(false);
  // }, [slug]);


  //   const fetchJobAdvertData = async (s) => {
  //     try {
  //       const responseJobAdvert = doc(getFirestore(), "companyDetails", s);
  //       const subscriber = onSnapshot(responseJobAdvert, async (doc) => {
  //         setJobAdvertData(doc.data());
  //       });

  //       return () => subscriber();

  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };


  return (
    <AuthCheck>
      <div id="" className="settings_page min_view">
        <div className="fXgiup block">
          {/* <JobAdvertCompanyDetails
              jobData={jobAdvertData}
              companyData={companyAdvertData}
            /> */}
          {/* {!isLoading ? <CompanyDetails jobData={jobAdvertData} /> : <Loader show={isLoading} />} */}
          <CompanyDetails />
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
  const companyLogoUrl = useRef(null);
  const addressLn1 = useRef(null);
  const addressLn2 = useRef(null);
  const city = useRef(null);
  const postCode = useRef(null);
  const [error, setError] = useState("");
  const reviewedToggle = useRef(null);

  const SELECT_VALUE_KEY = "compnanySec";
  const animatedComponents = makeAnimated();
  const [isLoading, setLoading] = useState(true);
  const [jobData, setJobData] = useState(null);
  const [selected, setSelected] = useState([null]);



  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;

  const getUserdetails = async (slug) => {

    console.log("test");

    const docRef = doc(getFirestore(), "companyDetails", slug)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      setJobData(docSnap.data());




    //   let r = docSnap.data().companySectors;

    //  let newArray = r.data.map((item) => {
    //     return {key: item.id, value: item.name}
    //   })


      // let newArray = docSnap.data().companySectors.data.map((item) => {
      //   return {key: item.id, value: item.name}
      // })

      // console.log(newArray);

      // const banana = [{ value: "32", label: "Lifestyle" }, { value: "33", label: "robz" }];
      // // const banana = ["Lifestyle", "robz"];

      // setSelected(banana);


      // setUser(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
  }

  // getUserdetails(slug);

  useEffect(() => {
    console.log("This ran again");
    // fetchJobAdvertData(s);
    // getNote(s);
    getUserdetails(slug);
    setLoading(false);
  }, [slug]);

  // console.log("selected object - data added after useeffect " + selected)
  // console.log("selected typeof 2 " + typeof (selected));
  // console.log(selected);


  // used for the drop down
  const handleSelect = (options: readonly { value: string, label: string }[]) => {

    const selectedInput = options.map((options) => options.label);

    // console.log("selected typeof " + typeof (selected));
    // console.log("selectedInput typeof " + typeof (selectedInput));


    // console.log("Array current selected value from firebase " + selected);
    // console.log("Array selected value" + selectedInput);
    console.log("before");
    console.log(selectedInput);
    setSelected(selectedInput);
    console.log("after");
    console.log(selected);


    // console.log("This is an object " + Object.keys(selectedInput));
    // console.log("This is an object " + Object.values(selectedInput));

    // setSelected(selected => ({
    //   ...selected,
    //   ...selectedInput
    // }));

    // setSelected(selectedInput);
    // setSelected(selectedInput);


    // setSelected(selected => [...selected, Object.values(selectedInput)]);

    // console.log(selected.flat(1));


    console.log("New selected object ")
    console.log(selected);
    //  setSelected(current => [...current,selectedInput] );

    // setSelected(current => [...current,selectedInput] );

  };



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
      console.log(jobData.companySectors);
      console.log(selected);


      const batch = writeBatch(getFirestore());
      batch.update(newCompanyDoc, {
        companyName: companyName.current.value,
        backgroundImage: backgroundImageUrl.current.value,
        companyMission: companyMission.current.value,
        website: wesbiteUrl.current.value,
        twitter: twitterUrl.current.value,
        instagram: instagramUrl.current.value,
        facebook: facebookUrl.current.value,
        linkedin: linkedinUrl.current.value,
        logo: companyLogoUrl.current.value,
        companySectors: selected, // needs to be saved as array
        addressLn1: addressLn1.current.value,
        addressLn2: addressLn2.current.value,
        city: city.current.value,
        postCode: postCode.current.value,
        reviewed: reviewedToggle.current.checked,
        slug: s,
        uid: s,
        addedAt: serverTimestamp(),
        companyCreation: true,
      });


      await batch.commit();
    } catch (err) {
      return toast.success("Error creating new company, please try again");
    }
    router.push('/company-details');
    return toast.success("New company added");

  };

  // console.log("bobz" + jobData?.companySectors);





  // const lastSelected = JSON.parse(
  //   localStorage.getItem(SELECT_VALUE_KEY) ?? "[]"
  // );
  // setSelected(lastSelected);


  return (<>
    {isLoading ? <Loader show={isLoading} /> : (

      <div className="fNgGjC content">
        <h2 className="settings-title block_title">Company Details</h2>
        <div className="eHIaoM">
          <div>
            <form onSubmit={submit}>

              <div className="jBUQajq field">
                <label htmlFor="backgroundImageUrl" className="gNTSvw question">
                  Background Image URL - Upload image to firebase storage manaually <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <input
                    id="backgroundImageUrl"
                    name="backgroundImageUrl"
                    type="text"
                    className="SDDHw"
                    // this works only on input field only
                    defaultValue={jobData?.backgroundImage}
                    ref={backgroundImageUrl}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="jBUQajq field">
                <label htmlFor="companyLogoUrl" className="gNTSvw question">
                  Company Logo URL - manaually upload to firebase storage <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <input
                    id="companyLogoUrl"
                    name="companyLogoUrl"
                    type="text"
                    className="SDDHw"
                    defaultValue={jobData?.logo}
                    ref={companyLogoUrl}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="jBUQajq field">
                <label htmlFor="companyName" className="gNTSvw question">
                  Company Name <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <textarea
                    id="companyName"
                    name="companyName"
                    className="SDDHw"
                    defaultValue={jobData?.companyName}
                    ref={companyName}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="jBUQajq field">
                <label htmlFor="companyMission" className="gNTSvw question">
                  Company Mission <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <textarea
                    id="companyMission"
                    name="companyMission"
                    className="SDDHw"
                    defaultValue={jobData?.companyMission}
                    ref={companyMission}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="jBUQajq field">
                <label htmlFor="websiteUrl" className="gNTSvw question">
                  Website URL <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <input
                    id="websiteUrl"
                    name="websiteUrl"
                    type="text"
                    className="SDDHw"
                    defaultValue={jobData?.website}
                    ref={wesbiteUrl}
                    autoComplete="off"
                    required
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
                    defaultValue={jobData?.twitter}
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
                    defaultValue={jobData?.instagram}
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
                    defaultValue={jobData?.facebook}
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
                    defaultValue={jobData?.linkedin}
                    ref={linkedinUrl}
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
                  defaultValue={jobData?.companySectors}
                  ref={companySectors}
                />
              </div>
            </div> */}

              <div className="jBUQajq field">
                <label htmlFor="companySectors" className="gNTSvw question">
                  Company Sectors 
                   {/* <span style={{ color: "red" }}> * </span> */}
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
                    // onChange={handleChange}

                    // value={selected}
                    // required
                  />
                </div>
              </div>



              <div className="jBUQajq field">
                <label htmlFor="addressLn1" className="gNTSvw question">
                  Address line 1 <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <input
                    id="addressLn1"
                    name="addressLn1"
                    type="text"
                    className="SDDHw"
                    defaultValue={jobData?.addressLn1}
                    ref={addressLn1}
                    autoComplete="off"
                    required
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
                    defaultValue={jobData?.addressLn2}
                    ref={addressLn2}
                  />
                </div>
              </div>

              <div className="jBUQajq field">
                <label htmlFor="city" className="gNTSvw question">
                  City <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="SDDHw"
                    defaultValue={jobData?.city}
                    ref={city}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="jBUQajq field">
                <label htmlFor="postCode" className="gNTSvw question">
                  Post code <span style={{ color: "red" }}> * </span>
                </label>
                <div className="cqMAuL">
                  <input
                    id="postCode"
                    name="postCode"
                    type="text"
                    className="SDDHw"
                    defaultValue={jobData?.postCode}
                    ref={postCode}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div className="jBUQajq field">
                <label htmlFor="reviewedCheckbox" className="gNTSvw question">Company information reviewed? <span style={{ color: "red" }}> * </span></label>
                <div className="cqMAuL">
                  <input
                    type="checkbox"
                    id="reviewedCheckbox"
                    defaultChecked={jobData?.reviewed}
                    ref={reviewedToggle}
                    // required
                    style={{ width: 30 }}
                  />
                </div>
              </div>
              <button
                type="submit"
                value="Submit"
                className="set-btn"
              >
                Update company data
              </button>
            </form>
          </div>
        </div>
      </div>
    )}
  </>
  );
}

function sectorSelect(props) {

}
