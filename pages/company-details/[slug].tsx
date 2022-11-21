import { uuidv4 } from "@firebase/util";
import { doc, getFirestore, onSnapshot, serverTimestamp, writeBatch } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import Loader from "../../components/Loader";
import Toggle from "react-toggle";
import "react-toggle/style.css" // for ES6 modules
import toast from "react-hot-toast";

export default function JobReviewSpec(props) {
  const [jobAdvertData, setJobAdvertData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const s = Array.isArray(slug) ? slug[0] : slug;



  useEffect(() => {
    const fetchJobAdvertData = async () => {
      setLoading(true);
      try {
        const responseJobAdvert = doc(getFirestore(), "companyDetails", s);
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
  const [companyName, setCompanyName] = useState("");
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [companyMission, setCompanyMission] = useState("");
  const [wesbiteUrl, setWesbiteUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [companySectors, setCompanySectors] = useState("");
  const [addressLn1, setAddressLn1] = useState("");
  const [addressLn2, setAddressLn2] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [error, setError] = useState("");
  const [reviewedToggle, setReviewedToggle] = useState(false);
  const uuid = uuidv4();

  console.log("hi H");
  console.log(props.jobData);
  console.log(props.jobData?.companyName);

  const updateCompany = async (e) => {
    e.preventDefault();
    setError("");


    // if (reviewedToggle === false) {
    //   return setError("Error creating new company, please try again");
    // }
    const newCompanyDoc = doc(getFirestore(), "companyDetails", uuid);
    setError("");
    try {
      const batch = writeBatch(getFirestore());
      batch.set(newCompanyDoc, {
        companyName: companyName,
        backgroundImageUrl: backgroundImageUrl,
        companyMission: companyMission,
        wesbiteUrl: wesbiteUrl,
        twitterUrl: twitterUrl,
        instagramUrl: instagramUrl,
        facebookUrl: facebookUrl,
        linkedinUrl: linkedinUrl,
        companyLogoUrl: companyLogoUrl,
        companySectors: companySectors, // needs to be saved as array
        addressLn1: addressLn1,
        addressLn2: addressLn2,
        city: city,
        postCode: postCode,
        reviewed: reviewedToggle,
        slug: companyName,
        uid: uuid,
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

  return (
    <div className="fNgGjC content">
      <h2 className="settings-title block_title">Company Details</h2>
      <div className="eHIaoM">
        <div>
          <form onSubmit={null}>

            <div className="jBUQajq field">
                  <label htmlFor="email" className="gNTSvw question">
                    Background Image URL - Upload image to firebase storage
                    manaually
                  </label>
                  <div className="cqMAuL">
                    <input
                      // defaultValue={doc.email}
                      id="email"
                      name="email"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.backgroundImageUrl}
                      onChange={(e) => setBackgroundImageUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="firstName" className="gNTSvw question">
                    Company Name
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Company Mission
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.companyMission}
                      onChange={(e) => setCompanyMission(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Website URL
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.wesbiteUrl}
                      onChange={(e) => setWesbiteUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Twitter URL
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Instagram URL
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Facebook URL
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Linkedin URL
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Compant Logo URL - manaually upload to firebase storage
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.companyLogoUrl}
                      onChange={(e) => setCompanyLogoUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Company Sectors
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.companySectors}
                      onChange={(e) => setCompanySectors(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Address line 1
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.addressLn1}
                      onChange={(e) => setAddressLn1(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Address line 2
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.addressLn2}
                      onChange={(e) => setAddressLn2(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    City
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="jBUQajq field">
                  <label htmlFor="lastName" className="gNTSvw question">
                    Post code
                  </label>
                  <div className="cqMAuL">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="SDDHw"
                      value={props.jobData?.postCode}
                      required
                      onChange={(e) => setPostCode(e.target.value)}
                    />
                  </div>
                </div>

                <Toggle
                  defaultChecked={reviewedToggle}
                  name="reviewedToggle"
                  value={true}
                  onChange={(e) => setReviewedToggle(e.target.value)}
                />

                <button
                  type="submit"
                  className="set-btn"
                  onClick={updateCompany}
                >
                  Update
                </button>
              </form>
            </div>
        </div>
    </div>
  );
}
