import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import AuthCheck from "../../components/AuthCheck";
import { getCompanyDetailsWithJobAdvert } from "../../lib/firebase";

export default function JobSpec(props) {
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
            </div>
        </div>
      </AuthCheck>
    );
  }